export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { checkPostTableExists } from "@/lib/db-utils";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const tableExists = await checkPostTableExists();
  if (!tableExists) {
    redirect("/setup");
  }

  const sp = await searchParams;

  // ── 1) Sport filter ─────────────────────────────────────────────────────────
  let rawSport = sp.sport;
  if (Array.isArray(rawSport)) {
    rawSport = rawSport[0];
  }
  const sportQuery = rawSport?.trim() || "";

  // ── 2) Sort‐by‐distance filter ────────────────────────────────────────────────
  let rawSort = sp.sort;
  if (Array.isArray(rawSort)) {
    rawSort = rawSort[0];
  }
  // Default to "asc" unless explicitly "desc"
  const sortDirection = rawSort === "desc" ? "desc" : "asc";

  // ── 3) Experience‐level filter (new) ─────────────────────────────────────────
  let rawLevel = sp.level;
  if (Array.isArray(rawLevel)) {
    rawLevel = rawLevel[0];
  }
  // Normalize to lowercase for comparison; empty string = “any level”
  const levelQuery = rawLevel?.trim().toLowerCase() || "";

  // ── 4) Build combined `where` clause ────────────────────────────────────────
  const where: Record<string, any> = {};
  if (sportQuery) {
    where.sport = {
      contains: sportQuery,
      mode: "insensitive",
    };
  }
  if (levelQuery && levelQuery !== "any") {
    // We assume in the database, `level` is stored in lowercase (e.g. "beginner", "intermediate", etc.)
    where.level = levelQuery;
  }

  // ── 5) Fetch clubs, ordering by distance ─────────────────────────────────────
  const clubs = await prisma.club.findMany({
    where,
    orderBy: { distance: sortDirection },
    take: 50,
    select: {
      id: true,
      name: true,
      sport: true,
      distance: true,
      level: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-8">
      <h1 className="text-5xl font-extrabold mb-6 text-[#333333]">Clubs</h1>

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

          {/* Sort‐by‐distance dropdown */}
          <select
            name="sort"
            defaultValue={sortDirection}
            className="px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="asc">Distance ↑</option>
            <option value="desc">Distance ↓</option>
          </select>

          {/* ── New dropdown for “Experience Level” ────────────────────────────── */}
          <select
            name="level"
            defaultValue={levelQuery || "any"}
            className="px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="any">Any Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="open to all">Open to All</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* ── Conditional Messages ──────────────────────────────────────────────────── */}
      {sportQuery === "" && levelQuery === "" ? (
        <p className="text-gray-600 mb-8">
          Type a sport and/or select a level above, choose sort order, and hit Enter to search.
        </p>
      ) : clubs.length === 0 ? (
        <p className="text-red-500 mb-8">
          No clubs found matching{" "}
          {sportQuery && (
            <>
              “<span className="font-semibold">{sportQuery}</span>”
              {levelQuery && levelQuery !== "any" && ", "}
            </>
          )}
          {levelQuery && levelQuery !== "any" && (
            <>
              level <span className="font-semibold">{levelQuery}</span>
            </>
          )}
          .
        </p>
      ) : (
        <p className="text-gray-700 mb-4">
          Showing <span className="font-semibold">{clubs.length}</span> clubs{" "}
          {sportQuery && (
            <>
              for “<span className="italic">{sportQuery}</span>”
              {levelQuery && levelQuery !== "any" && " "}
            </>
          )}
          {levelQuery && levelQuery !== "any" && (
            <>
              at <span className="font-semibold">{levelQuery}</span> level
            </>
          )}
          , sorted by distance (
          <span className="font-semibold">
            {sortDirection === "asc" ? "nearest first" : "farthest first"}
          </span>
          ):
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {clubs.map((club) => (
          <Link href={`/posts/${club.id}`} key={club.id}>
            <div className="border rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {club.name}
              </h2>
              <p className="text-sm text-gray-500">
                Sport: <span className="font-medium">{club.sport}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Distance: <span className="font-medium">{club.distance} mi</span>
              </p>
              <p className="text-sm text-gray-500">
                Experience Level:{" "}
                <span className="font-medium">{club.level}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
