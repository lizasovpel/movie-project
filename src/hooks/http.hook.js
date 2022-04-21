import { useCallback } from "react";

export const useHttp = () => {
	const axios = require("axios");
	const request = useCallback(async (url) => {
		const res = await axios.get(url);
		const data = res.data;
		return data;
	}, []);

	return { request };
};
