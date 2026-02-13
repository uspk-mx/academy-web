import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";

interface CustomCheckboxProps extends ComponentProps<"input"> {
  label: string;
}

export function CustomCheckbox({
  label,
  checked,
  ...rest
}: CustomCheckboxProps): ReactNode {
  return (
    <label className="inline-flex items-center cursor-pointer group">
      <div className="relative">
        <input className="sr-only" type="checkbox" {...rest} />
        <div
          className={`w-6 h-6 flex justify-center items-center border-2 rounded-md group-focus-within:ring-2 group-focus-within:ring-offset-2 group-focus-within:ring-blue-500/70 ${
            checked
              ? "bg-green-500 border-green-500"
              : "bg-white border-gray-300"
          } transition-colors duration-200 ease-in-out`}
        >
          {checked ? (
            <svg
              className="w-4 h-4 text-white fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          ) : null}
        </div>
      </div>
      <span className="ml-2 text-gray-700 sr-only">{label}</span>
    </label>
  );
}
