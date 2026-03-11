import React, { FC } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbLink } from "@/types/breadcrumb";

interface HeroSubProps {
  title: string;
  description: string;
  breadcrumbLinks: BreadcrumbLink[];
  showBreadcrumb?: boolean;
}

const HeroSub: FC<HeroSubProps> = ({
  title,
  breadcrumbLinks,
  showBreadcrumb = true,
}) => {
  return (
      <section className="relative overflow-x-hidden bg-cover pt-6 pb-6 text-center dark:bg-darkmode md:pt-10 md:pb-10">
        <div className="absolute top-0 -left-1/4 z-0 h-full w-full rounded-b-[64px] bg-heroBg dark:bg-search sm:rounded-b-[96px] lg:rounded-b-[119px]"></div>
        <div
          className={`container relative z-1 mx-auto flex flex-col items-start gap-3 md:max-w-(--breakpoint-md) md:flex-row md:items-center lg:max-w-(--breakpoint-xl) ${showBreadcrumb ? "justify-between" : "justify-start"}`}
        >
          <h2 className="relative text-left text-28 font-bold text-midnight_text dark:text-white sm:text-40 lg:text-50">
            {title}
          </h2>
          {showBreadcrumb && <Breadcrumb links={breadcrumbLinks} />}
        </div>
      </section>
  );
};

export default HeroSub;
