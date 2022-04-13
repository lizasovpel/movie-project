import { useCallback } from "react";

export const useHttp = () => {
	const request = useCallback(
		async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
			try {
				const res = await fetch(url, { method, body, headers });
				if (!res.ok) {
					throw new Error(`could not fetch ${url}, status: ${res.status}`);
				}
				const data = await res.json();
				return data;
			} catch (error) {
				throw error;
			}
		},
		[]
	);

	return { request };
};
