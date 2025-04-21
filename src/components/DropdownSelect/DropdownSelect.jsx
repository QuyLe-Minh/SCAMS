import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function DropdownSelect({ label, options, selected, onChange, disabled = false }) {
  return (
    <div className="w-48">
      <Listbox value={selected} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
          <Listbox.Label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <Listbox.Button
            className={`relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm text-sm ${
              disabled ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-300 text-gray-900"
            }`}
          >
            <span className="block truncate">{selected || `Select ${label}`}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
