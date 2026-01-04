'use client';

interface WhatsMakeMeProps {
  skills: string[];
}

export default function WhatsMakeMe({ skills }: WhatsMakeMeProps) {
  return (
    <div 
      className="inline lg:absolute lg:-z-2 lg:top-8 lg:right-0 lg:w-[51%] lg:pointer-events-none"
    >
      <section className="flex flex-col items-start lg:pointer-events-auto">
        <h2>(What&#39;s make me)</h2>
        <br />
        {skills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}
        <br />
      </section>
    </div>
  );
}
