import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系我",
  description:
    "联系 Han Visuals，洽谈摄影、视频创作与调色项目合作。",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
