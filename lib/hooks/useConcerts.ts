import { useEffect, useState } from "react";
import { Concert } from "@/lib/api/concerts";
import { getConcert, getUpcomingConcert } from "@/lib/api/concerts";

export function useUpcomingConcert() {
	const [concert, setConcert] = useState<Concert | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchConcert = async () => {
			try {
				console.log("開催予定の演奏会を取得中...");
				const data = await getUpcomingConcert();
				console.log("取得したデータ:", data);
				setConcert(data);
			} catch (err) {
				console.error("演奏会データの取得に失敗:", err);
				setError(err as Error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchConcert();
	}, []);

	return { concert, isLoading, error };
}

export function useConcert(id: string) {
	const [concert, setConcert] = useState<Concert | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchConcert = async () => {
			try {
				console.log(`ID: ${id} の演奏会データを取得中...`);
				const data = await getConcert(id);
				console.log("取得したデータ:", data);
				setConcert(data);
			} catch (err) {
				console.error("演奏会データの取得に失敗:", err);
				setError(err as Error);
			} finally {
				setIsLoading(false);
			}
		};

		if (id) {
			fetchConcert();
		}
	}, [id]);

	return { concert, isLoading, error };
}