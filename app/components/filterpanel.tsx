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
  return (
    <form method="get" className="space-y-4">
      {/* Search input with button inside */}
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
          className="absolute top-1/2 right-2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white shadow-lg transform transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          Search
        </button>
      </div>

      {/* only render the extra filters if showFilters is true */}
      {showFilters && (
        <>
          {/* experience level */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
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

          {/* social level */}
          <div>
            <label htmlFor="social" className="block text-sm font-medium text-gray-700">
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
        </>
      )}
    </form>
  );
}
