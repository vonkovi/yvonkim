import { Link } from "wouter";

export function Navigation() {
  return (
    <header className="border-b border-gray-300 pb-4 mb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center pt-5">
          <div>
            <h1 className="text-xl font-spectral font-semibold">
              <Link href="/" className="">
                Yvon Kim
              </Link>
            </h1>
          </div>
        </nav>
      </div>
    </header>
  );
}
