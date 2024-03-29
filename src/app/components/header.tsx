import Link from "@/components/ui/link";
import InfoDialog from "./info-dialog";

export default function Header() {
  return (
    <header className="border-b border-gray-100 p-4">
      <div className="mx-auto max-w-xl sm:px-4">
        <div className="flex items-center justify-between">
          <Link href="/">Black Stories</Link>
          <InfoDialog />
        </div>
      </div>
    </header>
  );
}
