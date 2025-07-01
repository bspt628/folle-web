"use client";

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
	const router = useRouter();

	const handleLogoClick = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push("/");
	};

	return (
		<footer className="relative text-white py-12 bg-black">
			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Site Map */}
					<div>
						<div className="flex items-center mb-4">
							<Image
								src="/logo.png"
								alt="Logo"
								width={30}
								height={30}
								className="mr-2"
							/>
							<Link
								href="/"
								onClick={handleLogoClick}
								className="hover:text-[#C9A333] transition-colors flex items-center"
							>
								<h3 className="text-xl font-medium tracking-tight text-white hover:text-[#C9A333] transition-colors">
									Orchestra più Folle
								</h3>
							</Link>
						</div>
						<nav className="grid grid-cols-1 gap-2">
							<Link
								href="/about"
								className="block hover:text-[#C9A333] transition-colors"
							>
								About Us
							</Link>
							<Link
								href="/concerts"
								className="block hover:text-[#C9A333] transition-colors"
							>
								Concerts
							</Link>
							<Link
								href="/contact"
								className="block hover:text-[#C9A333] transition-colors"
							>
								Contact Us
							</Link>
						</nav>
					</div>

					{/* Social Media and Copyright */}
					<div>
						<div className="flex space-x-4">
							<a
								href="https://x.com/orchpiufolle"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[#C9A333] transition-colors"
							>
								<Twitter size={24} />
							</a>
							<a
								href="https://www.instagram.com/orchpiufolle/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[#C9A333] transition-colors"
							>
								<Instagram size={24} />
							</a>
						</div>
						<p className="mt-4 text-white/80">
							© 2025 Orchestra più Folle. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
