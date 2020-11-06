function debounce(fn, wait, immediate) {
  let timer, args, result, call_now;
  let last_time = 0;

  function later() {
    const now_time = new Date().getTime();
    const last = now_time - last_time;
    if (last < wait) {
      timer = setTimeout(later, wait - last);
    } else {
      clearTimeout(timer);
      timer = null;
      if (!immediate) {
        result = fn.apply(null, args);
      }
    }
  }

  return function () {
    args = arguments;
    call_now = immediate && !timer; //是否立即执行
    last_time = new Date().getTime();
    if (!timer) {
      timer = setTimeout(later, wait);
    }
    if (call_now) {
      result = fn.apply(null, args);
    }
    return result;
  };
}
