
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import {featuresConsts} from "@/constants";
import React from "react";
import Image from "next/image";

export function Featured() {

  return (
      <div className="relative flex flex-col py-50 w-full h-full flex items-center justify-center ">
        <h1 className=" text-5xl">
          Get to know<span className="text-5xl font-bold text-orange-500"> us</span>
        </h1>
          <Image
              src="/logo.svg"        // replace with your asset
              alt=""
              fill                // stretches edge-to-edge
              className="object-cover pointer-events-none -z-10 opacity-5 -rotate-180 blur-md"  // stay behind + ignore clicks
              priority                 // optional: avoids flicker
          />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative pt-30 z-10 max-w-7xl mx-auto">
          {featuresConsts.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>

      </div>

  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r border-orange-500 py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-orange-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-orange-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-orange-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-orange-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-orange-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};