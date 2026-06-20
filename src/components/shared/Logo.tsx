import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-lg font-light tracking-[0.25em] text-white/90 hover:text-white transition-colors duration-500"
    >
      HAN VISUALS
    </Link>
  );
}
