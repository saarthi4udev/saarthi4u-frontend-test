import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/new_logo.png"
        alt="logo"
        width={140}
        height={30}
        quality={100}
        className="dark:hidden"
      />

      <Image
        src="/images/logo/new_logo.png"
        alt="logo"
        width={140}
        height={30}
        quality={100}
        className="hidden dark:block"
      />
    </Link>
  );
};

export default Logo;
