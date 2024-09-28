const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');
const clc = require('cli-color');
const moment = require('moment');
const fs = require('fs');
const figlet = require('figlet');

dotenv.config();

// async function to check available username
const check_nickname_is_existed = async (nickname) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/user/check_nickname_is_existed"

	const payload = JSON.stringify({
		"nickname": `${nickname}`
	})

	const headers = {
		'Accept': 'application/json, text/plain, */*',
		'Accept-Language': 'en-US,en;q=0.9',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Origin': 'https://tgapp.matchain.io',
		'Referer': 'https://tgapp.matchain.io/',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-site',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to check_nickname_is_existed, ${err}`)
		}
	}
}

// async function to register
const register = async (uid, nickname, invitor, query) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/user/register"

	const payload = JSON.stringify({
		"uid": uid,
		"first_name": "",
		"last_name": "",
		"username": "",
		"nickname": `${nickname}`,
		"invitor": `${invitor}`,
		"tg_login_params": `${query}`
	})

	const headers = {
		'Accept': 'application/json, text/plain, */*',
		'Accept-Language': 'en-US,en;q=0.9',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Origin': 'https://tgapp.matchain.io',
		'Referer': 'https://tgapp.matchain.io/',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-site',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})
			
			const res = await response.json()

			if (res.code != 200 && res.code != 401) {
				throw new Error(`${res.code}`)
			}

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return res
		} catch (err) {
			console.error(`Error to register, ${err}`)
		}
	}
}

const getUid = (query) => {
	const decodequery =  decodeURIComponent(query)
	const uid = decodequery.split(`"id":`)[1].split(`,"first_name"`)[0]
	return Number(uid)
}

// async function to login
const loginKan = async (uid, query) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/user/login"

	const payload = JSON.stringify({
		"uid": uid,
		"first_name": "0",
		"last_name": "",
		"username": "",
		"tg_login_params": `${query}`
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			const res = await response.json()

			if (res.code != 200 && res.code != 404) {
				throw new Error(`${res.code} ${res.err}`)
			}

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return res
		} catch (err) {
			console.error(`Error to login, ${err}`)
		}
	} 
}

// async function to get daily quiz
const dailyQuiz = async (token) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/daily/quiz/progress"

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'get',
				headers: headers,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to dailyQuiz, ${err}`)
		}
	} 
}

// async function to submit daily quiz
const submitQuiz = async (token, answer) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/daily/quiz/submit"

	const payload = JSON.stringify({
		"answer_result": [
			{
				"quiz_id": answer[0][0],
				"selected_item": answer[0][1],
				"correct_item": answer[0][1]
			},
			{
				"quiz_id": answer[1][0],
				"selected_item": answer[1][1],
				"correct_item": answer[1][1]
			},
			{
				"quiz_id": answer[2][0],
				"selected_item": answer[2][1],
				"correct_item": answer[2][1]
			}
		]
	})
	
	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			const res = await response.json()

			if ('err' in res) {
				throw new Error(`${response.status} ${response.statusText}`)
			}

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return res
		} catch (err) {
			console.error(`Error to submitQuiz, ${err}`)
		}
	} 
}

// async function to get balance
const getBalance = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/balance"

	const payload = JSON.stringify({
		"uid": uid
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to getBalance, ${err}`)
		}
	} 
}

