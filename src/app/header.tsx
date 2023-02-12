import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-xl p-4">
        <Link href="/">Black Stories</Link>
      </div>
    </header>
  );
}
