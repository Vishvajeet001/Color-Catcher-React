import { Link } from "react-router";

function Navbar({ onHowToPlay }) {
  return (
    <nav className="flex items-center justify-between py-5 sm:py-6 lg:py-8 px-8 sm:px-10 lg:px-12">
      <Link
        to="/"
        className="font-heading text-xl font-bold sm:text-2xl lg:text-3xl"
      >
        Color<span className="text-accent">Catcher.</span>
      </Link>

      <button
        onClick={onHowToPlay}
        className="text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        How to Play
      </button>
    </nav>
  );
}

export default Navbar;
