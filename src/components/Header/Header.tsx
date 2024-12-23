import { useState } from "react";
import { Link } from "react-router";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-full h-16 bg-[color-mix(in_srgb,#1e2734,transparent_10%)] md:border-b-2 md:sticky md:top-0 md:left-0 border-[#ffffff1f] flex items-center justify-between z-10">
      <a href="/">
        <img
          className="h-9 w-auto aspect-square"
          src="/chatgptdbdimage.webp"
          alt="Dbd Survior Perks logo"
        />
      </a>
      <nav className="flex items-center">
        <ul className="flex flex-col md:flex-row gap-4 text-sm">
          <Link to="/perks">Perks</Link>
          <li>
            <Link to="/builds">Builds</Link>
          </li>
          <li>
            <Link to="/builds/new">New build</Link>
          </li>
          <li>
            <Link to="/builds/random">Random build</Link>
          </li>
        </ul>
      </nav>
      <div className="p-2">
        <button
          className="w-12 h-auto sm:hidden flex justify-center items-center"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-menu"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8l16 0" />
              <path d="M4 16l16 0" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
