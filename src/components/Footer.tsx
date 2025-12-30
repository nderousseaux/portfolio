import { getSocialLinks } from '@/services/socialsService';

export default async function Footer() {
  const socialLinks = await getSocialLinks();
  return (
    <footer className="w-full pt-4">
      <div className="flex flex-col md:flex-row justify-between items-center pt-4">
        <p className="text-gray-400 text-sm mb-2 md:mb-0">
          Work with me ?
        </p>
        <div className="flex space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
