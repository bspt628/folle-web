import Image from "next/image";

interface PageContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function PageContainer({
	children,
	className = "",
}: PageContainerProps) {
	return (
		<div className="min-h-screen relative">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/gray_back.jpg"
					alt="Background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/60" />
			</div>

			{/* Content */}
			<div className={`relative z-10 pt-20 ${className}`}>{children}</div>
		</div>
	);
}
