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
      <h2>(What&#39;s make me)</h2>
      <br />
      {skills.map((skill, index) => (
        <p key={index}>{skill}</p>
      ))}
      <br />
      
    </section>
  );
}
