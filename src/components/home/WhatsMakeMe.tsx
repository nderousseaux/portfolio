'use client';

interface WhatsMakeMeProps {
  skills: string[];
}

export default function WhatsMakeMe({ skills }: WhatsMakeMeProps) {
  return (
    <div 
      className="inline lg:absolute lg:top-8 lg:right-0 lg:w-[51%] lg:pointer-events-none"
    >
      <section className="flex flex-col items-start">
        <h2 className="lg:pointer-events-auto">(What&#39;s make me)</h2>
        <br />
        {skills.map((skill, index) => (
          <p key={index} className="lg:pointer-events-auto">{skill}</p>
        ))}
        <br />
      </section>
    </div>
  );
}
