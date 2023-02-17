import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b p-4">
      <div className="mx-auto max-w-xl sm:px-4">
        <Link href="/">Black Stories</Link>
      </div>
    </header>
  );
}
