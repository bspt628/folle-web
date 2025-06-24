import { useEffect, useState } from "react";
import {
	Concert,
	getConcert,
	getUpcomingConcert,
} from "@/lib/constants/concerts";

export function useUpcomingConcert() {
	const [concert, setConcert] = useState<Concert | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		try {
			const data = getUpcomingConcert();
			setConcert(data);
		} catch (err) {
			console.error("演奏会データの取得に失敗:", err);
			setError(err as Error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { concert, isLoading, error };
}

export function useConcert(id: string) {
	const [concert, setConcert] = useState<Concert | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (id) {
			try {
				const data = getConcert(id);
				setConcert(data);
			} catch (err) {
				console.error("演奏会データの取得に失敗:", err);
				setError(err as Error);
			} finally {
				setIsLoading(false);
			}
		}
	}, [id]);

	return { concert, isLoading, error };
}
