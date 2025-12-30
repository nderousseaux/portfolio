import Image from 'next/image';
import { getNavItems, getExternalLinks } from '@/services/navigationService';
import ScrambleLink from '@/components/ui/ScrambleLink';

export default async function Nav() {
  const navItems = await getNavItems();
  const externalLinks = await getExternalLinks();
  return (
    <nav className="w-full flex justify-between items-start">
        <Image src="/logo.svg" alt="Logo" width={75} height={75} />
      <div className="text-end">
        <p>
          <ScrambleLink href="#">(Home)</ScrambleLink>
        </p>
        <br />
        {navItems.map((item, index) => (
          <p key={index}>
            <ScrambleLink href={item.href}>{item.label}</ScrambleLink>
          </p>
        ))}
        <br />
        {externalLinks.map((item, index) => (
          <p key={index}>
            <ScrambleLink href={item.href}>{item.label}</ScrambleLink>
          </p>
        ))}
        <br />
      </div>
    </nav>
  );
}
