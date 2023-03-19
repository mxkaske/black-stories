import Link from "@/components/ui/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-xl p-4">
        <p className="text-center text-sm font-light">
          Built by <Link href="https://twitter.com/mxkaske">@mxkaske</Link> ·
          Hosted on <Link href="https://vercel.com">Vercel</Link> · Source code
          available on{" "}
          <Link href="https://github.com/mxkaske/black-stories">GitHub</Link>
        </p>
      </div>
    </footer>
  );
}
