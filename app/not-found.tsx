import Link from "next/link";
import { Compass, Home, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		// 背景・ヘッダー・フッターはルートレイアウトのものを利用
		<div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
			{/* アイコン */}
			<div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
				<Compass
					className="h-14 w-14 text-[hsl(var(--brand))]"
					aria-hidden="true"
				/>
			</div>

			<p className="mb-3 font-mono text-sm tracking-[0.4em] text-white/50">
				404
			</p>
			<h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
				ページが見つかりません
			</h1>
			<p className="mb-10 max-w-md leading-relaxed text-white/70">
				お探しのページは移動または削除されたか、URL が間違っている可能性があります。
				お手数ですが、以下からお戻りください。
			</p>

			<div className="flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:flex-row">
				<Link href="/" aria-label="ホームに戻る">
					<Button size="lg" className="w-full gap-2 sm:w-auto">
						<Home aria-hidden="true" />
						ホームに戻る
					</Button>
				</Link>
				<Link href="/concerts" aria-label="演奏会一覧へ">
					<Button
						size="lg"
						variant="outline"
						className="w-full gap-2 sm:w-auto"
					>
						<CalendarDays aria-hidden="true" />
						演奏会一覧へ
					</Button>
				</Link>
			</div>
		</div>
	);
}
