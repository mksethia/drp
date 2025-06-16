import React, { useState } from 'react';
import Form from 'next/form';
import { createPost } from './actions';

// Define amenity keys and their type
type AmenityKey =
  | 'hasGym'
  | 'hasPool'
  | 'hasParking'
  | 'hasShowers'
  | 'hasCafe'
  | 'hasLifts'
  | 'hasDisabledAccess';

// Map each amenity key to a boolean
type Amenities = Record<AmenityKey, boolean>;

export default function NewPost() {
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [socialType, setSocialType] = useState<'social' | 'competitive'>('social');
  const [ageGroup, setAgeGroup] = useState<'Under 18s' | '18+' | 'All Ages'>('All Ages');
  const [amenities, setAmenities] = useState<Amenities>({
    hasGym: false,
    hasPool: false,
    hasParking: false,
    hasShowers: false,
    hasCafe: false,
    hasLifts: false,
    hasDisabledAccess: false,
  });

  const toggleAmenity = (key: AmenityKey) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Club</h1>
      <Form action={createPost} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">Name</label>
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
          <label htmlFor="sport" className="block text-lg font-medium mb-2">Sport</label>
          <textarea
            id="sport"
            name="sport"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Experience Level as Buttons */}
        <div>
          <label className="block text-lg font-medium mb-2">Experience Level</label>
          <div className="flex space-x-2">
            {(['beginner', 'intermediate', 'advanced'] as const).map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setLevel(opt)}
                className={`px-4 py-2 rounded-lg focus:outline-none ${
                  level === opt ? 'bg-accent text-white' : 'bg-gray-200'
                }`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
          <input type="hidden" name="level" value={level} />
        </div>

        {/* Cover Image URL */}
        <div>
          <label htmlFor="coverImg" className="block text-lg font-medium mb-2">Cover Image URL</label>
          <input
            type="url"
            id="coverImg"
            name="coverImg"
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Other Images */}
        <div>
          <label className="block text-lg font-medium mb-2">Additional Images URLs</label>
          <input
            type="url"
            name="images"
            placeholder="Image URL 1"
            className="w-full mb-2 px-4 py-2 border rounded-lg"
          />
          <input
            type="url"
            name="images"
            placeholder="Image URL 2"
            className="w-full mb-2 px-4 py-2 border rounded-lg"
          />
          <input
            type="url"
            name="images"
            placeholder="Image URL 3"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-lg font-medium mb-2">Latitude</label>
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
            <label htmlFor="longitude" className="block text-lg font-medium mb-2">Longitude</label>
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

        {/* Social as Buttons */}
        <div>
          <label className="block text-lg font-medium mb-2">Social</label>
          <div className="flex space-x-2">
            {( ['social', 'competitive'] as const ).map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setSocialType(opt)}
                className={`px-4 py-2 rounded-lg focus:outline-none ${
                  socialType === opt ? 'bg-accent text-white' : 'bg-gray-200'
                }`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
          <input type="hidden" name="social" value={socialType} />
        </div>

        {/* Cost Per Month */}
        <div>
          <label htmlFor="costPerMonth" className="block text-lg font-medium mb-2">Cost Per Month (£)</label>
          <input
            type="number"
            id="costPerMonth"
            name="costPerMonth"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Age Group as Buttons */}
        <div>
          <label className="block text-lg font-medium mb-2">Age Group</label>
          <div className="flex space-x-2">
            {( ['Under 18s', '18+', 'All Ages'] as const ).map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setAgeGroup(opt)}
                className={`px-4 py-2 rounded-lg focus:outline-none ${
                  ageGroup === opt ? 'bg-accent text-white' : 'bg-gray-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <input type="hidden" name="ageGroup" value={ageGroup} />
        </div>

        {/* Member Count */}
        <div>
          <label htmlFor="memberCount" className="block text-lg font-medium mb-2">Member Count</label>
          <input
            type="number"
            id="memberCount"
            name="memberCount"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Training Frequency */}
        <div>
          <label htmlFor="trainingFreq" className="block text-lg font-medium mb-2">Training Frequency (per week)</label>
          <input
            type="number"
            id="trainingFreq"
            name="trainingFreq"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Amenities as Toggle Buttons */}
        <fieldset className="space-y-2">
          <legend className="text-lg font-medium">Amenities</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(amenities) as AmenityKey[]).map((key) => (
              <React.Fragment key={key}>
                <button
                  type="button"
                  onClick={() => toggleAmenity(key)}
                  className={`px-4 py-2 rounded-lg focus:outline-none ${
                    amenities[key] ? 'bg-accent text-white' : 'bg-gray-200'
                  }`}
                >
                  {key.replace('has', '')}
                </button>
                <input type="hidden" name={key} value={amenities[key].toString()} />
              </React.Fragment>
            ))}
          </div>
        </fieldset>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button type="submit" className="w-full bg-[rgba(34,69,44,0.9)] text-white py-3 rounded-lg hover:bg-accent">
          Add Club
        </button>
      </Form>
    </div>
  );
}
