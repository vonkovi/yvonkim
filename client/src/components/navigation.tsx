import { Link } from "wouter";

export function Navigation() {
  return (
    <header className="border-b border-gray-200 pb-4 mb-4 mr-auto ml-[173px]  max-w-[619px]">
      <div className="">
        <nav className="flex justify-between items-center pt-5">
          <div>
            <h1 className="text-xl font-normal">
              <Link href="/" className="justify-center text-blue-950">
                ⋆.˚ ☼⋆𓇼｡𖦹˙༄.°☼.⋆｡𖦹 °˖ yvon kim ☼.⋆｡𖦹 °˖⋆.˚ ☼⋆𓇼｡𖦹˙༄.°
              </Link>
            </h1>
          </div>
        </nav>
      </div>
    </header>
  );
}
