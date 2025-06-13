// app/page.tsx
import prisma from "@/lib/prisma";
import type { Club, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { checkPostTableExists } from "@/lib/db-utils";
import Link from "next/link";
import Image from "next/image";
import ClubMap from "@/app/components/clubmap";

// Force dynamic rendering for data freshness
export const dynamic = "force-dynamic";

export default async function Home(
  props: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const searchParams = await props.searchParams;

  // Ensure the posts table exists
  const tableExists = await checkPostTableExists();
  if (!tableExists) {
    redirect("/setup");
  }

  // Extract & normalize sport filter
  let rawSport = searchParams.sport;
  if (Array.isArray(rawSport)) rawSport = rawSport[0];
  const sportQuery = rawSport?.trim() ?? "";

  // Extract & normalize experience filter
  let rawExperience = searchParams.experience;
  if (Array.isArray(rawExperience)) rawExperience = rawExperience[0];
  const allowed = ["beginner", "intermediate", "advanced", "open to all"];
  const experienceFilter = allowed.includes(rawExperience?.toLowerCase() ?? "")
    ? rawExperience!.toLowerCase()
    : "";

  let rawSocial = searchParams.social;
  if (Array.isArray(rawSocial)) rawSocial = rawSocial[0];
  const socialallowed = ["Very Social", "Social", "Training Only"];
  const socialFilter = socialallowed.includes(rawSocial?.toLowerCase() ?? "")
    ? rawSocial!.toLowerCase()
    : "";

  // Build a typed `where` clause for Prisma
  const where: Prisma.ClubWhereInput = {};
  if (sportQuery) {
    where.sport = { contains: sportQuery, mode: "insensitive" };
  }
  if (experienceFilter) {
    where.level = { equals: experienceFilter, mode: "insensitive" };
  }
  if (socialFilter) {
    where.social = { equals: socialFilter, mode: "insensitive" };
  }

  // Fetch up to 50 clubs matching filters
  const clubs: Club[] = await prisma.club.findMany({
    where,
    take: 50,
    select: {
      id: true,
      name: true,
      sport: true,
      level: true,
      imageUrl: true,
      latitude: true,
      longitude: true,
      social: true,
      cost: true,
      isElite: true,
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
          <input
            type="text"
            name="sport"
            id="sportSearch"
            placeholder="Sport (e.g. Football)"
            defaultValue={sportQuery}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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

          <select
            name="social"
            defaultValue={socialFilter}
            className="px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Social Levels</option>
            <option value="Very Social">Very Social</option>
            <option value="Social">Social</option>
            <option value="Training Only">Training Only</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {clubs.length === 0 ? (
        <p className="text-red-500 mb-8">No clubs found with those filters.</p>
      ) : (
        <div className="w-full max-w-6xl mb-12">
          <ClubMap clubs={clubs} />
        </div>
      )}

      {clubs.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {clubs.map((club) => (
            <Link href={`/posts/${club.id}`} key={club.id}>
              <div className="border rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                {club.imageUrl && (
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={club.imageUrl}
                      alt={club.name}
                      fill
                      className="object-cover rounded-md"
                      unoptimized
                    />
                  </div>
                )}
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {club.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Sport: <span className="font-medium">{club.sport}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Level: <span className="font-medium capitalize">{club.level}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Social Level: <span className="font-medium capitalize">{club.social}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

