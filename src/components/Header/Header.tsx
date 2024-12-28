import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { CloseDrawerIcon, OpenDrawerIcon } from "../Icons";

export function Header() {
  const { pathname } = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  return (
    <header className="w-full h-16 bg-[color-mix(in_srgb,#1e2734,transparent_10%)] backdrop-blur-sm sticky top-0 left-0 border-b-[1px] border-[#ffffff1f] flex items-center justify-between z-50 px-4 md:px-8">
      {/* Logo */}
      <Link to="/">
        <img
          draggable="false"
          className="h-9 w-auto aspect-square"
          src="/chatgptdbdimage.webp"
          alt="Dbd Survior Perks logo"
        />
      </Link>

      {/* Navegación para escritorio */}
      <nav className="hidden md:flex items-center">
        <ul className="flex gap-4 text-sm">
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/" || pathname === "/perks" ? "bg-[#121b28]" : ""
              }`}
              to="/perks"
            >
              Perks
            </Link>
          </li>
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/builds" ? "bg-[#121b28]" : ""
              }`}
              to="/builds"
            >
              Builds
            </Link>
          </li>
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/builds/new" ? "bg-[#121b28]" : ""
              }`}
              to="/builds/new"
            >
              New build
            </Link>
          </li>
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/builds/random" ? "bg-[#121b28]" : ""
              }`}
              to="/builds/random"
            >
              Random build
            </Link>
          </li>
        </ul>
      </nav>

      {/* Botón menú móvil */}
      <div className="p-2 md:hidden">
        <button
          className="w-12 h-12 flex justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseDrawerIcon /> : <OpenDrawerIcon />}
        </button>
      </div>

      {/* Menú móvil */}
      <nav
        className={`absolute top-16 left-0 w-full bg-[#1e2734] md:hidden flex flex-col gap-4 p-4 transition-transform duration-300 h-dvh ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-4 text-sm">
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/" || pathname === "/perks" ? "bg-[#121b28]" : ""
              }`}
              to="/perks"
              onClick={() => setIsMenuOpen(false)}
            >
              Perks
            </Link>
          </li>
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/builds" ? "bg-[#121b28]" : ""
              }`}
              to="/builds"
              onClick={() => setIsMenuOpen(false)}
            >
              Builds
            </Link>
          </li>
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/builds/new" ? "bg-[#121b28]" : ""
              }`}
              to="/builds/new"
              onClick={() => setIsMenuOpen(false)}
            >
              New build
            </Link>
          </li>
          <li>
            <Link
              className={`px-4 py-2 hover:bg-[#121b28] rounded-lg ${
                pathname === "/builds/random" ? "bg-[#121b28]" : ""
              }`}
              to="/builds/random"
              onClick={() => setIsMenuOpen(false)}
            >
              Random build
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
