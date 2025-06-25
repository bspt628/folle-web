import Image from "next/image";

export default function Loading() {
	return (
		<div className="fixed inset-0 bg-black flex items-center justify-center z-50">
			<div className="relative w-32 h-32 animate-pulse">
				<Image
					src="/favicon.ico"
					alt="Loading"
					fill
					className="object-contain animate-[brightness_2s_ease-in-out_infinite]"
					priority
				/>
			</div>
		</div>
	);
}
