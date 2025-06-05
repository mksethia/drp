// app/page.tsx
export const dynamic = "force-dynamic"; // disable SSG/ISR

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { checkPostTableExists } from "@/lib/db-utils";

export async function Post({ params }: { params: Promise<{ id: string }> }) {
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
        {/* Post Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          {post.name}
        </h1>

        {/* Author Information */}
        <p className="text-lg text-gray-600 mb-4">
          Sport: <span className="font-medium text-gray-800">{post.sport || "Anonymous"}</span>
        </p>
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


export default async function Home({
  // Note: Type `searchParams` as a Promise of a record
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // 1. Check for your existing “if no post table, go to /setup” logic
  const tableExists = await checkPostTableExists();
  if (!tableExists) {
    redirect("/setup");
  }

  // 2. Await `searchParams` because Next.js passes it in as a Promise
  const sp = await searchParams;
  let rawSport = sp.sport;

  if (Array.isArray(rawSport)) {
    // If someone did `?sport=Foo&sport=Bar`, just take the first
    rawSport = rawSport[0];
  }
  const sportQuery = rawSport?.trim() || "";

  // 3. Run your Prisma query exactly as before
  const clubs = await prisma.club.findMany({
    where: sportQuery
      ? {
          sport: {
            contains: sportQuery,
            mode: "insensitive",
          },
        }
      : {},
    orderBy: { name: "asc" },
    take: 50,
    select: {
      id: true,
      name: true,
      sport: true,
      distance: true,
      level: true, // Ensure 'level' is selected
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-8">
      <h1 className="text-5xl font-extrabold mb-6 text-[#333333]">Clubs</h1>

      {/* ─── SEARCH FORM ─────────────────────────────────────────────────────── */}
      <form method="GET" className="w-full max-w-md mb-12">
        <label htmlFor="sportSearch" className="sr-only">
          Search by sport
        </label>
        <div className="flex">
          <input
            type="text"
            name="sport"
            id="sportSearch"
            placeholder="Search by sport (e.g. Football)"
            defaultValue={sportQuery}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* ─── CONDITIONAL MESSAGES ───────────────────────────────────────────── */}
      {sportQuery === "" ? (
        <p className="text-gray-600 mb-8">Type a sport above and hit Enter to search.</p>
      ) : clubs.length === 0 ? (
        <p className="text-red-500 mb-8">
          No clubs found matching “<span className="font-semibold">{sportQuery}</span>.”
        </p>
      ) : (
        <p className="text-gray-700 mb-4">
          Showing <span className="font-semibold">{clubs.length}</span> clubs for “
          <span className="italic">{sportQuery}</span>”:
        </p>
      )}

      {/* ─── RENDER CLUB CARDS ────────────────────────────────────────────────── */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="border rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{club.name}</h2>
            <p className="text-sm text-gray-500">
              Sport: <span className="font-medium">{club.sport}</span>
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Distance: <span className="font-medium">{club.distance} mi</span>
            </p>

            <p className="text-sm text-gray-500">
              Experience Level: <span className="font-medium">{club.level}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
