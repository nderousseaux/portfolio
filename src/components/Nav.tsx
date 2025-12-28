export default function Nav() {
  const navItems = [
    { label: '(Who Am I?)', href: '#' },
    { label: 'Things I Made', href: '#' },
    { label: 'Work together', href: '#' },
    { label: 'Thoughts', href: '#' },
  ];

  const externalLinks = [
    { label: 'MRS →', href: '#' },
    { label: 'Zia →', href: '#' },
  ];

  return (
    <nav className="text-end -translate-y-2">
      <ul>
        {navItems.map((item, index) => (
          <li key={index} className={index === 0 ? 'mb-6' : ''}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
        {externalLinks.map((item, index) => (
          <li key={index} className={index === 0 ? 'mt-6' : ''}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
