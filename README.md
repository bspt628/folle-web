This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 演奏会情報の追加方法
`./lib/constants/concerts.ts`に追加する

```json
{
		id: "1", // ID
		title: "第1回特別演奏会", // 演奏会名
		date: "2025-11-09", // 日時
		openTime: "13:00", // 開場時間
		startTime: "13:30", // 開演時間
		venue: {
			name: "所沢市民文化センター ミューズ アークホール", // 場所
		},
		program: [ // プログラム
			{
				composer: "ベートーヴェン",
				title: "「シュテファン王」序曲",
			},
			{
				composer: "メンデルスゾーン",
				title: "交響曲第4番 「イタリア」",
			},
			{
				composer: "メンデルスゾーン",
				title: "交響曲第5番 「宗教改革」",
			},
		],
		posterImage: { // ビラ
			url: "/Fオケ第1回定演_ビラ案(赤色)_微修正2.png",
			width: 2894,
			height: 4093,
		},
		ticketPrice: [ // チケット情報
			{
				category: "全席自由・入場無料",
				price: null,
			},
		],
		teketUrl: null, // チケットリンク、nullの時はチケットボタンにcoming soonと表示される
		description: // 演奏会の説明
			"第1回特別演奏会は、指揮に水戸博之氏を迎え、「定番の曲目を熱狂的にお届けする」ことをテーマにした演奏会を開催予定です。\n東京大学音楽部管弦楽団の現役団員が中心となり、各個人が各々の個性や情熱をぶつけ、考え抜いた音楽を奏で、それを味わっていただく演奏会です。",
	},
```

## 更新情報の追加情報
`./folle-web/lib/constants/news.ts`に追加する
```json 
{
		date: "2025.06.30", // 日付
		title: "Orchestra più folleのWebサイトを公開しました", // 本文
	}
```