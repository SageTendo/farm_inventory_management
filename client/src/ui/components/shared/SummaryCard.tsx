import React from "react";

interface SummaryCardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  bg?: string;        // Tailwind-compatible bg class, e.g. "bg-gray-900"
  textColor?: string; // Tailwind-compatible text class, e.g. "text-white"
  border?: string;    // Tailwind-compatible border class, e.g. "border-green-500"
}

export function SummaryCard({
  title,
  className = "w-full h-full",
  children,
  footer,
  bg = "bg-gray-900",
  textColor = "text-white",
  border = "border border-gray-700",
}: SummaryCardProps) {
  return (
    <div
      className={`rounded-xl shadow-md p-4 flex flex-col justify-between ${bg} ${textColor} ${border} ${className}`}
    >
      {title && (
        <div className="text-2xl font-extrabold mb-4 border-b border-white pb-2">
          {title}
        </div>
      )}
      <div className="flex items-center justify-end flex-grow">{children}</div>
      {footer && (
        <div className="mt-4 border-t border-gray-700 pt-2 text-sm">
          {footer}
        </div>
      )}
    </div>
  );
}
