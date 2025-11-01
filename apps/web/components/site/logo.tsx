import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  scale?: number;
}

export function Logo({ scale = 1 }: LogoProps) {
  const logoSize = 30 * scale;
  const wordmarkSize = { width: 100 * scale, height: 10 * scale };

  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/Logo.svg"
        alt="SkyTeam Logo"
        width={logoSize}
        height={logoSize}
        className="cursor-pointer"
      />
      <Image
        src="/Wordmark.svg"
        alt="SkyTeam"
        width={wordmarkSize.width}
        height={wordmarkSize.height}
        className="cursor-pointer hidden md:block"
      />
    </Link>
  );
}


