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
       {/* always render the main search input */}
       <div>
         <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
           Search clubs
         </label>
         <input
           type="text"
           name="sport"
           id="sport"
           defaultValue={sportQuery}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
           placeholder="e.g. tennis, football…"
         />
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
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
             >
               <option value="">Any</option>
               <option>Very Social</option>
               <option>Social</option>
               <option>Training Only</option>
             </select>
           </div>
         </>
       )}

       <button
         type="submit"
         className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white shadow-sm"
       >
         Search
       </button>
     </form>
   );
 }