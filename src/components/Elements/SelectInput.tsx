import * as React from "react";
import { get, RegisterOptions, useFormContext } from "react-hook-form";

import { FaAngleDown } from "react-icons/fa6";
import clsxm from "../../lib/clsxm";

export type SelectInputProps = {
  id: string;
  label?: string;
  labelClassName?: string;
  labelDirection?: string;
  helperText?: string;
  helperTextClassName?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  readOnly?: boolean;
  placeholder?: string;
  parentClassName?: string;
} & React.ComponentPropsWithoutRef<"select">;

export default function SelectInput({
  id,
  label,
  labelDirection,
  helperText,
  helperTextClassName,
  hideError = false,
  validation,
  className,
  readOnly = false,
  defaultValue = "",
  placeholder = "",
  labelClassName,
  children,
  parentClassName = "",
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className={clsxm("w-full space-y-1.5 rounded-md", parentClassName)}>
      <div
        className={clsxm(
          "relative",
          labelDirection === "horizontal" && "md:flex md:items-center gap-2"
        )}
      >
        {label && (
          <label htmlFor={id} className="flex space-x-1 items-center mb-2">
            <p className={clsxm("text-white", labelClassName)}>{label}</p>
            {validation?.required && <p className="text-red-500">*</p>}
          </label>
        )}

        <div className="relative group">
          <select
            {...register(id, validation)}
            id={id}
            name={id}
            defaultValue={defaultValue}
            disabled={readOnly}
            className={clsxm(
              "w-full pl-3 pr-8 py-2.5 truncate rounded-md border-none mt-1 bg-transparent placeholder:text-bw-300 text-bw-100",
              "focus:ring-inset focus:ring-white ring-1 ring-inset ring-gray-300 focus:outline-0",
              readOnly && "cursor-not-allowed",
              className
            )}
            aria-describedby={id}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <FaAngleDown className="text-gray-500 absolute top-1/2 right-4 text-xl -translate-y-1/2" />
        </div>
      </div>

      {!hideError && error && (
        <p className="p3 text-red-400 italic">{error.message}</p>
      )}
      {!error && helperText && (
        <p className={clsxm("p3 text-bw-50", helperTextClassName)}>
          {helperText}
        </p>
      )}
    </div>
  );
}
