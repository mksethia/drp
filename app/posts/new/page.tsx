"use client";

import Form from "next/form";
import { createPost } from "./actions";

function Label({
  htmlFor,
  children,
  required = false,
  className = "",
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-lg font-medium mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-accentColour ml-1">*</span>}
    </label>
  );
}

export default function NewPost() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Club</h1>
      <Form action={createPost} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="title" required>
            Name
          </Label>
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
          <Label htmlFor="sport" required>
            Sport
          </Label>
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
          <Label htmlFor="level" required>
            Experience Level
          </Label>
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
          <Label htmlFor="coverImg" required>
            Cover Image URL
          </Label>
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
          <Label className="mb-4" required>
            Additional Image URLs
          </Label>
          {Array.from({ length: 3 }).map((_, i) => (
            <input
              key={i}
              type="url"
              name="images"
              placeholder={`Image URL ${i + 1}`}
              required
              className="w-full mb-2 px-4 py-2 border rounded-lg"
            />
          ))}
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude" required>
              Latitude
            </Label>
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
            <Label htmlFor="longitude" required>
              Longitude
            </Label>
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
          <Label htmlFor="social" required>
            Social
          </Label>
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
          <Label htmlFor="costPerMonth" required>
            Cost Per Month (£)
          </Label>
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
          <Label htmlFor="ageGroup" required>
            Age Group
          </Label>
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
          <Label htmlFor="memberCount" required>
            Member Count
          </Label>
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
          <Label htmlFor="trainingFreq" required>
            Training Frequency (per week)
          </Label>
          <input
            type="number"
            id="trainingFreq"
            name="trainingFreq"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Amenities (optional) */}
        <fieldset className="space-y-2">
          <legend className="text-lg font-medium">Amenities</legend>
          {[
            ["hasGym", "Gym"],
            ["hasPool", "Pool"],
            ["hasParking", "Parking"],
            ["hasShowers", "Showers"],
            ["hasCafe", "Cafe"],
            ["hasLifts", "Lifts"],
            ["hasDisabledAccess", "Disabled Access"],
          ].map(([name, label]) => (
            <label key={name} className="inline-flex items-center">
              <input type="checkbox" name={name} className="mr-2" />
              {label}
            </label>
          ))}
        </fieldset>

        {/* Description */}
        <div>
          <Label htmlFor="description" required>
            Description
          </Label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[rgba(34,69,44,0.9)] text-white py-3 rounded-lg hover:bg-accent-600"
        >
          Add Club
        </button>
      </Form>
    </div>
  );
}
