"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoLinkProps {
	variant?: "header" | "footer" | "about";
	withLink?: boolean;
	className?: string;
}

export default function LogoLink({
	variant = "header",
	withLink = true,
	className = "",
}: LogoLinkProps) {
	const router = useRouter();

	const handleLogoClick = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push("/");
	};

	const logoSrc = "/logo-mono.png";
	const logoWidth = 240;
	const logoHeight = 48;

	const imageComponent = (
		<Image
			src={logoSrc}
			alt="Orchestra più Folle"
			width={logoWidth}
			height={logoHeight}
			className={`mr-2 ${className}`}
			priority={variant === "header"}
		/>
	);

	if (!withLink) {
		return imageComponent;
	}

	return (
		<Link
			href="/"
			onClick={handleLogoClick}
			className="transition-transform flex items-center"
			aria-label="トップページに戻る"
		>
			{imageComponent}
		</Link>
	);
}
