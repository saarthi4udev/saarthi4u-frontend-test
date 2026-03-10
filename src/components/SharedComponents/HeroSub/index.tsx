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
      <section className="text-center bg-cover pt-8 pb-8 md:pt-10 md:pb-10 relative dark:bg-darkmode overflow-x-hidden">
        <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-search"></div>
        <div
          className={`container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 relative z-1 flex items-start md:items-center gap-4 ${showBreadcrumb ? "justify-between" : "justify-start"}`}
        >
          <h2 className="text-midnight_text text-50 relative font-bold dark:text-white ">
            {title}
          </h2>
          {showBreadcrumb && <Breadcrumb links={breadcrumbLinks} />}
        </div>
      </section>
  );
};

export default HeroSub;
