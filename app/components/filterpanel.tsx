"use client";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterPanelProps {
  sportQuery: string;
  experienceFilter: string;
  socialFilter: string;
}

export default function FilterPanel({ sportQuery, experienceFilter, socialFilter }: FilterPanelProps) {
  const [show, setShow] = useState(false);
  const [sport, setSport] = useState(sportQuery);
  const [experience, setExperience] = useState(experienceFilter);
  const [social, setSocial] = useState(socialFilter);

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchParams = useSearchParams();

  function applyFilters() {
    const params = new URLSearchParams();
    if (sport) params.set("sport", sport);
    if (experience) params.set("experience", experience);
    if (social) params.set("social", social);
    router.push(`?${params.toString()}`);
    setShow(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
      </button>
      <form className="flex border border-gray-300 rounded-r-lg overflow-hidden">
        <input
          type="text"
          name="sport"
          placeholder="Sport (e.g. Football)"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          className="flex-grow px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
          Search
        </button>
      </form>

      {show && (
        <div className="absolute top-0 left-full ml-2 w-64 bg-white border border-gray-300 shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience Level
              </label>
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="open to all">Open to All</option>
              </select>
            </div>
            <div>
              <label htmlFor="social" className="block text-sm font-medium text-gray-700">
                Social Level
              </label>
              <select
                id="social"
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Social Levels</option>
                <option value="Very Social">Very Social</option>
                <option value="Social">Social</option>
                <option value="Training Only">Training Only</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={applyFilters}
            className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
)}