const checkReward = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/reward"

	const payload = JSON.stringify({
		"uid": uid
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to checkReward, ${err}`)
		}
	} 
}

// async function to claim reward
const claimReward = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/reward/claim"

	const payload = JSON.stringify({
		"uid": uid
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			const res = await response.json()

			if (res.code != 200) {
				throw new Error(`${res.code} ${res.err}`)
			}

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return res
		} catch (err) {
			if (err == "Error: 403 undefined") {
				return {}
			} else {
				console.error(`Error to claimReward, ${err}`)
			}
		}
	} 
}

// async function to start farming
const startFarming = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/reward/farming"

	const payload = JSON.stringify({
		"uid": uid
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			const res = await response.json()

			if (res.code != 200) {
				throw new Error(`${res.code} ${res.err}`)
			}

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return res
		} catch (err) {
			if (err == "Error: 403 undefined") {
				return
			} else {
				console.error(`Error to startFarming, ${err}`)
			}
		}
	} 
}

// async function to get profile
const getProfile = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/user/profile"

	const payload = JSON.stringify({
		"uid": uid
	})
	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to getProfile, ${err}`)
		}
	} 
}

// async function to get rule
const ruleNya = async (token) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/game/rule"

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'get',
				headers: headers,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to ruleNya, ${err}`)
		}
	} 
}

// async function to play game 
const playGame = async (token) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/game/play"

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'get',
				headers: headers,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to playGame, ${err}`)
		}
	} 
}

// async function to claim game
const claimGame = async (token, gameid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/game/claim"

	const payload = JSON.stringify({
		"game_id": `${gameid}`,
		"point": 220
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'post',
				headers: headers,
				body: payload,
				signal: AbortSignal.timeout(10000)
			})

			const res = await response.json()

			if (res.code != 200) {
				throw new Error(`${res.code} ${res.err}`)
			}

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return res
		} catch (err) {
			console.error(`Error to claimGame, ${err}`)
		}
	}
}

// async function to get status booster
const getStatus = async (token) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/daily/task/status"

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
			const response = await fetch(url, {
				method: 'get',
				headers: headers,
				signal: AbortSignal.timeout(10000)
			})

			if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
			}

			return await response.json()
		} catch (err) {
			console.error(`Error to getStatus, ${err}`)
		}
	} 
}

// async function to purchase booster
const purchase = async (token, uid, typebooster) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/daily/task/purchase"

	const payload = JSON.stringify({
		"uid": uid,
		"type": `${typebooster}`
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            const res = await response.json()


            if (!response.ok) {
                    // console.log(response)
                    throw new Error(`${response.status} ${response.statusText}`)
            }

            return res
		} catch (err) {
			console.error(`Error to purchase, ${err}`)
		}
	}
}

// async function to get task list
const taskList = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/task/list"

	const payload = JSON.stringify({
		"uid": uid
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
		} catch (err) {
			console.error(`Error to taskList, ${err}`)
		}
	}
}

// async function to start task
const startTask = async (token, uid, type) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/task/complete"

	const payload = JSON.stringify({
		"uid": uid,
		"type": `${type}`
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
		} catch (err) {
			console.error(`Error to startTask, ${err}`)
		}
	}
}

// async function to claim task
const claimTask = async (token, uid, type) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/task/claim"

	const payload = JSON.stringify({
		"uid": uid,
		"type": `${type}`
	})
	
	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            const res = await response.json()

            if (res.code != 200) {
                throw new Error(`${res.code} ${res.err}`)
            }

            if (!response.ok) {
                    // console.log(response)
                    throw new Error(`${response.status} ${response.statusText}`)
            }

            return res
		} catch (err) {
			if (err == "Error: 401 user not joined" || err == "Error: 403 undefined") {
				break
			} else {
				console.error(`Error to claimTask, ${err}`)
			}
		}
	}
}

// async function to check completed task
const checkCompletedTask = async (token, uid) => {
    const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/task/progress"

    const payload = JSON.stringify({
        "uid": uid
    })

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `${token}`,
        'content-type': 'application/json',
        'origin': 'https://tgapp.matchain.io',
        'priority': 'u=1, i',
        'referer': 'https://tgapp.matchain.io/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
    }

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
		} catch (err) {
			console.error(`Error to checkCompletedTask, ${err}`)
		}
	}
}

