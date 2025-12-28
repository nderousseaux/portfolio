export default function Footer() {
  const socialLinks = [
    { label: 'Email', href: 'mailto:contact@nldx.sh' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nderousseaux', external: true },
    { label: 'GitHub', href: 'https://github.com/nderousseaux', external: true },
  ];

  return (
    <footer className="w-full pt-4">
      <div className="border-t border-gray-600 mx-auto w-4/5 mb-4"></div>
      <div className="flex justify-center gap-6 mb-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500">
        © 2025 Nathanaël Derousseaux. All rights reserved.
      </p>
    </footer>
  );
}
