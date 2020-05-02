(function(global){

  var $,jQuery;

  $ = jQuery = function(content,context){
      return new jQuery.fn.init(content,context);
  }
  
  //收集函数
  const fun_list = [];

  jQuery.fn = jQuery.prototype = {
      init:function(content,context){
        context = context || document;
        this.context = context;
        if(typeof content === "string"){
            let child_nodes = [];
            if(content.startsWith("<") && content.endsWith(">") && content.length>2){ //创建dom节点
                const DIV = context.createElement("DIV");
                DIV.innerHTML = content;
                child_nodes = DIV.children;
            }else{ //寻找dom节点
                child_nodes = context.querySelectorAll(content);
            }
            jQuery.fn.merge(this,child_nodes);
            return this;
        }else if(content.nodeType){ //判断context是不是node节点
            jQuery.fn.merge(this,[content]);
            return this;
        }else if(typeof content === "function"){//判端context是不是函数
            fun_list.push(content);
        }
      },
      merge:function(array1,array2){
        if(array1 instanceof Array){
            return array1.concat(array2);
        }else{
            const length = array1.length || 0;
            i = length;
            for(j=0;j<array2.length;j++){
                array1[i+j] = array2[j];
            }
            array1.length = length+array2.length;
            return array1;
        }  
      },
      ready:function(fun){
        fun_list.push(fun);
      } 
  }

  jQuery.fn.init.prototype = jQuery.fn;

  global.$ = global.jQuery = $;
  
  function domLoadComplete(){
    document.addEventListener('DOMContentLoaded', function () {
        document.removeEventListener('DOMContentLoaded', arguments.callee, false);            
        fun_list.forEach(function(fn){
            fn();
        })
      }, false);
  }
  domLoadComplete();
}
)(window)