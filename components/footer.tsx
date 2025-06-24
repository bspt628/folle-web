import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Site Map */}
					<div>
						<h3 className="text-lg font-medium tracking-tight mb-4">
							Site Map
						</h3>
						<nav className="space-y-2">
							<Link
								href="/"
								className="block hover:text-[#D4AF37] transition-colors"
							>
								Home
							</Link>
							<Link
								href="/about"
								className="block hover:text-[#D4AF37] transition-colors"
							>
								About Us
							</Link>
							<Link
								href="/concerts"
								className="block hover:text-[#D4AF37] transition-colors"
							>
								Concerts
							</Link>
							<Link
								href="/contact"
								className="block hover:text-[#D4AF37] transition-colors"
							>
								Contact Us
							</Link>
						</nav>
					</div>

					{/* Social Media */}
					<div>
						<h3 className="text-lg font-medium tracking-tight mb-4">SNS</h3>
						<div className="flex space-x-4">
							<a href="#" className="hover:text-[#D4AF37] transition-colors">
								<Twitter size={24} />
							</a>
							<a href="#" className="hover:text-[#D4AF37] transition-colors">
								<Facebook size={24} />
							</a>
							<a href="#" className="hover:text-[#D4AF37] transition-colors">
								<Instagram size={24} />
							</a>
						</div>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-medium tracking-tight mb-4">
							お問い合わせ
						</h3>
						<div className="space-y-2 text-sm">
							<p>Email: orchestrapiufolle[at]gmail.com</p>
							<p className="mt-4 text-gray-400">
								© 2025 Orchestra più folle. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
