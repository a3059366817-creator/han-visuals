import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl sm:text-5xl font-thin tracking-tight text-white mt-16 mb-6 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white/90 mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-light tracking-tight text-white/80 mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base sm:text-lg font-light leading-relaxed text-white/50 mb-6">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-2 mb-6 text-white/50 font-light">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-white/50 font-light">{children}</ol>
  ),
  li: ({ children }) => <li className="text-base font-light">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l border-white/[0.12] pl-6 py-2 my-8 text-white/35 italic font-light">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-white/60 hover:text-white/90 underline underline-offset-4 transition-colors duration-300"
    >
      {children}
    </a>
  ),
  img: (props) => (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={1200}
      height={800}
      className="w-full h-auto my-10"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
    />
  ),
  hr: () => <hr className="border-white/[0.06] my-16" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
