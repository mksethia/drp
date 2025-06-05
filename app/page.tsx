"use client";

export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
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
  let rawSport = sp.sport;

  if (Array.isArray(rawSport)) {
    rawSport = rawSport[0];
  }
  const sportQuery = rawSport?.trim() || "";

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
      level: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-8">
      <h1 className="text-5xl font-extrabold mb-6 text-[#333333]">Clubs</h1>

      <form method="GET" className="w-full max-w-md mb-12">
        <label htmlFor="sportSearch" className="sr-only">Search by sport</label>
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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {clubs.map((club) => (
          <Link href={`/clubs/${club.id}`} key={club.id}>
            <div className="border rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
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
          </Link>
        ))}
      </div>
    </div>
  );
}