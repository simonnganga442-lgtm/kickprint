import { Menu } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export function DropdownFilter({ label, options, selected, onChange, multiple }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
          {label}
          <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute z-50 mt-2 w-56 origin-top-right rounded-md bg-white border border-gray-200 shadow-lg focus:outline-none">
        <div className="py-1 max-h-64 overflow-y-auto">
          {options.map((option) => {
            const id = option.id;
            const isSelected =
              selected.includes(id) || selected.includes(Number(id));

            return (
              <Menu.Item key={id}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => onChange(id)}
                    className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left ${
                      active ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
                    } ${isSelected ? "font-medium text-indigo-700" : ""}`}
                  >
                    <span>{option.name}</span>
                    {isSelected && (
                      <CheckIcon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    )}
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </div>
      </Menu.Items>
    </Menu>
  );
}
