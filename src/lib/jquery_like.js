(function(global){

  var $,jQuery;

  $ = jQuery = function(){
      return new jQuery.fn.init();
  }

  jQuery.fn = jQuery.prototype = {
      init:function(){
        
      },
      isPlainObject:function(data){
        return Object.prototype.toString.call(data) === "[object Object]";
      },
      isArray:function(data){
        return Object.prototype.toString.call(data) === "[object Array]";        
      },
      isBoolean:function(data){
          return typeof data === "boolean";
      }
  }

  jQuery.extend = jQuery.prototype.extend = function(){

    var target = arguments[0] || {};

    var i = 1,isDeep = false,isArrayData = false;

    if(typeof arguments[0] === "boolean"){ //第一个参数是boolean型
        isDeep = arguments[0]?true:false;
        target = arguments[1] || {};
        i = 2;
    }

    var arr = Array.prototype.slice.call(arguments,i);

    if(arguments.length == 1){
        target = this;
        arr = [arguments[0]];
    }

    arr.forEach((obj)=>{
            for(let key in obj){

                if(isDeep){ //深拷贝
                    let src = obj[key];
                    let des = target[key];
                    let copy;
                    if(jQuery.isPlainObject(src) || (isArrayData = jQuery.isArray(src))){

                        if(isArrayData){
                            copy = jQuery.isArray(des)?des:[]
                        }else{
                            copy = jQuery.isPlainObject(des)?des:{};
                        }

                        target[key] = jQuery.fn.extend(isDeep,copy,src);

                    }else{
                        target[key] = obj[key];               
                    }

                    isArrayData = false;

                }else{
                  target[key] = obj[key];                    
                }

            }      
    })

    return target;

  }

  jQuery.fn.init.prototype = jQuery.fn;

  jQuery.extend(jQuery.fn);


  global.$ = global.jQuery = $;

}
)(window)