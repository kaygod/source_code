/**
 *
 * @param {*} fn
 * @param {*} wait 延迟时间
 *
 */
function throttle(fn, wait, params) {
  let last_time = 0;
  let timer, result;
  if (params == null) {
    params = {};
  }
  function exec(args, now_time) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    result = fn.apply(null, args);
    last_time = now_time;
  }

  return function () {
    let now_time = new Date().getTime(); //now_time本次运行该函数时的时间戳

    if (last_time === 0 && params.leading === false) {
      //让第一次不立即执行,延迟后再执行
      last_time = now_time;
    }

    let remain = wait - (now_time - last_time); //last_time上次运行该函数的时间戳

    const args = arguments;

    if (remain <= 0) {
      //已经到了间隔时间,可以立即执行该函数
      exec(args, now_time);
    } else if (!timer && params.trailing !== false) {
      //延迟执行
      timer = setTimeout(() => {
        exec(args, now_time);
      }, remain);
    }
    return result;
  };
}
