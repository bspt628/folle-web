"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ href: "/about", label: "About Us" },
		{ href: "/concerts", label: "Concerts" },
		{ href: "/contact", label: "Contact Us" },
	];

	const handleLogoClick = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push("/");
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/10 backdrop-blur-md border-b border-white/10 ${
					isScrolled ? "shadow-sm" : ""
				}`}
			>
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							onClick={handleLogoClick}
							className="flex items-center space-x-3 group"
						>
							<Image
								src="/logo.png"
								alt="Orchestra più folle Logo"
								width={40}
								height={40}
								className="rounded-full"
							/>
							<span className="text-xl font-medium tracking-tight text-white group-hover:text-[#C9A333] transition-colors duration-200">
								Orchestra più Folle
							</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="max-md:hidden flex items-center space-x-8">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="text-white hover:text-[#C9A333] transition-colors duration-200"
								>
									{item.label}
								</Link>
							))}
						</nav>

						{/* Mobile Menu Button */}
						<button
							className="md:hidden p-2 text-white hover:text-[#C9A333] transition-colors duration-200"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>

					{/* Mobile Navigation */}
					{isMobileMenuOpen && (
						<nav className="md:hidden mt-4 pb-4 border-t border-black/10">
							<div className="flex flex-col space-y-3 pt-4">
								{navItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="text-white hover:text-[#C9A333] transition-colors duration-200 py-2"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{item.label}
									</Link>
								))}
							</div>
						</nav>
					)}
				</div>
			</header>
		</>
	);
}
