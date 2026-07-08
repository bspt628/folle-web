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
			{/* Content（背景はレイアウトの固定背景を使用） */}
			<div className={`relative z-10 pt-20 ${className}`}>{children}</div>
		</div>
	);
}
