(function(global){

  var $,jQuery;

  $ = jQuery = function(content,context){
      return new jQuery.fn.init(content,context);
  }

  jQuery.fn = jQuery.prototype = {
      init:function(content,context){
        context = context || document;
        if(typeof context === "string"){

            if(context.startsWith("<") && context.endsWith(">") && context.length>2){ //创建dom节点

                

            }else{ //寻找dom节点

            }

        }else if(context.nodeType){ //判断context是不是node节点

        }else if(typeof context === "function"){//判端context是不是函数

        }

      } 
  }

  jQuery.fn.init.prototype = jQuery.fn;

  global.$ = global.jQuery = $;

}
)(window)