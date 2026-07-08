"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useRef, type ReactNode } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * exit中にNext.jsのRouter Contextを凍結し、旧ページの内容を保持する。
 * Next.js App Routerはlayoutのchildrenを即座に差し替えるが、
 * この凍結によりAnimatePresenceのexitアニメーション中は旧ページが表示される。
 */
function FrozenRouter({ children }: { children: ReactNode }) {
	const context = useContext(LayoutRouterContext);
	const frozenContext = useRef(context).current;

	return (
		<LayoutRouterContext.Provider value={frozenContext}>
			{children}
		</LayoutRouterContext.Provider>
	);
}

export default function PageTransition({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<AnimatePresence
			mode="wait"
			onExitComplete={() => {
				// ハッシュ付き遷移ではアンカー要素にスクロール、それ以外は先頭に戻す
				const hash = window.location.hash;
				if (hash) {
					const el = document.getElementById(hash.slice(1));
					if (el) {
						el.scrollIntoView({ behavior: "instant" });
						return;
					}
				}
				window.scrollTo({ top: 0, behavior: "instant" });
			}}
		>
			<motion.div
				key={pathname}
				initial={{ x: 20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -20, opacity: 0 }}
				transition={{
					duration: 0.25,
					ease: [0.25, 0.1, 0.25, 1],
				}}
			>
				<FrozenRouter>{children}</FrozenRouter>
			</motion.div>
		</AnimatePresence>
	);
}