// async function to get ref list
const getRefList = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/invite/list"

	const payload = JSON.stringify({
		"uid": uid,
		"page": 1,
		"page_size": 10
	})

	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
		} catch (err) {
			console.error(`Error to getRefList, ${err}`)
		}
	}
}

// async function to get ref balance
const getRefBalance = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/invite/balance"

	const payload = JSON.stringify({
		"uid": uid
	})
	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
		} catch (err) {
			console.error(`Error to getRefBalance, ${err}`)
		}
	}
}

// async function to claim referral balance
const claimRefBalance = async (token, uid) => {
	const url = "https://tgapp-api.matchain.io/api/tgapp/v1/point/invite/claim"

	const payload = JSON.stringify({
		"uid": uid
	})
	const headers = {
		'accept': 'application/json, text/plain, */*',
		'accept-language': 'en-US,en;q=0.9',
		'authorization': `${token}`,
		'content-type': 'application/json',
		'origin': 'https://tgapp.matchain.io',
		'priority': 'u=1, i',
		'referer': 'https://tgapp.matchain.io/',
		'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
	}

	while(true) {
		try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload,
                signal: AbortSignal.timeout(10000)
            })

            if (!response.ok) {
				// console.log(response)
				throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
		} catch (err) {
			console.error(`Error to claimRefBalance, ${err}`)
		}
	}
}

// async func to create token
const runCreateToken = async () => {
    try {
        // buat query.txt
        const data = fs.readFileSync('query.txt', 'utf-8');
        const querys = data.split('\n')

        // get token ***GATHER BOOMMM!!!!!
        const tokens = []
        await Promise.all(querys.map(async (query) => {
            const uid = getUid(query)
            await loginKan(uid, query)
            .then((token) => {
				if (token.code == 200) {
					tokens.push([uid, token.data.token])
				} else if (token.code == 404) {
					tokens.push(query.trim())
				}
			})
            .catch((err) => {
				console.log(err)
			})
        }))

        // buat file tokens.txt
        fs.writeFileSync('tokens.txt', "")
        
        // read tokens.txt
        const token = fs.readFileSync('tokens.txt', 'utf-8');

        // append token to token.txt
        for (const token of tokens) {
            // console.log(token)
			if (token.includes('query_id=') == false && token.includes('auth_date=') == false) {
				fs.appendFileSync('tokens.txt', `${token[0]}|${token[1]}\n`)
			} else {
				fs.appendFileSync('tokens.txt', `${token}\n`)
			}
        }

        return true
    } catch (e) {
        // jika query.txt not exist
        if (e.code == 'ENOENT') {
            console.log('Fill the query.txt first!');
            fs.writeFileSync('query.txt', "query1\nquery2\netc...")
            return false
        } else {
            throw e
        }
    }
}

const runRegis = async (uid, inv_code, query) => {
	// register
	const username = faker.internet.userName()
	const nickname = await check_nickname_is_existed(username)
	
	if (!nickname.data) {
		await register(uid, username, inv_code, query)
		.then(res => {
			if (res.code == 200) {
				console.log(`Create account ${clc.green(res.data.Nickname)} with id ${clc.yellow(res.data.Id)} success! Invitor ${clc.yellow(res.data.Invitor)}`)
			} else if (res.code == 401) {
				return
			} else {
				console.error(`Create account failed!`)
			}
		})
	}
}

// async func to countdown
const timeCount = async (finish, nanti, waktu) => {
    for (let i = waktu; i >= 0; i--) {
        // inisiasi menit dan second
        let minutes = Math.floor(waktu/60)
        let seconds = waktu % 60;

        // jika menit dan second < 2 digit
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // BOOMM tampilkan ******
        process.stdout.write(`Execution time : ${clc.yellow(finish.toFixed(2))} seconds | Refresh token : ${clc.yellow(moment.unix(nanti).format("YYYY-MM-DD HH:mm:ss"))} | Refresh after : ${clc.yellow(`${minutes}:${seconds}`)}`);
        
        // increament - 1
        waktu = waktu-1;

        // blocking delay untuk satu detik
        await new Promise(resolve => setTimeout(resolve, 1000))

        // clear last console log
        if (waktu >= 0) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0); 
        }
    }
}

