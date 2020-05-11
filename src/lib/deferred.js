(function (root) {
  /**
   * 生成配置
   */
  function genConfig(params) {
    const array = params.split(/\s+/);
    const object = {};
    array.forEach((column) => {
      object[column] = true;
    });
    return object;
  }

  function callback(params) {
    const options = typeof params === 'string' ? genConfig(params) : {};

    const list = [];

    let i, fired, start_index; //fired用来记录是否已经使用fire函数触发过

    let memory;

    function fireHandler(context, parameter) {
      fired = true;
      memory = options['memory'] && parameter;
      i = start_index ? start_index : 0;
      for (; i < list.length; i++) {
        if (
          list[i].apply(context, parameter) === false &&
          options['topOnFalse']
        ) {
          break;
        }
      }
      start_index = null;
    }

    const result = {
      add: function () {
        const fn_list = Array.prototype.slice.call(arguments);
        fn_list.forEach((fn) => {
          if (toString.call(fn) === '[object Function]') {
            if (!list.includes(fn) || !options['unique']) {
              list.push(fn);
              if (options['memory'] && fired) {
                start_index = list.length - 1;
                fireHandler(result, memory);
              }
            }
          }
        });
      },
      fire: function () {
        if (!options['once'] || !fired) {
          const parameter = Array.prototype.slice.call(arguments);
          fireHandler(result, parameter);
        }
      },
    };

    return result;
  }

  /**
   * 实现延迟对象功能
   */
  function Deferred() {
    const arr = [
      ['resolve', 'done', callback('once memory'), 'resolved'],
      ['reject', 'fail', callback('once memory'), 'rejected'],
      ['progress', 'notify', callback('memory')],
    ];

    let state = "pending";

    const dfr = {};

    const promise = {
      promise(dfr = null) {
        return dfr === null ? promise : extend(dfr, promise);
      },
      state(){
        return state;
      }
    };

    arr.forEach((item) => {

      const stateString = item[3];
      const list = item[2];

      if(stateString){
        list.add(function (){
          state = stateString;
        })
      }

      dfr[item[0]] = function () {
        if (state !== 'pending') {
          return false;
        }
        list.fire.apply(this, Array.prototype.slice.call(arguments));
      };

      promise[item[1]] = function () {
        const array = Array.prototype.slice.call(arguments);
        array.length > 0 ? list.add(array[0]) : null;
        return promise;
      };
    });

    promise.promise(dfr);

    return dfr;
  }

  const extend = function () {
    var target = arguments[0] || {};

    var i = 1,
      isDeep = false,
      isArrayData = false;

    if (typeof arguments[0] === 'boolean') {
      //第一个参数是boolean型
      isDeep = arguments[0] ? true : false;
      target = arguments[1] || {};
      i = 2;
    }

    var arr = Array.prototype.slice.call(arguments, i);

    if (arguments.length == 1) {
      target = this;
      arr = [arguments[0]];
    }

    arr.forEach((obj) => {
      for (let key in obj) {
        if (isDeep) {
          //深拷贝
          let src = obj[key];
          let des = target[key];
          let copy;
          if (
            jQuery.isPlainObject(src) ||
            (isArrayData = jQuery.isArray(src))
          ) {
            //src是数组或者对象类型
            if (isArrayData) {
              copy = jQuery.isArray(des) ? des : [];
            } else {
              copy = jQuery.isPlainObject(des) ? des : {};
            }

            target[key] = jQuery.fn.extend(isDeep, copy, src); //这一句代码是精髓之处
          } else {
            target[key] = obj[key];
          }

          isArrayData = false;
        } else {
          target[key] = obj[key];
        }
      }
    });

    return target;
  };

  const $ = {
    Callbacks: callback,
    Deferred: Deferred,
    when(defferd) {
      return defferd.promise();
    },
  };
  root.$ = $;
})(window);
