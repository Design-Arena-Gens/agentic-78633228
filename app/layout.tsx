import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dorksense",
  description: "A neobrutalist creative experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
