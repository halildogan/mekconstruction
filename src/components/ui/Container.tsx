import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "default" | "narrow";
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-10",
        size === "narrow" ? "max-w-4xl" : "max-w-[90rem]",
        className,
      )}
      {...props}
    />
  );
}
