import { Link } from "wouter";

export function Navigation() {
  return (
    <header className="border-b border-gray-300 pb-4 mb-8 mx-auto max-w-[619px]">
      <div className="">
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
