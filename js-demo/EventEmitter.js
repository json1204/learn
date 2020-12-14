class EventEmitter {
  constructor() {
    this.handles = {}
  }

  on (event, fn) {
    if (!this.handles.hasOwnProperty(event)) {
      this.handles[event] = []
    }

    if (typeof fn === 'function') {
      this.handles[event].push(fn)
    } else {
      throw new Error('缺少回调函数')
    }

    return this // 实现链式操作
  }

  emit (event, ...args) {
    if (this.handles.hasOwnProperty(event)) {
      this.handles[event].forEach(item => {
        item.apply(null, args)
      })
    } else {
      throw new Error(event + '事件未注册')
    }

    return this // 实现链式操作
  }

  off (event, fn) {
    if (this.handles.hasOwnProperty(event)) {
      if (typeof fn === 'function') {
        this.handles[event].forEach((item, index, arr) => {
          if (item == fn) {
            arr.splice(index, 1)
          }
        })
      }
    } else {
      throw new Error(event + '事件未注册')
    }

    return this // 实现链式操作
  }
}

function getPosition (position) {
  console.log('第二个方法' + position)
}

let pubsub = new EventEmitter()

pubsub.on('join', (position, salary) => {
  console.log('你的职位是：' + position)
  console.log('期望薪水：' + salary)
})

pubsub.on('join', getPosition)

pubsub.on('other', (skill, hobby) => {
  console.log('你的技能有： ' + skill)
  console.log('爱好： ' + hobby)
})

pubsub.emit('join', '前端', 10000)
pubsub.emit('join', '后端', 10000)
pubsub.emit('other', '写代码', '足球')

pubsub.off('join', getPosition)

pubsub.emit('join', '前端', 10000)