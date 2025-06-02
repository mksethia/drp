// app/page.tsx (or .jsx)
export const dynamic = "force-dynamic"; // disable SSG/ISR so that searchParams always re-run on each request

import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { checkPostTableExists } from "@/lib/db-utils";

// NOTE: In Next.js App Router, page components can receive `searchParams` as props.
interface PageProps {
  searchParams: { sport?: string };
}

export default async function Home({ searchParams }: PageProps) {
  // 1. Enforce your existing “if no post table, go to /setup” logic.
  const tableExists = await checkPostTableExists();
  if (!tableExists) {
    redirect("/setup");
  }

  // 2. Read `sport` from the query string. If absent, treat as empty string.
  const sportQuery = searchParams.sport?.trim() || "";

  // 3. Fetch clubs. If `sportQuery` is non-empty, filter by `sport` contains (case-insensitive).
  //    Otherwise, you can choose to fetch all clubs, or none. Here we default to “all” when empty.
  const clubs = await prisma.club.findMany({
    where: sportQuery
      ? {
          // partial match, case-insensitive
          sport: {
            contains: sportQuery,
            mode: "insensitive",
          },
        }
      : {},
    orderBy: { name: "asc" },
    take: 50, // limit to 50 results just in case
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-8">
      {/* Page title */}
      <h1 className="text-5xl font-extrabold mb-6 text-[#333333]">Clubs</h1>

      {/* 4. SEARCH BAR FORM */}
      {/* 
          - method="GET" ensures that typing in the input and hitting Enter
            will append ?sport=… to the URL and re-render this page server-side.
          - We default the input’s value to whatever `sportQuery` is, so users see their search term.
      */}
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

      {/* 5. Show a message if no `sport` was entered */}
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

      {/* 6. Render matching clubs as cards */}
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
          </div>
        ))}
      </div>
    </div>
  );
}
