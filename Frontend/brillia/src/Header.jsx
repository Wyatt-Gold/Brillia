import React from "react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-sky-600 rounded-sm" />
          <span className="font-semibold text-lg">Brillia</span>
        </div>

        <nav className="flex items-center gap-8">
          <a href="#" className="hover:text-sky-600 font-medium">
            Subjects
          </a>
          <a href="#" className="hover:text-sky-600 font-medium">
            Resources
          </a>
          <a href="#" className="hover:text-sky-600 font-medium">
            Support
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-full text-sm font-medium">
            Get Started
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
