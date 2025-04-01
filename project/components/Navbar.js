import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-400 hover:text-blue-500">
            CryptoWeather Nexus
          </h1>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-blue-400">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}