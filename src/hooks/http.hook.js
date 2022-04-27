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
	const postRequest = useCallback(async (data) => {
		const res = await axios.post(data);
		return res;
	}, []);
	return { postRequest };
};
