import Image from "next/image";

export default function Loading() {
	return (
		<div className="overlay">
			<Image
				src="/logo.png"
				alt="Logo"
				className="logo animate-spin"
				width={100}
				height={100}
			/>
			<div className="text text-fade-in">Orchestra più Folle</div>
		</div>
	);
}
