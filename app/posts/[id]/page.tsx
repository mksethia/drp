import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

//import Image from "next/image";
import { Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id);

  const post = await prisma.club.findUnique({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  // Server action to delete the post
  async function deletePost() {
    "use server";

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    redirect("/posts");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <article className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Club Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          {post.name}
        </h1>

        {/* Sport */}
        <p className="text-lg text-gray-600 mb-4">
          Sport:{" "}
          <span className="font-medium text-gray-800">
            {post.sport || "Anonymous"}
          </span>
        </p>

        {/* Club Image */}
        {post.imageUrl && (
          <div className="mb-6">
            <img
              src={post.facilitiesImage}
              alt={post.name}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        )}

        {/* Additional fields (distance, level, etc.) */}
        <p className="text-lg text-gray-600">
          Level:{" "}
          <span className="font-medium text-gray-800">
            {post.level || "N/A"}
          </span>
        </p>

        <p className="text-lg text-gray-600">
          Social Level:{" "}
          <span className="font-medium text-gray-800">
            {post.social || "N/A"}
          </span>
        </p>

        <p className="text-lg text-gray-600">
          Cost:{" "}
          <span className="font-medium text-gray-800">
            {post.cost ? `£${post.cost}` : "N/A"}
          </span>
        </p>

        {/* Elite badge */}
        {post.isElite && (
          <div className="mt-4 inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded">
            <Star className="w-4 h-4 mr-1 fill-current" />
            Elite Athletes
          </div>
        )}

      </article>

      {/* Delete Button */}
      <form action={deletePost} className="mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete Club
        </button>
      </form>
    </div>
  );
}
