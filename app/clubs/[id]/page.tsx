export const dynamic = "force-dynamic"; // disables SSG and ISR

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);

  const post = await prisma.club.findUnique({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  // Server action to delete the club (corrected model)
  async function deletePost() {
    "use server";

    await prisma.club.delete({
      where: {
        id: postId,
      },
    });

    redirect("/app");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <article className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{post.name}</h1>
        <p className="text-lg text-gray-600 mb-4">
          Sport: <span className="font-medium text-gray-800">{post.sport}</span>
        </p>
        <p className="text-lg text-gray-600 mb-2">
          Distance: <span className="font-medium text-gray-800">{post.distance} mi</span>
        </p>
        <p className="text-lg text-gray-600">
          Experience Level: <span className="font-medium text-gray-800">{post.level}</span>
        </p>
      </article>

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