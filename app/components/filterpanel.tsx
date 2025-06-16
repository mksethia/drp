"use client";

type Props = {
  sportQuery: string;
  experienceFilter: string;
  socialFilter: string;
  ageGroupFilter: string;
  maxCost: number;
  maxMemberCount: number;
  maxTrainingFreq: number;
  hasGymFilter: boolean;
  hasPoolFilter: boolean;
  hasParkingFilter: boolean;
  hasShowersFilter: boolean;
  hasCafeFilter: boolean;
  hasLiftsFilter: boolean;
  hasDisabledAccessFilter: boolean;
  /** if false, render only the search input and submit button */
  showFilters?: boolean;
};

export default function FilterPanel({
  sportQuery,
  experienceFilter,
  socialFilter,
  ageGroupFilter,
  maxCost,
  maxMemberCount,
  maxTrainingFreq,
  hasGymFilter,
  hasPoolFilter,
  hasParkingFilter,
  hasShowersFilter,
  hasCafeFilter,
  hasLiftsFilter,
  hasDisabledAccessFilter,
  showFilters = true,
}: Props) {
  const SearchInput = (
    <div className="relative">
      <input
        type="text"
        name="sport"
        id="sport"
        defaultValue={sportQuery}
        className="mt-1 block w-full rounded-full border border-gray-200 bg-gray-100 px-4 py-2 pr-20 shadow-md placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        placeholder="e.g. tennis, football…"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-dark px-4 py-1 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        Search
      </button>
    </div>
  );

  return (
    <form method="get" className="space-y-4">
      {showFilters ? (
        <div className="rounded-lg bg-accent p-4 shadow-md space-y-4">
          {SearchInput}

          {/* Experience level filter */}
          <div>
            <label htmlFor="experience" className="block text-white text-sm font-medium">
              Experience level
            </label>
            <select
              name="experience"
              id="experience"
              defaultValue={experienceFilter}
              className="mt-1 block w-full rounded-full border border-gray-200 bg-gray-100 px-4 py-2 shadow-md focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            >
              <option value="">Any</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Social filter */}
          <div>
            <label htmlFor="social" className="block text-white text-sm font-medium">
              Social level
            </label>
            <select
              name="social"
              id="social"
              defaultValue={socialFilter}
              className="mt-1 block w-full rounded-full border border-gray-200 bg-gray-100 px-4 py-2 shadow-md focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            >
              <option value="">Any</option>
              <option value="social">Social</option>
              <option value="competitive">Competitive only</option>
            </select>
          </div>

          {/* Cost per month slider */}
          <div>
            <label htmlFor="maxCost" className="block text-white text-sm font-medium">
              Max cost per month: {maxCost}
            </label>
            <input
              type="range"
              name="maxCost"
              id="maxCost"
              min={0}
              max={200}
              defaultValue={maxCost}
              className="mt-2 w-full"
            />
          </div>

          {/* Age group filter */}
          <div>
            <label htmlFor="ageGroup" className="block text-white text-sm font-medium">
              Age group
            </label>
            <select
              name="ageGroup"
              id="ageGroup"
              defaultValue={ageGroupFilter}
              className="mt-1 block w-full rounded-full border border-gray-200 bg-gray-100 px-4 py-2 shadow-md focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            >
              <option value="">Any</option>
              <option value="All Ages">All Ages</option>
              <option value="Under 18s">Under 18s</option>
              <option value="Adults">Adults</option>
              <option value="Seniors">Seniors</option>
            </select>
          </div>

          {/* Member count slider */}
          <div>
            <label htmlFor="maxMembers" className="block text-white text-sm font-medium">
              Max member count: {maxMemberCount}
            </label>
            <input
              type="range"
              name="maxMembers"
              id="maxMembers"
              min={0}
              max={1000}
              defaultValue={maxMemberCount}
              className="mt-2 w-full"
            />
          </div>

          {/* Training frequency slider */}
          <div>
            <label htmlFor="maxTrainingFreq" className="block text-white text-sm font-medium">
              Max training sessions per week: {maxTrainingFreq}
            </label>
            <input
              type="range"
              name="maxTrainingFreq"
              id="maxTrainingFreq"
              min={0}
              max={7}
              defaultValue={maxTrainingFreq}
              className="mt-2 w-full"
            />
          </div>

          {/* Facilities checkboxes */}
          <fieldset className="space-y-2">
            <legend className="block text-white text-sm font-medium">Facilities</legend>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center text-white text-sm">
                <input type="checkbox" name="hasGym" defaultChecked={hasGymFilter} className="mr-2" /> Gym
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input type="checkbox" name="hasPool" defaultChecked={hasPoolFilter} className="mr-2" /> Pool
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input type="checkbox" name="hasParking" defaultChecked={hasParkingFilter} className="mr-2" /> Parking
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input type="checkbox" name="hasShowers" defaultChecked={hasShowersFilter} className="mr-2" /> Showers
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input type="checkbox" name="hasCafe" defaultChecked={hasCafeFilter} className="mr-2" /> Cafe
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input type="checkbox" name="hasLifts" defaultChecked={hasLiftsFilter} className="mr-2" /> Lifts
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input type="checkbox" name="hasDisabledAccess" defaultChecked={hasDisabledAccessFilter} className="mr-2" /> Disabled Access
              </label>
            </div>
          </fieldset>
        </div>
      ) : (
        SearchInput
      )}
    </form>
  );
}
