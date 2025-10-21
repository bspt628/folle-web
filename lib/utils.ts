import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * YouTube動画の公開日時をチェックする
 * @param publishDate ISO 8601形式の日時文字列（例: "2025-10-23T18:00:00+09:00"）
 * @returns 公開日時が現在時刻より前の場合はtrue、そうでなければfalse
 */
export function isVideoPublished(publishDate?: string): boolean {
	if (!publishDate) {
		return true; // 公開日時が設定されていない場合は常に表示
	}

	const now = new Date();
	const publishDateTime = new Date(publishDate);

	return now >= publishDateTime;
}
