import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center section w-full max-w-4xl">
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Pho Near Me Logo"
            width={80}
            height={80}
            className="mr-4"
            priority
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">Phở Near Me</h1>
            <p className="text-xl text-gray-600">Find the best phở restaurants in Vietnam</p>
          </div>
        </div>
        
        <Image
          src="/phostore1.jpg"
          alt="Pho restaurant"
          width={600}
          height={400}
          className="rounded-lg shadow-md mb-8 card"
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
            href="/restaurants"
          >
            View Restaurants
          </Link>
          <Link
            className="btn-secondary flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="#"
          >
            Explore Cities
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/restaurants"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Restaurants
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Cities
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          About Us
        </Link>
      </footer>
    </div>
  );
}
