import type { Metadata } from "next";
import "@/app/global.css";

export const metadata: Metadata = {
  title: "Auth",
  description: "Login Page"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}