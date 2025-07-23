"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogoLink from "@/components/ui/logo-link";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const firstFocusableElementRef = useRef<HTMLAnchorElement>(null);
	const lastFocusableElementRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isMobileMenuOpen) {
			// メニューが開いたら最初の要素にフォーカスを移動
			firstFocusableElementRef.current?.focus();
		}
	}, [isMobileMenuOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isMobileMenuOpen]);

	const handleTabKey = (e: React.KeyboardEvent) => {
		if (!isMobileMenuOpen) return;

		const firstFocusable = firstFocusableElementRef.current;
		const lastFocusable = lastFocusableElementRef.current;

		if (!e.shiftKey && document.activeElement === lastFocusable) {
			e.preventDefault();
			firstFocusable?.focus();
		}

		if (e.shiftKey && document.activeElement === firstFocusable) {
			e.preventDefault();
			lastFocusable?.focus();
		}
	};

	const navItems = [
		{ href: "/about", label: "About Us" },
		{ href: "/concerts", label: "Concerts" },
		{ href: "/contact", label: "Contact Us" },
	];

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/20 backdrop-blur-xl border-b border-white/10 ${
					isScrolled ? "shadow-sm" : ""
				}`}
				role="banner"
			>
				<div className="w-full px-4">
					<div className="flex items-center justify-between py-2">
						<LogoLink variant="header" />

						{/* Desktop Navigation */}
						<nav
							className="max-md:hidden flex items-center space-x-8"
							aria-label="メインナビゲーション"
						>
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="text-white hover:text-[hsl(var(--primary))] hover:brightness-150 transition-colors duration-200"
								>
									{item.label}
								</Link>
							))}
						</nav>

						{/* Mobile Menu Button */}
						<button
							className="md:hidden p-2 text-white hover:text-[hsl(var(--primary))] hover:brightness-150 transition-colors duration-200"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="メインメニューを開閉"
							aria-expanded={isMobileMenuOpen}
							aria-controls="mobile-navigation"
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>

					{/* Mobile Navigation */}
					<nav
						id="mobile-navigation"
						className={`md:hidden mt-4 pb-4 border-t border-black/10 ${
							!isMobileMenuOpen ? "hidden" : ""
						}`}
						aria-label="モバイルメインナビゲーション"
						onKeyDown={handleTabKey}
						aria-hidden={!isMobileMenuOpen}
					>
						<div className="flex flex-col space-y-3 pt-4">
							{navItems.map((item, index) => (
								<Link
									key={item.href}
									href={item.href}
									className="text-white hover:text-[hsl(var(--primary))] hover:brightness-150 transition-colors duration-200 py-2"
									onClick={() => setIsMobileMenuOpen(false)}
									ref={
										index === 0
											? firstFocusableElementRef
											: index === navItems.length - 1
											? lastFocusableElementRef
											: null
									}
								>
									{item.label}
								</Link>
							))}
						</div>
					</nav>
				</div>
			</header>
		</>
	);
}
