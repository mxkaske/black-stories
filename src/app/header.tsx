import Link from "next/link";
import InfoDialog from "./info-dialog";

export default function Header() {
  return (
    <header className="border-b p-4">
      <div className="mx-auto max-w-xl sm:px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-light tracking-wider">
            <span className="font-black">B</span>lack
            <span className="font-black">S</span>tories
          </Link>
          <InfoDialog />
        </div>
      </div>
    </header>
  );
}
