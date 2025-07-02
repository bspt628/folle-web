import Link from "next/link";
import { Instagram } from "lucide-react";
import Image from "next/image";
import LogoLink from "@/components/ui/logo-link";

export default function Footer() {
	return (
		<footer className="relative text-white py-12 bg-black">
			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Site Map */}
					<div>
						<div className="flex items-center mb-4">
							<LogoLink variant="footer" />
						</div>
						<nav className="grid grid-cols-1 gap-2">
							<Link
								href="/about"
								className="block hover:text-[var(--accent-green)] transition-colors"
							>
								About Us
							</Link>
							<Link
								href="/concerts"
								className="block hover:text-[var(--accent-green)] transition-colors"
							>
								Concerts
							</Link>
							<Link
								href="/contact"
								className="block hover:text-[var(--accent-green)] transition-colors"
							>
								Contact Us
							</Link>
						</nav>
					</div>

					{/* Social Media and Copyright */}
					<div>
						<div className="flex space-x-4 h-6">
							<a
								href="https://x.com/orchpiufolle"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-colors group w-6 h-6 flex items-center justify-center"
							>
								<Image
									src="/x-logo-white.png"
									alt="X (Twitter)"
									width={24}
									height={24}
									className="transition-all duration-200 group-hover:[filter:brightness(100%)_sepia(100%)_hue-rotate(57deg)_saturate(1100%)]"
								/>
							</a>
							<a
								href="https://www.instagram.com/orchpiufolle/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--accent-green)] transition-colors w-6 h-6 flex items-center justify-center"
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
