import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Saarthi4u home">
      <Image
        src="/images/logo/new_logo.png"
        alt="logo"
        width={140}
        height={30}
        priority
        sizes="(max-width: 640px) 120px, (max-width: 1024px) 132px, 140px"
        className="h-auto w-[120px] dark:hidden sm:w-[132px] lg:w-[140px]"
      />

      <Image
        src="/images/logo/new_logo.png"
        alt="logo"
        width={140}
        height={30}
        priority
        sizes="(max-width: 640px) 120px, (max-width: 1024px) 132px, 140px"
        className="hidden h-auto w-[120px] dark:block sm:w-[132px] lg:w-[140px]"
      />
    </Link>
  );
};

export default Logo;
