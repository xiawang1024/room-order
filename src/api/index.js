import axios from 'axios';
const http = axios.create({
	baseURL: '/api',
	timeout: 1000
});

const getUserInfo = (cardId) =>
	http({
		method: 'get',
		url: `/loginapi/askLogin.do?identifier=${cardId}`
	});

const login = (username) =>
	http({
		method: 'get',
		url: `/loginapi/login.do?username=${username}`
	});

const getUserOrderInfo = (userId, roomId) =>
	http({
		method: 'get',
		url: `/roomapi/queryroomByIdApi.do?userId=${userId}&roomId=${roomId}`
	});

export { getUserInfo, login, getUserOrderInfo };
