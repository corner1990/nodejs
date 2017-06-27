const EventEmitter = require('events').EventEmitter

const life = new EventEmitter()

function handleFn(argument) {
	console.log(`你是：${who}?找的就是你。。。。`)
}
//创建事件 
var isListener = life.on('hello', handleFn)
console.log(`hello事件是否被监听：${isListener}`)

life.emit('hello','hello world')

//删除监听函数
life.removeListener('hello',handleFn)
//删除所有的事件
life.removeAllListeners('hello') //如果不传入参数 事件所有的函数都会被删除

//打印事件监听的数
console.log(life.listeners('hello').length)
console.log(EventEmitter.listenerCount(life, 'hello'))
