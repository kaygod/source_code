// 3.请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
/*
const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', ()=>console.log('I want sleep'));
event.fire('sleep');
*/

class Events {
  loop = {};
  constructor() {}

  on(...args) {
    const [event_name, fn, ...rest] = args;

    if (!this.loop[event_name]) {
      this.loop[event_name] = [];
    }

    const nFun = fn.bind(null, ...rest);

    nFun.old = fn;

    this.loop[event_name].push(nFun);
  }

  off(event_name, fn) {
    const list = this.loop[event_name];

    const index = list.findIndex((v) => {
      return v.old === fn;
    });

    if (index != -1) {
      list.splice(index, 1);
    }
  }

  once(...args) {
    this.on(...args);
    const event_name = args[0];
    const list = this.loop[event_name];
    list[list.length - 1].once = true;
  }

  fire(event_name, ...args) {
    const list = this.loop[event_name] || [];

    const once_list = [];

    list.forEach((fn, index) => {
      fn(...args);
      if (fn.once) {
        once_list.push(index);
      }
    });

    if (once_list.length > 0) {
      const result = [];
      list.forEach((item, index) => {
        if (!once_list.includes(index)) {
          result.push(item);
        }
      });
      this.loop[event_name] = result;
    }
  }
}

const fn1 = (...args) => console.log('I want sleep1', ...args);
const fn2 = (...args) => console.log('I want sleep2', ...args);
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', () => console.log('I want sleep'));
event.fire('sleep');
//I want sleep2 1 2 3
//I want sleep
event.fire('sleep', 4, 5, 6);
//I want sleep2 1 2 3 4 5 6
