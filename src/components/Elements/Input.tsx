import { useState } from "react";
import { get, RegisterOptions, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { HiEye, HiEyeOff } from "react-icons/hi";

import clsxm from "../../lib/clsxm";

export type InputProps = {
  id: string;
  label?: string;
  labelClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  light?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  id,
  label,
  labelClassName,
  helperText,
  hideError = false,
  validation,
  className,
  type = "text",
  readOnly = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftIconClassName,
  rightIconClassName,
  helperTextClassName,
  light = false,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className="w-full space-y-1.5 rounded-md">
      {label && (
        <label htmlFor={id} className="flex space-x-1 items-center mb-2">
          <p className={clsxm("text-white", labelClassName)}>{label}</p>
          {validation?.required && <p className="text-red-500">*</p>}
        </label>
      )}

      <div
        className={clsxm(
          "w-full flex relative rounded-full group ring-1 overflow-hidden",
          light ? "ring-dark-primary" : "ring-gray-300",
          className
        )}
      >
        {LeftIcon && (
          <div
            className={clsxm(
              "absolute top-0 left-0 h-full flex justify-center items-center px-2.5 text-lg text-dark-primary bg-white",
              leftIconClassName
            )}
          >
            <LeftIcon />
          </div>
        )}

        <input
          {...register(id, validation)}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={id}
          name={id}
          readOnly={readOnly}
          disabled={readOnly}
          className={clsxm(
            "w-full h-full px-5 py-3 rounded-md bg-transparent",
            [LeftIcon && "pl-12", RightIcon && "pr-12"],
            "focus:ring-1 focus:ring-white focus:outline-none",
            readOnly && "cursor-not-allowed bg-gray-100",
            light
              ? "placeholder:text-bw-400 text-bw-800"
              : "placeholder:text-bw-300 text-bw-100",
            className
          )}
          aria-describedby={id}
          {...rest}
        />

        {RightIcon && type !== "password" && (
          <div
            className={clsxm(
              "absolute bottom-0 right-0 h-full flex justify-center items-center px-2.5 bg-white text-lg text-dark-primary",
              rightIconClassName
            )}
          >
            <RightIcon />
          </div>
        )}

        {type === "password" && (
          <div
            className={clsxm(
              "absolute bottom-0 right-0 h-full flex justify-center items-center pr-3 text-gray-400 text-lg cursor-pointer",
              rightIconClassName
            )}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </div>
        )}
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
