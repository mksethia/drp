"use client";

import { useState } from "react";

type Props = {
  sportQuery: string;
  experienceFilter: string;
  socialFilter: string;
  ageGroupFilter: string;
  maxCost: number;
  maxTrainingFreq: number;
  minMemberCount: number;
  maxMemberCount: number;
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
  maxTrainingFreq,
  minMemberCount,
  maxMemberCount,
  hasGymFilter,
  hasPoolFilter,
  hasParkingFilter,
  hasShowersFilter,
  hasCafeFilter,
  hasLiftsFilter,
  hasDisabledAccessFilter,
  showFilters = true,
}: Props) {
  const [cost, setCost] = useState<number>(maxCost);
  const [trainingFreq, setTrainingFreq] = useState<number>(maxTrainingFreq);
  const [memberCountRange, setMemberCountRange] = useState<[number, number]>([
    minMemberCount,
    maxMemberCount,
  ]);

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
              Max cost per month: {cost}
            </label>
            <input
              type="range"
              name="maxCost"
              id="maxCost"
              min={0}
              max={200}
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          {/* Member count double-ended slider */}
          <div>
            <label htmlFor="minMembers" className="block text-white text-sm font-medium">
              Min member count: {memberCountRange[0]}
            </label>
            <input
              type="range"
              name="minMembers"
              id="minMembers"
              min={0}
              max={1000}
              value={memberCountRange[0]}
              onChange={(e) => {
                const newMin = Math.min(Number(e.target.value), memberCountRange[1]);
                setMemberCountRange([newMin, memberCountRange[1]]);
              }}
              className="mt-2 w-full"
            />
            <label htmlFor="maxMembers" className="block text-white text-sm font-medium">
              Max member count: {memberCountRange[1]}
            </label>
            <input
              type="range"
              name="maxMembers"
              id="maxMembers"
              min={0}
              max={1000}
              value={memberCountRange[1]}
              onChange={(e) => {
                const newMax = Math.max(Number(e.target.value), memberCountRange[0]);
                setMemberCountRange([memberCountRange[0], newMax]);
              }}
              className="mt-2 w-full"
            />
          </div>

          {/* Training frequency slider */}
          <div>
            <label htmlFor="maxTrainingFreq" className="block text-white text-sm font-medium">
              Max training sessions per week: {trainingFreq}
            </label>
            <input
              type="range"
              name="maxTrainingFreq"
              id="maxTrainingFreq"
              min={0}
              max={7}
              value={trainingFreq}
              onChange={(e) => setTrainingFreq(Number(e.target.value))}
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
              <option value="18+">18+</option>
            </select>
          </div>

          {/* Facilities checkboxes */}
          <fieldset className="space-y-2">
            <legend className="block text-white text-sm font-medium">Facilities</legend>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  name="hasGym"
                  defaultChecked={hasGymFilter}
                  className="mr-2"
                />
                Needs gym
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  name="hasPool"
                  defaultChecked={hasPoolFilter}
                  className="mr-2"
                />
                Needs pool
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  name="hasParking"
                  defaultChecked={hasParkingFilter}
                  className="mr-2"
                />
                Needs parking
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  name="hasShowers"
                  defaultChecked={hasShowersFilter}
                  className="mr-2"
                />
                Needs showers
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  name="hasCafe"
                  defaultChecked={hasCafeFilter}
                  className="mr-2"
                />
                Needs cafe
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  name="hasLifts"
                  defaultChecked={hasLiftsFilter}
                  className="mr-2"
                />
                Needs lifts
              </label>
              <label className="inline-flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  name="hasDisabledAccess"
                  defaultChecked={hasDisabledAccessFilter}
                  className="mr-2"
                />
                Needs disabled access
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
