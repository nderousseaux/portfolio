import Image from 'next/image';
import { getNavItems, getExternalLinks } from '@/services/navigationService';

export default async function Nav() {
  const navItems = await getNavItems();
  const externalLinks = await getExternalLinks();
  return (
    <nav className="w-full flex justify-between items-start">
        <Image src="/logo.svg" alt="Logo" width={75} height={75} />
      <div className="text-end">
        <p>
          <a href="#">(Home)</a>
        </p>
        <br />
        {navItems.map((item, index) => (
          <p key={index}>
            <a href={item.href}>{item.label}</a>
          </p>
        ))}
        <br />
        {externalLinks.map((item, index) => (
          <p key={index}>
            <a href={item.href}>{item.label}</a>
          </p>
        ))}
        <br />
      </div>
    </nav>
  );
}
