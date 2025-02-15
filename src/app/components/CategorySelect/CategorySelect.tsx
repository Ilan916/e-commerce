import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface CategorySelectProps {
  categories: { id: string; name: string }[];
  selectedCategory: string | null;
  onChange: (value: string) => void;
}

export default function CategorySelect({ categories, selectedCategory, onChange }: CategorySelectProps) {
  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-900">
        Catégorie
      </label>
      <div className="mt-2 relative">
        <select
          id="category"
          name="category"
          value={selectedCategory || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-10 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:text-sm"
          aria-label="Sélecteur de catégorie"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 sm:h-4 sm:w-4"
        />
      </div>
    </div>
  );
}
