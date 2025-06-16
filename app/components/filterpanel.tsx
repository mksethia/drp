"use client";

type Props = {
  sportQuery: string;
  experienceFilter: string;
  socialFilter: string;
  /** if false, render only the search input and submit button */
  showFilters?: boolean;
};

export default function FilterPanel({
  sportQuery,
  experienceFilter,
  socialFilter,
  showFilters = true,
}: Props) {
  // Search input + button component
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
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Open to all</option>
            </select>
          </div>

          {/* Social level filter */}
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
              <option>Very Social</option>
              <option>Social</option>
              <option>Training Only</option>
            </select>
          </div>
        </div>
      ) : (
        // Only show search when filters are hidden
        SearchInput
      )}
    </form>
  );
}
