import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		// 背景・ヘッダー・フッターはルートレイアウトのものを利用
		<div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
			{/* Fオケのロゴ（オープニングと同じ白グロー） */}
			<Image
				src="/logo.svg"
				alt="Orchestra più Folle"
				width={192}
				height={192}
				className="mb-8 h-48 w-48"
				style={{
					filter:
						"drop-shadow(0 0 6px rgba(255,255,255,0.85)) drop-shadow(0 0 18px rgba(255,255,255,0.5))",
				}}
				priority
			/>

			<p className="mb-3 font-mono text-sm tracking-[0.4em] text-white/50">
				404
			</p>
			<h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
				ページが見つかりません
			</h1>
			<p className="mb-10 max-w-md text-pretty leading-relaxed text-white/70 [word-break:auto-phrase]">
				お探しのページは移動または削除されたか、URL
				が間違っている可能性があります。お手数ですが、以下からお戻りください。
			</p>

			<div className="flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:flex-row">
				<Link href="/" aria-label="ホームに戻る">
					<Button size="lg" className="w-full sm:w-auto">
						ホームに戻る
					</Button>
				</Link>
				<Link href="/concerts" aria-label="演奏会一覧へ">
					<Button size="lg" variant="outline" className="w-full sm:w-auto">
						演奏会一覧へ
					</Button>
				</Link>
			</div>
		</div>
	);
}
