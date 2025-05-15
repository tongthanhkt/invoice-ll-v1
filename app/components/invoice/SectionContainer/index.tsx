import React from 'react';

export const SectionContainer = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section className="space-y-3 sm:space-y-4 border-0">
      <h3 className="text-base font-semibold tracking-tight text-gray-900">
        {title}
      </h3>
      <div className="flex flex-col space-y-3 sm:space-y-4 border-l pl-2 sm:pl-4 border-neutral-400 border-solid">
        {children}
      </div>
    </section>
  );
};
