import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">{siteConfig.name}</h1>
        <nav className="space-y-4">
          <Link
            href={siteConfig.routes.projects}
            className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Projects
          </Link>
          <Link
            href={siteConfig.routes.about}
            className="block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            About
          </Link>
          <Link
            href={siteConfig.routes.contact}
            className="block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
