export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-xl p-4">
        <p className="text-center text-sm font-light">
          Built by{" "}
          <a
            className="font-normal underline"
            href="https://twitter.com/mxkaske"
            target="_blank"
            rel="noreferrer"
          >
            @mxkaske
          </a>{" "}
          · Hosted on{" "}
          <a
            className="font-normal underline"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
          >
            Vercel
          </a>{" "}
          · Source code available on{" "}
          <a
            className="font-normal underline"
            href="https://github.com/mxkaske/black-stories"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
