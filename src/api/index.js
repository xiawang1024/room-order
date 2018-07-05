import axios from 'axios';
const http = axios.create({
	baseURL: '/api',
	timeout: 1000
});
/**
 * 根据卡号获取用户基本信息
 * @param {*} cardId
 */
const getUserInfo = (cardId) =>
	http({
		method: 'get',
		url: `/loginapi/askLogin.do?identifier=${cardId}`
	});
/**
 * 用户编号登录
 * @param {*} username
 */
const login = (username) =>
	http({
		method: 'get',
		url: `/loginapi/login.do?username=${username}`
	});

/**
 * 获取房间的所有预约信息
 * @param {*} userId
 * @param {*} roomId
 */
const getUserOrderInfo = (userId, roomId) =>
	http({
		method: 'get',
		url: `/roomapi/queryroomByIdApi.do?userId=${userId}&roomId=${roomId}`
	});

/**
   * 获取roomId房间所有预约信息
   * @param {String} roomId
   */
const getRoomOrderInfo = (roomId) =>
	http({
		method: 'get',
		url: `/roomapi/queryroomByroomIdApi.do?roomId=${roomId}`
	});
/**
 * 获取房间列表
 * @param {*} username
 */
const getRoomList = (username = 'C0003') =>
	http({
		method: 'get',
		url: `/roomapi/queryroomApi.do?username=${username}`
	});
/**
 * 提交预约信息
 * @param {*} userId
 * @param {*} roomId
 * @param {*} startendtime
 */
const postOrderInfo = (userId, roomId, startendtime) =>
	http({
		method: 'get',
		url: `/orderapi/addOrderApi.do?userId=${userId}&roomId=${roomId}&startendtime=${startendtime}`
	});

const getUserOrderListInfo = (userId) =>
	http({
		method: 'get',
		url: `/orderapi/queryMyOrdersApi.do?userId=${userId}`
	});

export { getUserInfo, login, getUserOrderInfo, getRoomOrderInfo, getRoomList, postOrderInfo, getUserOrderListInfo };