// async func to sendmessage to telegram
const sendMessage = async (total) => {
    const telegram_token = String(process.env.TELEGRAM_TOKEN)
    const telegram_chatid = String(process.env.TELEGRAM_CHATID)
    const message = `Total matchquest : ${total}`
    
    if (telegram_token != "" && telegram_chatid != "") {
        const url = `https://api.telegram.org/bot${telegram_token}/sendMessage?chat_id=${telegram_chatid}&text=${message}`

        while (true) {
            try {
                const response = await fetch(url);

                if (response.status == 200) {
                    // console.log(response.data)
                    return response.json()
                }
            } catch (err) {
                console.log(`Error to sendMessage, ${err}`)
                continue
            }
        }
    } else {
        return
    }
}

(async () => {
	// const query = ""
	// const query = ""
	// const uid = getUid(query)

	// clear cli
	console.clear()

	console.log("Create token started")
	const restoken = await runCreateToken()
	if (restoken == true) {
		console.log("Create token success!")
		
		let sekarang = Math.trunc(Date.now()/1000)
		let nanti = Math.trunc(Date.now()/1000) + Number(process.env.REFRESH_TOKEN)

		while (sekarang < nanti) {
			console.log(figlet.textSync('matchquest botjs', {font: "Ogre"}), '\n')
			console.log("Auto upgrade booster :", process.env.AUTO_BOOSTER == "true" ? clc.green('On') : "Off")
			console.log("Auto catch 'M' :", process.env.AUTO_GAME == "true" ? clc.green('On') : "Off")
			console.log("Auto claim task :", process.env.AUTO_TASK == "true" ? clc.green('On') : "Off")
			console.log("")
			let start = Date.now()/1000

			// open tokens.txt
			const data = fs.readFileSync('tokens.txt', 'utf-8')
			const tokens = data.split('\n')
			
			// run all ***GATHER BOOMMM!!!!!
			const runall = await Promise.all(tokens.map(async (tokenaccess, idx) => {
				if (tokenaccess != "") {
					if (tokenaccess.includes('query_id=') == false && tokenaccess.includes('auth_date=') == false) {
						const uid = Number(tokenaccess.split('|')[0])
						const token = tokenaccess.split('|')[1]
						// console.log(token, invitelimit)

						// get balance
						const balance = await getBalance(token, uid)
						const balancenya = Math.trunc(balance.data/1000)
						// get status booster
						let status = {}
						if (process.env.AUTO_BOOSTER == 'true') {
							status = await getStatus(token)
						}

						// daily quiz
						const dailyquiz = await dailyQuiz(token)
						let status_dailyquiz = ''
						if (dailyquiz.msg === undefined) { // cek quiz ada ngga
							status_dailyquiz = `${clc.yellow('Quiz available')}`
							const answer = []
							for (const i of dailyquiz.data) {
								for (j of i.items) {
									const id = i.Id
									const iscorrect = j.is_correct
									const choice = j.number
									if (iscorrect == true) {
										answer.push([id, choice])
									}
								}
							}        
							await submitQuiz(token, answer) // submit bos
						} else {
							status_dailyquiz = `${clc.green('Done')}`
						}

						// farming
						const reward = await checkReward(token, uid)
						const nextclaim = Math.trunc(reward.data.next_claim_timestamp/1000)
						let status_farming = ''
						if (nextclaim < Math.trunc(Date.now()/1000)) {
							status_farming = `${clc.yellow('Ready to claim')}`
							const claimreward = await claimReward(token, uid)
							if (claimreward != {}) {
								if (claimreward.code == 200) {
									status_farming = `${clc.yellow('Ready to start farming')}`
									await startFarming(token, uid)
									// booster daily
									if (process.env.AUTO_BOOSTER == 'true') {
										if (status.data[0].current_count < status.data[0].task_count && balancenya > status.data[0].point) {
											// purchase
											await purchase(token, uid, 'daily')
										}
									}
								}
							}
						} else {
							status_farming = `${clc.yellow(moment.unix(reward.data.next_claim_timestamp/1000).format("YYYY-MM-DD HH:mm:ss"))}`
						}

						// game
						let gamecount = 0
						if (process.env.AUTO_GAME == 'true') {
							const rule = await ruleNya(token) // get invited count, daily count, game count
							if (rule.code == 200) {
								gamecount = rule.data.game_count
								if (gamecount > 0) {
									const play = await playGame(token)
									const gameid = play['data']['game_id']
									if (gameid != "") {
										await claimGame(token, gameid)
									}
								} else {
									gamecount = gamecount
									// booster game
									if (process.env.AUTO_BOOSTER == 'true') {
										if (status.data[1].current_count < status.data[1].task_count && balancenya > status.data[1].point) {
											// purchase
											await purchase(token, uid, 'game')
										}
									}
								}
							}
						}

						if (gamecount > 0) {
							gamecount = `${clc.green(gamecount)}`
						}

						// task
						let taskcount = 0
						if (process.env.AUTO_TASK == 'true') {
							const status_task = await checkCompletedTask(token, uid)
							if (status_task.code == 200) {
								taskcount = `${clc.yellow(`${status_task.data.task_completed}/${status_task.data.task_total}`)}`
							}
							const task = await taskList(token, uid)
							const tasklist = task['data']
							for (const i of tasklist["Matchain Ecosystem"]) {
								const name = i['name']
								const iscomplete = i['complete']
								if (!iscomplete) {
									const start = await startTask(token, uid, name)
									if (start['code'] == 200) {
										await claimTask(token, uid, name)
									}
								}
								await new Promise(resolve => setTimeout(resolve, 2000))
							}

							for (const i of tasklist["Tasks"]) {
								const name = i['name']
								const iscomplete = i['complete']
								if (!iscomplete) {
									const start = await startTask(token, uid, name)
									if (start['code'] == 200) {
										await claimTask(token, uid, name)
									}
								}
								await new Promise(resolve => setTimeout(resolve, 2000))
							}

							for (const i of tasklist["Extra Tasks"]) {
								const name = i['name']
								const iscomplete = i['complete']
								if (!iscomplete) {
									const start = await startTask(token, uid, name)
									if (start['code'] == 200) {
										await claimTask(token, uid, name)
									}
								}
								await new Promise(resolve => setTimeout(resolve, 2000))
							}
						}

						// ref claim
						const ref = await getRefList(token, uid)
						const ref_list = ref.data.list
						if (ref_list != null) {
							const refnya = await getRefBalance(token, uid)
							const ref_bal = refnya.data.balance
							const inv_rest = refnya.data.rest_invitations
							if (ref_bal > 0) {
								await claimRefBalance(token, uid)
							}
						}

						// printed
						const profile = await getProfile(token, uid)
						if (process.env.AUTO_GAME == 'true' && process.env.AUTO_TASK == 'true') {
							console.log(`[${profile.data.Id}] | Is bot : ${profile.data.IsBot} | Daily quiz : ${status_dailyquiz} | Balance : ${clc.green(`${Number(profile.data.Balance/1000).toFixed(2)}`)} | Reward : ${clc.yellow(`${Number(reward.data.reward/1000).toFixed(2)}`)} | Next claim : ${status_farming} | Game available : ${gamecount} | Task completed : ${taskcount} | Referral : ${profile.data.invite_count}`)
						} else if (process.env.AUTO_GAME != 'true' && process.env.AUTO_TASK == 'true') {
							console.log(`[${profile.data.Id}] | Is bot : ${profile.data.IsBot} | Daily quiz : ${status_dailyquiz} | Balance : ${clc.green(`${Number(profile.data.Balance/1000).toFixed(2)}`)} | Reward : ${clc.yellow(`${Number(reward.data.reward/1000).toFixed(2)}`)} | Next claim : ${status_farming} | Task completed : ${taskcount} | Referral : ${profile.data.invite_count}`)
						} else if (process.env.AUTO_GAME != 'true' && process.env.AUTO_TASK != 'true') {
							console.log(`[${profile.data.Id}] | Is bot : ${profile.data.IsBot} | Daily quiz : ${status_dailyquiz} | Balance : ${clc.green(`${Number(profile.data.Balance/1000).toFixed(2)}`)} | Reward : ${clc.yellow(`${Number(reward.data.reward/1000).toFixed(2)}`)} | Next claim : ${status_farming} | Referral : ${profile.data.invite_count}`)
						} else {
							console.log(`[${profile.data.Id}] | Is bot : ${profile.data.IsBot} | Daily quiz : ${status_dailyquiz} | Balance : ${clc.green(`${Number(profile.data.Balance/1000).toFixed(2)}`)} | Reward : ${clc.yellow(`${Number(reward.data.reward/1000).toFixed(2)}`)} | Next claim : ${status_farming} | Game available : ${gamecount} | Referral : ${profile.data.invite_count}`)
						}

						return Number(profile.data.Balance/1000).toFixed(2)
					} else {
						const query = process.env.QUERY_OR_USERID_OF_REF
						if (query != '') {
							if (query.includes('query_id=') == true && query.includes('auth_date=') == true) {
								console.error(`Telegram account with Id ${getUid(tokenaccess)} is not registered!, start to register...`)

								const login = await loginKan(getUid(query), query)
								if (login.code == 200) {
									await new Promise(resolve => setTimeout(resolve, idx*600)) // delay dulu
									const token = login.data.token
									const refnya = await getRefBalance(token, getUid(query))
									if (refnya.code == 200) {
										const inv_rest = refnya.data.rest_invitations
										const inv_code = refnya.data.invite_code
										if (inv_rest > 0) {
											// console.log(inv_rest, inv_code)
											await runRegis(getUid(tokenaccess), inv_code, tokenaccess)
											await runCreateToken()
										} else {
											console.error(`Failed to register ${getUid(tokenaccess)}, Telegram account with Id ${getUid(query)} is max of invitation, please change with other query_id!`)
										}
									}
								}
							}
						} else {
							console.error(`Please register telegram with Id ${getUid(tokenaccess)} first by manual or auto with query_id in .env file!`)
						}

						return 0
					}
				}
			}))

			// console.log(runall)

			let totalallacc = 0
			for (let i=0; i < runall.length; i++) {
				if (runall[i] != undefined) {
					totalallacc = totalallacc + Number(runall[i])
				}
			}

			// delay before next running
			console.log('')
			console.log('Total balance :', clc.green(totalallacc.toLocaleString('en-US')))

			let finish = (Date.now()/1000)-start

			// printed and blocking
			await timeCount(finish, nanti, Number(process.env.REFRESH_CLAIM)) // blocking/pause for REFRESH_CLAIM seconds

			sekarang = Math.trunc(Date.now()/1000) + Number(process.env.REFRESH_CLAIM)
			if (sekarang >= nanti) {
				console.log("\n")
				console.log("Refresh tokens started!")
				const restoken = await runCreateToken()
				if (restoken == true) {
					console.log("Refresh tokens success!")
					await new Promise(resolve => setTimeout(resolve, 2000)) // blocking/pause for 2 seconds
					await sendMessage(totalallacc.toLocaleString('en-US'))
					nanti = Math.trunc(Date.now()/1000) + Number(process.env.REFRESH_TOKEN)
				}
			}
				
			console.clear()
		}
	}
})();