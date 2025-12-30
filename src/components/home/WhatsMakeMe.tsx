'use client';

interface WhatsMakeMeProps {
  skills: string[];
}

export default function WhatsMakeMe({ skills }: WhatsMakeMeProps) {
  return (
    <div 
      className="inline min-[992px]:absolute min-[992px]:-z-2 min-[992px]:top-[32px] min-[992px]:right-0 min-[992px]:w-102/200 min-[992px]:pointer-events-none"
    >
      <section className="flex flex-col items-start min-[992px]:pointer-events-auto">
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
