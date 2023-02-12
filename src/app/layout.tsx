import "./globals.css";
import { Inter } from "@next/font/google";
import Footer from "./footer";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <Header />
        <main className="container mx-auto flex-1 p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
