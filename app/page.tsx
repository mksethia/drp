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

  // ── 1) Sport filter (unchanged) ───────────────────────────────────────────────
  let rawSport = sp.sport;
  if (Array.isArray(rawSport)) {
    rawSport = rawSport[0];
  }
  const sportQuery = rawSport?.trim() || "";

  // ── 2) Experience‐level filter (new) ─────────────────────────────────────────
  let rawExperience = sp.experience;
  if (Array.isArray(rawExperience)) {
    rawExperience = rawExperience[0];
  }
  // Normalize to one of these exact strings, or empty for “any level”
  const allowedExperiences = ["beginner", "intermediate", "advanced", "open to all"];
  const experienceFilter = allowedExperiences.includes(rawExperience?.toLowerCase() || "")
    ? rawExperience!.toLowerCase()
    : "";

  // ── 3) Sort‐by‐distance filter (unchanged) ───────────────────────────────────
  let rawSort = sp.sort;
  if (Array.isArray(rawSort)) {
    rawSort = rawSort[0];
  }
  // Default to "asc" unless explicitly "desc"
  const sortDirection = rawSort === "desc" ? "desc" : "asc";

  // ── 4) Build Prisma `where` clause including optional sport & experience filters ─
  const whereClause: any = {};
  if (sportQuery) {
    whereClause.sport = {
      contains: sportQuery,
      mode: "insensitive",
    };
  }
  if (experienceFilter) {
    // Assuming your `level` field in the database is stored in lowercase,
    // or you want to match case‐insensitively. If you store it capitalized,
    // adjust mode accordingly or map “open to all” to exactly that string.
    whereClause.level = {
      equals: experienceFilter,
      mode: "insensitive",
    };
  }

  // ── 5) Fetch clubs, ordering by distance according to sortDirection ────────────
  const clubs = await prisma.club.findMany({
    where: whereClause,
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
        <div className="flex space-x-2">
          {/* ── Sport Input ─────────────────────────────────────────────── */}
          <input
            type="text"
            name="sport"
            id="sportSearch"
            placeholder="Sport (e.g. Football)"
            defaultValue={sportQuery}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* ── Experience‐Level Dropdown ───────────────────────────────── */}
          <select
            name="experience"
            defaultValue={experienceFilter}
            className="px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="open to all">Open to All</option>
          </select>

          {/* ── Sort‐by‐Distance Dropdown ─────────────────────────────────── */}
          <select
            name="sort"
            defaultValue={sortDirection}
            className="px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="asc">Distance ↑</option>
            <option value="desc">Distance ↓</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* ── Feedback Text ─────────────────────────────────────────────────────────── */}
      {sportQuery === "" && experienceFilter === "" ? (
        <p className="text-gray-600 mb-8">
          Type a sport, choose an experience level (optional), sort order, and hit Search.
        </p>
      ) : clubs.length === 0 ? (
        <p className="text-red-500 mb-8">
          No clubs found matching{" "}
          {sportQuery && (
            <>
              “<span className="font-semibold">{sportQuery}</span>”
              {experienceFilter && " "}
            </>
          )}
          {experienceFilter && (
            <>
              <span className="font-semibold capitalize">{experienceFilter}</span>{" "}
            </>
          )}
          {!(sportQuery || experienceFilter)
            ? "these filters."
            : "with those filters."}
        </p>
      ) : (
        <p className="text-gray-700 mb-4">
          Showing <span className="font-semibold">{clubs.length}</span> club
          {clubs.length > 1 ? "s" : ""}{" "}
          {sportQuery && (
            <>
              for “<span className="italic">{sportQuery}</span>”
              {experienceFilter && ", "}
            </>
          )}
          {experienceFilter && (
            <>
              at <span className="font-semibold capitalize">{experienceFilter}</span> level
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
                <span className="font-medium capitalize">{club.level}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
