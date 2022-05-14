import { useCallback } from "react";
const axios = require("axios");

export const useHttpGet = () => {
	const request = useCallback(async (url) => {
		const res = await axios.get(url);
		const data = res.data;
		return data;
	}, []);
	return { request };
};
export const useHttpsPost = () => {
	const postRequest = useCallback((url, body) => {
		const res = axios.post(url, body);
		return res;
	}, []);
	return { postRequest };
};
