export default function WhatIAm() {
  const skills = [
    'Cloud System Engineering',
    'Web Development',
    'Teaching',
    'Research & Science Enthusiast',
    'Tech Explorer',
    'Perpetual Side-Projects',
    'Sports Lover',
    'Avid Traveler',
  ];

  return (
    <section className="flex flex-col items-start">
      <h2 className="mb-4">(What&#39;s make me)</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
