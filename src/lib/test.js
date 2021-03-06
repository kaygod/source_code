function throttle(fn, wait, params) {
    let last_time = 0,args;
    let timer, result;
    if (params == null) {
      params = {};
    }
    function exec(args) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      result = fn.apply(null, args);
      last_time = new Date().getTime();
    }
  
    return function () {
      let now_time = new Date().getTime(); //now_time本次运行该函数时的时间戳
  
      if (!timer && params.leading === false) {
        //让第一次不立即执行,延迟后再执行
        last_time = now_time;
      }
  
      let remain = wait - (now_time - last_time); //last_time上次运行该函数的时间戳
  
      args = arguments;
  
      if (remain <= 0) {
        //已经到了间隔时间,可以立即执行该函数
        exec(args);
      } else if (!timer && params.trailing !== false) {
        //延迟执行
        timer = setTimeout(() => {
          exec(args);
        }, remain);
      }
      return result;
    };
  }