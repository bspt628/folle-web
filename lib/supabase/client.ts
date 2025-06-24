import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
	throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error(
		"Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
	);
}

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase接続を初期化中...");

export const supabase = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			persistSession: false,
		},
	}
);

// 接続テスト
const testConnection = async () => {
	try {
		const { data, error } = await supabase
			.from("concerts")
			.select("count")
			.single();
		if (error) {
			console.error("Supabase接続エラー:", error.message);
			return;
		}
		console.log("Supabase接続成功！データベースにアクセスできます。");
		console.log("concerts テーブルの接続テスト結果:", data);
	} catch (err) {
		console.error("Supabase接続テスト中にエラーが発生:", err);
	}
};

// 接続テストを実行
testConnection();
