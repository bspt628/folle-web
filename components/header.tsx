"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogoLink from "@/components/ui/logo-link";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const firstFocusableElementRef = useRef<HTMLAnchorElement>(null);
	const lastFocusableElementRef = useRef<HTMLAnchorElement>(null);
	const lastScrollYRef = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY;
			setIsScrolled(y > 50);
			const last = lastScrollYRef.current;
			// 微小なスクロールは無視してちらつきを防ぐ
			if (Math.abs(y - last) <= 5) return;
			if (isMobileMenuOpen || y <= 80) {
				// 上部付近・メニュー展開中は常に表示
				setIsHidden(false);
			} else if (y > last) {
				// 下方向にスクロール → ヘッダーを上へ隠す
				setIsHidden(true);
			} else {
				// 上方向にスクロール → ヘッダーを表示
				setIsHidden(false);
			}
			lastScrollYRef.current = y;
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isMobileMenuOpen]);

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
		{ href: "/about", label: "団体紹介" },
		{ href: "/concerts", label: "演奏会" },
		{ href: "/contact", label: "お問い合わせ" },
	];

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-black border-b border-white/10 ${
					isHidden ? "-translate-y-full" : "translate-y-0"
				} ${isScrolled ? "shadow-sm" : ""}`}
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
