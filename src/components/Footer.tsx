import React from 'react';

/**
 * Footer component
 * Unobtrusive, quiet human sign-off with a single truthful credit as requested.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#2C2825]/8 bg-[#FAF6EF] py-10 px-6 sm:px-12 text-center text-xs text-[#8C7A6B]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-serif text-sm font-medium text-[#2C2825]">
          Little Things, Big World
        </p>

        <p className="text-[11px] text-[#7A6E63]">
          An interactive stroll through the ordinary. Take your time out there.
        </p>

        <div className="flex items-center gap-3 text-[11px] text-[#8C7A6B]">
          <span>Created with Google AI Studio</span>
          <span aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
