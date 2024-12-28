import { GithubIcon } from "../Icons";

export default function Footer() {
  return (
    // Dejo mt-60 porque hay un bug visual cuando se hace hover en una perk, y sale el tooltip
    <footer className="mt-60 bg-slate-800 md:flex md:justify-center">
      <div className="flex justify-between md:justify-normal md:gap-8 items-center p-4">
        <div>
          <p className="text-balance text-sm">
            Perks data scrapped from{" "}
            <a
              className="underline"
              href="https://nightlight.gg/perks/list"
              target="_blank"
            >
              nightlight.gg
            </a>
            .{" "}
          </p>
          <p className="text-balance text-sm">
            Icons powered by{" "}
            <a
              className="underline"
              href="https://tabler.io/icons"
              target="_blank"
            >
              tabler.io
            </a>
            .
          </p>
        </div>
        <a
          href="https://github.com/jserraemilio/dbd-survivor-perks"
          target="_blank"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
}
