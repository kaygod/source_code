(function (global) {
  function _(obj) {
    if (obj instanceof _) {
      return obj;
    }
    if (!(this instanceof _)) {
      return new _(obj);
    }
    this.wrapped = obj;
  }

  _.prototype.value = function () {
    return this.wrapped;
  };

  function chain(obj) {
    const _instance = _(obj);
    _instance._chain = true;
    return _instance;
  }

  function map(obj, iteratee) {
    const keys = !Array.isArray(obj) && Object.keys(obj);
    const len = keys ? keys.length : obj.length;
    const result = [];
    for (let i = 0; i < len; i++) {
      const current_key = keys ? keys[i] : i;
      result.push(iteratee(obj[current_key]));
    }
    return result;
  }

  function filter(obj, iteratee) {
    const keys = !Array.isArray(obj) && Object.keys(obj);
    const len = keys ? keys.length : obj.length;
    const result = [];
    for (let i = 0; i < len; i++) {
      const current_key = keys ? keys[i] : i;
      if (iteratee(obj[current_key])) {
        result.push(obj[current_key]);
      }
    }
    return result;
  }

  function mixin(obj) {
    const array = Object.keys(obj);
    array.forEach((key) => {
      const func = obj[key];
      _.prototype[key] = function () {
        const result = [this.wrapped];
        Array.prototype.push.apply(result, arguments);
        return chainResult(this, func.apply(_, result));
      };
    });
  }

  function chainResult(_instance, obj) {
    return _instance._chain ? _(obj).chain() : obj;
  }

  const allExports = {
    chain,
    map,
    filter,
  };

  mixin(allExports);

  global._ = _;
})(window);
