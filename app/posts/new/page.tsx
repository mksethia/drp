"use client";

import Form from "next/form";
import { createPost } from "./actions";

export default function NewPost() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Club</h1>
      <Form action={createPost} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Sport */}
        <div>
          <label htmlFor="sport" className="block text-lg font-medium mb-2">
            Sport <span className="text-red-500">*</span>
          </label>
          <textarea
            id="sport"
            name="sport"
            rows={2}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label htmlFor="level" className="block text-lg font-medium mb-2">
            Experience Level <span className="text-red-500">*</span>
          </label>
          <select
            id="level"
            name="level"
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Cover Image URL */}
        <div>
          <label htmlFor="coverImg" className="block text-lg font-medium mb-2">
            Cover Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="coverImg"
            name="coverImg"
            placeholder="https://example.com/image.jpg"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Other Images */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Additional Images URLs <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="images"
            placeholder="Image URL 1"
            required
            className="w-full mb-2 px-4 py-2 border rounded-lg"
          />
          <input
            type="url"
            name="images"
            placeholder="Image URL 2"
            required
            className="w-full mb-2 px-4 py-2 border rounded-lg"
          />
          <input
            type="url"
            name="images"
            placeholder="Image URL 3"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-lg font-medium mb-2">
              Latitude <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.000001"
              id="latitude"
              name="latitude"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-lg font-medium mb-2">
              Longitude <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.000001"
              id="longitude"
              name="longitude"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Social */}
        <div>
          <label htmlFor="social" className="block text-lg font-medium mb-2">
            Social <span className="text-red-500">*</span>
          </label>
          <select
            id="social"
            name="social"
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Social">Social</option>
            <option value="Competitive">Competitive</option>
          </select>
        </div>

        {/* Cost Per Month */}
        <div>
          <label htmlFor="costPerMonth" className="block text-lg font-medium mb-2">
            Cost Per Month (£) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="costPerMonth"
            name="costPerMonth"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Age Group */}
        <div>
          <label htmlFor="ageGroup" className="block text-lg font-medium mb-2">
            Age Group <span className="text-red-500">*</span>
          </label>
          <select
            id="ageGroup"
            name="ageGroup"
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Under 18s">Under 18s</option>
            <option value="18+">18+</option>
            <option value="All Ages">All Ages</option>
          </select>
        </div>

        {/* Member Count */}
        <div>
          <label htmlFor="memberCount" className="block text-lg font-medium mb-2">
            Member Count <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="memberCount"
            name="memberCount"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Training Frequency */}
        <div>
          <label htmlFor="trainingFreq" className="block text-lg font-medium mb-2">
            Training Frequency (per week) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="trainingFreq"
            name="trainingFreq"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Amenities */}
        <fieldset className="space-y-2">
          <legend className="text-lg font-medium">Amenities</legend>
          <label className="inline-flex items-center">
            <input type="checkbox" name="hasGym" className="mr-2" /> Gym
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" name="hasPool" className="mr-2" /> Pool
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" name="hasParking" className="mr-2" /> Parking
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" name="hasShowers" className="mr-2" /> Showers
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" name="hasCafe" className="mr-2" /> Cafe
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" name="hasLifts" className="mr-2" /> Lifts
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" name="hasDisabledAccess" className="mr-2" /> Disabled Access
          </label>
        </fieldset>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button type="submit" className="w-full bg-[rgba(34,69,44,0.9)] text-white py-3 rounded-lg hover:bg-accent-600">
          Add Club
        </button>
      </Form>
    </div>
  );
}
