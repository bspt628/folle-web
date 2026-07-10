"use client";

import Image from "next/image";
import { useState } from "react";

type FlyerImage = {
	url: string | null;
	width?: number | null;
	height?: number | null;
} | null;

interface FlyerFlipProps {
	front: FlyerImage;
	back?: FlyerImage;
	title: string | null;
}

// 演奏会チラシの表示。表面のみの場合は静的表示、表裏が揃う場合は
// クリックで紙をめくるように表裏を切り替えられる。
export function FlyerFlip({ front, back, title }: FlyerFlipProps) {
	const [flipped, setFlipped] = useState(false);
	const frontUrl = front?.url || "/placeholder.jpg";
	const backUrl = back?.url ?? null;
	const label = title ?? "演奏会";

	// 裏面が無い場合は従来通りの静的表示
	if (!backUrl) {
		return (
			<div className="w-full lg:w-auto shrink-0">
				<div
					className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 lg:w-[360px]"
					style={{ aspectRatio: "0.707" }}
				>
					<Image
						src={frontUrl}
						alt={`${label} Poster`}
						fill
						className="object-cover"
						priority
						fetchPriority="high"
						loading="eager"
						sizes="(max-width: 1024px) 100vw, 360px"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full lg:w-auto shrink-0">
			<button
				type="button"
				onClick={() => setFlipped((prev) => !prev)}
				aria-label={flipped ? "チラシの表面を表示" : "チラシの裏面を表示"}
				className="group relative mx-auto block w-full cursor-pointer rounded-2xl [perspective:1800px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:w-[360px]"
				style={{ aspectRatio: "0.707" }}
			>
				<div
					className="relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
					style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
				>
					{/* 表面 */}
					<div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 [backface-visibility:hidden]">
						<Image
							src={frontUrl}
							alt={`${label} チラシ表面`}
							fill
							className="object-cover"
							priority
							fetchPriority="high"
							loading="eager"
							sizes="(max-width: 1024px) 100vw, 360px"
						/>
					</div>
					{/* 裏面 */}
					<div
						className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 [backface-visibility:hidden]"
						style={{ transform: "rotateY(180deg)" }}
					>
						<Image
							src={backUrl}
							alt={`${label} チラシ裏面`}
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 360px"
						/>
					</div>
				</div>
			</button>
		</div>
	);
}
