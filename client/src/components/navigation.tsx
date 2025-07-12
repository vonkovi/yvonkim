import { Link } from "wouter";

export function Navigation() {
  return (
    <header className="border-b border-black pb-4 mb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-xl font-spectral font-semibold">
              <Link href="/" className="hover:underline">
                Yvon Kim
              </Link>
            </h1>
          </div>
          <div>
            <Link href="/portfolio" className="text-sm hover:underline">
              Portfolio
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
