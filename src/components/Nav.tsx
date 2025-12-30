export default function Nav() {
  const navItems = [
    { label: 'Things I Made', href: '#' },
    { label: 'Journey', href: '#' },
    { label: 'Thoughts', href: '#' },
  ];

  const externalLinks = [
    { label: 'MRS →', href: '#' },
    { label: 'Zia →', href: '#' },
  ];

  return (
    <nav className="text-end">
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
    </nav>
  );
}
