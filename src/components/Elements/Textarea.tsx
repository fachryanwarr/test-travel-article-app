import * as React from "react";

import { get, RegisterOptions, useFormContext } from "react-hook-form";
import clsxm from "../../lib/clsxm";

export type TextAreaProps = {
  id: string;
  label?: string;
  labelClassName?: string;
  validation?: RegisterOptions;
  helperText?: string;
  helperTextClassName?: string;
  hideError?: boolean;
  parentClassName?: string;
} & React.ComponentPropsWithoutRef<"textarea">;

export default function TextArea({
  id,
  label,
  labelClassName,
  validation,
  helperText,
  helperTextClassName,
  hideError = false,
  className,
  maxLength = 255,
  readOnly = false,
  parentClassName = "",
  ...rest
}: TextAreaProps) {
  const [value, setValue] = React.useState("");

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const textArea = register(id, validation);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    textArea.onChange(e);
    setValue(e.currentTarget.value);
  };

  return (
    <div className={clsxm("w-full space-y-1.5", parentClassName)}>
      {label && (
        <label htmlFor={id} className="flex space-x-1 items-center mb-2">
          <p className={clsxm("text-white", labelClassName)}>{label}</p>
          {validation?.required && <p className="text-red-500">*</p>}
        </label>
      )}

      <div className="relative">
        <textarea
          {...textArea}
          id={id}
          name={id}
          readOnly={readOnly}
          disabled={readOnly}
          maxLength={maxLength}
          onChange={handleChange}
          className={clsxm(
            "w-full rounded-md px-5 py-3 placeholder:text-bw-300 text-bw-100 h-64",
            "border-none ring-1 bg-transparent ring-gray-300 focus:ring-white focus:ring-2",
            readOnly && "cursor-not-allowed",
            className
          )}
          aria-describedby={id}
          {...rest}
        />
        <p className="p3 text-bw-200 absolute bottom-2.5 right-3">
          {value.length}/{maxLength}
        </p>
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
