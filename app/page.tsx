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

type SearchParams = Record<string, string | string[] | undefined>;

export default async function Home(
  props: { searchParams: Promise<SearchParams> }
) {
  const searchParams = await props.searchParams;

  // Ensure the posts table exists
  const tableExists = await checkPostTableExists();
  if (!tableExists) redirect("/setup");

  // Extract & normalize filters from searchParams
  // Sport query
  let rawSport = searchParams.sport;
  if (Array.isArray(rawSport)) rawSport = rawSport[0];
  const sportQuery = rawSport?.trim() ?? "";

  // Experience level
  let rawExperience = searchParams.experience;
  if (Array.isArray(rawExperience)) rawExperience = rawExperience[0];
  const allowedLevels = ["beginner", "intermediate", "expert"];
  const experienceFilter =
    allowedLevels.includes(rawExperience?.toLowerCase() ?? "")
      ? rawExperience!.toLowerCase()
      : "";

  // Social level
  let rawSocial = searchParams.social;
  if (Array.isArray(rawSocial)) rawSocial = rawSocial[0];
  const socialAllowed = ["social", "competitive"];
  const socialFilter =
    socialAllowed.includes(rawSocial?.toLowerCase() ?? "")
      ? rawSocial!.toLowerCase()
      : "";

  // Age group
  let rawAgeGroup = searchParams.ageGroup;
  if (Array.isArray(rawAgeGroup)) rawAgeGroup = rawAgeGroup[0];
  const ageGroups = ["All Ages", "Under 18s", "Adults", "Seniors"];
  const ageGroupFilter =
    ageGroups.includes(rawAgeGroup ?? "") ? rawAgeGroup! : "";

  // Numeric filters (parsed to number or fallback)
  const maxCost = Number(searchParams.maxCost) || 200;
  const minMemberCount = Number(searchParams.minMembers) || 0;
  const maxMemberCount = Number(searchParams.maxMembers) || 1000;
  const maxTrainingFreq = Number(searchParams.maxTrainingFreq) || 7;

  // Boolean facility filters
  const hasGymFilter = searchParams.hasGym === 'on';
  const hasPoolFilter = searchParams.hasPool === 'on';
  const hasParkingFilter = searchParams.hasParking === 'on';
  const hasShowersFilter = searchParams.hasShowers === 'on';
  const hasCafeFilter = searchParams.hasCafe === 'on';
  const hasLiftsFilter = searchParams.hasLifts === 'on';
  const hasDisabledAccessFilter = searchParams.hasDisabledAccess === 'on';

  const hasSearch =
    Boolean(
      sportQuery ||
      experienceFilter ||
      socialFilter ||
      ageGroupFilter ||
      maxCost < 200 ||
      minMemberCount > 0 ||
      maxMemberCount < 1000 ||
      maxTrainingFreq < 7 ||
      hasGymFilter ||
      hasPoolFilter ||
      hasParkingFilter ||
      hasShowersFilter ||
      hasCafeFilter ||
      hasLiftsFilter ||
      hasDisabledAccessFilter
    );

  const containerClasses = [
    "min-h-screen",
    "flex flex-col justify-start items-center pt-16 pb-12 px-8",
    hasSearch
      ? "bg-gray-50"
      : "bg-[url('/images/background.jpg')] bg-cover bg-center",
  ].join(" ");

  // Build Prisma where clause
  const where: Prisma.ClubWhereInput = {};
  if (sportQuery)
    where.sport = { contains: sportQuery, mode: "insensitive" };
  if (experienceFilter)
    where.expLevel = { equals: experienceFilter, mode: "insensitive" };
  if (socialFilter)
    where.social = { equals: socialFilter, mode: "insensitive" };
  if (ageGroupFilter) where.ageGroup = ageGroupFilter;
  if (maxCost < 200) where.costPerMonth = { lte: maxCost };
  if (minMemberCount > 0)
    where.memberCount = { gte: minMemberCount };
  if (maxMemberCount < 1000)
    where.memberCount = { lte: maxMemberCount };
  if (maxTrainingFreq < 7)
    where.trainingFreq = { lte: maxTrainingFreq };

  // Facilities
  if (hasGymFilter) where.hasGym = true;
  if (hasPoolFilter) where.hasPool = true;
  if (hasParkingFilter) where.hasParking = true;
  if (hasShowersFilter) where.hasShowers = true;
  if (hasCafeFilter) where.hasCafe = true;
  if (hasLiftsFilter) where.hasLifts = true;
  if (hasDisabledAccessFilter) where.hasDisabledAccess = true;

  // Fetch up to 50 clubs matching filters
  const clubs: Club[] = await prisma.club.findMany({
    where,
    take: 50,
    select: {
      id: true,
      name: true,
      sport: true,
      expLevel: true,
      coverImg: true,
      images: true,
      latitude: true,
      longitude: true,
      social: true,
      ageGroup: true,
      costPerMonth: true,
      memberCount: true,
      trainingFreq: true,
      hasGym: true,
      hasPool: true,
      hasParking: true,
      hasShowers: true,
      hasCafe: true,
      hasLifts: true,
      hasDisabledAccess: true,
      description: true,
    },
  });

  return (
    <div className={containerClasses}>
      {/* Translucent green box around title + first-visit search */}
      {!hasSearch && (
        <div className="w-full max-w-[56rem] bg-[#22452c] bg-opacity-5 rounded-2xl p-8 shadow-lg">
          <h1 className="text-5xl font-semibold mb-6 text-[#ffffff] text-center">
            The most powerful way to discover sports clubs
          </h1>
          <FilterPanel
            sportQuery={sportQuery}
            experienceFilter={experienceFilter}
            socialFilter={socialFilter}
            ageGroupFilter={ageGroupFilter}
            maxCost={maxCost}
            minMemberCount={minMemberCount}
            maxMemberCount={maxMemberCount}
            maxTrainingFreq={maxTrainingFreq}
            hasGymFilter={hasGymFilter}
            hasPoolFilter={hasPoolFilter}
            hasParkingFilter={hasParkingFilter}
            hasShowersFilter={hasShowersFilter}
            hasCafeFilter={hasCafeFilter}
            hasLiftsFilter={hasLiftsFilter}
            hasDisabledAccessFilter={hasDisabledAccessFilter}
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
                ageGroupFilter={ageGroupFilter}
                maxCost={maxCost}
                minMemberCount={minMemberCount}
                maxMemberCount={maxMemberCount}
                maxTrainingFreq={maxTrainingFreq}
                hasGymFilter={hasGymFilter}
                hasPoolFilter={hasPoolFilter}
                hasParkingFilter={hasParkingFilter}
                hasShowersFilter={hasShowersFilter}
                hasCafeFilter={hasCafeFilter}
                hasLiftsFilter={hasLiftsFilter}
                hasDisabledAccessFilter={hasDisabledAccessFilter}
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
                    {club.coverImg && (
                      <div className="relative w-full h-40 mb-4">
                        <Image
                          src={club.coverImg}
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
                      Level: <span className="font-medium capitalize">{club.expLevel}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Social: <span className="font-medium capitalize">{club.social}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Age Group: <span className="font-medium">{club.ageGroup}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Cost: <span className="font-medium">£{club.costPerMonth}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Members: <span className="font-medium">{club.memberCount}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Sessions/week: <span className="font-medium">{club.trainingFreq}</span>
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
