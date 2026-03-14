const Redis = require("redis");
require('dotenv').config();

// 支持通过环境变量配置 Redis 连接（例如 REDIS_URL=redis://:password@host:6379）
const redisUrl = process.env.REDIS_URL

const clientOptions = redisUrl ? { url: redisUrl } : undefined
const redis = Redis.createClient(clientOptions)

// 始终先绑定错误处理器，避免未捕获 'error' 导致进程异常
redis.on('error', (err) => {
	console.error('Redis client error:', err)
})

redis.on('connect', () => console.log('Redis 正在连接...'))
redis.on('ready', () => console.log('Redis 已连接并可用'))

(async () => {
	try {
		await redis.connect()
	} catch (err) {
		console.error('Redis 连接失败:', err)
		// 视需求决定是否退出进程；这里不自动退出，交给上层决定
	}
})()

module.exports = redis;