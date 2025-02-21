import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Momento",
  description: "A simple event manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="./favicon-custom.svg" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
