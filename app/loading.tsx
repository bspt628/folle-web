import Image from "next/image";

export default function Loading() {
	return (
		<div className="overlay">
			<Image
				src="/567993919410012183.jpg"
				alt="Logo"
				className="logo animate-spin"
				width={487}
				height={488}
			/>
			<div className="text text-fade-in">Orchestra più Folle</div>
		</div>
	);
}
