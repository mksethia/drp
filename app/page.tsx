// app/page.tsx (Server Component)
import prisma from "@/lib/prisma";
import type { Club, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { checkPostTableExists } from "@/lib/db-utils";
import Link from "next/link";
import Image from "next/image";
import ClubMap from "@/app/components/clubmap";
import FilterPanel from "@/app/components/filterpanel";

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
  if (!tableExists) redirect("/setup");

  // Extract & normalize filters from searchParams
  let rawSport = searchParams.sport;
  if (Array.isArray(rawSport)) rawSport = rawSport[0];
  const sportQuery = rawSport?.trim() ?? "";

  let rawExperience = searchParams.experience;
  if (Array.isArray(rawExperience)) rawExperience = rawExperience[0];
  const allowedLevels = ["beginner", "intermediate", "advanced", "open to all"];
  const experienceFilter =
    allowedLevels.includes(rawExperience?.toLowerCase() ?? "")
      ? rawExperience!.toLowerCase()
      : "";

  let rawSocial = searchParams.social;
  if (Array.isArray(rawSocial)) rawSocial = rawSocial[0];
  const socialAllowed = ["Very Social", "Social", "Training Only"];
  const socialFilter =
    socialAllowed.includes(rawSocial ?? "")
      ? rawSocial!
      : "";

  const hasSearch = Boolean(sportQuery || experienceFilter || socialFilter);

  const containerClasses = [
    "min-h-screen",
    "flex flex-col justify-start items-center pt-16 pb-12 px-8",
    hasSearch ? "bg-gray-50" : "bg-[url('/images/background.jpg')] bg-cover bg-center"
  ].join(" ");

  // Build Prisma where clause
  const where: Prisma.ClubWhereInput = {};
  if (sportQuery) where.sport = { contains: sportQuery, mode: "insensitive" };
  if (experienceFilter) where.level = { equals: experienceFilter, mode: "insensitive" };
  if (socialFilter) where.social = { equals: socialFilter, mode: "insensitive" };

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
      images: true,
      facilitiesImage: true,
      latitude: true,
      longitude: true,
      social: true,
      cost: true,
      isElite: true,
    },
  });

  return (
    // eslint-disable-next-line no-unused-vars
    <div className="containerClasses">
      {/* Translucent green box around title + first-visit search */}
      {!hasSearch && (
        <div className="w-full max-w-[40rem] bg-[#22452c] bg-opacity-5 rounded-2xl p-8 shadow-lg">
          <h1 className="text-5xl font-semibold mb-6 text-[#ffffff]">
            The most powerful way to discover sports clubs
          </h1>
          <FilterPanel
            sportQuery={sportQuery}
            experienceFilter={experienceFilter}
            socialFilter={socialFilter}
            showFilters={false}
          />
        </div>
      )}

      {hasSearch && (
        <>
          <div className="flex w-full max-w-6xl mb-12">
            <div className="w-1/3 pr-6">
              <FilterPanel
                sportQuery={sportQuery}
                experienceFilter={experienceFilter}
                socialFilter={socialFilter}
                showFilters={true}
              />
            </div>
            <div className="w-2/3">
              <ClubMap clubs={clubs} />
            </div>
          </div>

          {clubs.length === 0 ? (
            <p className="text-red-500 mb-8">
              No clubs found with those filters.
            </p>
          ) : (
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
                      Level:{' '}
                      <span className="font-medium capitalize">
                        {club.level}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Social Level:{' '}
                      <span className="font-medium capitalize">
                        {club.social}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
