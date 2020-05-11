(function(root){

    /**
     * 生成配置
     */
    function genConfig(params){
        const array = params.split(/\s+/);
        const object = {};
        array.forEach((column)=>{
            object[column] = true;
        })
        return object;
    }


    function callback(params){

        const options = (typeof params === "string")?genConfig(params):{};

        const list = [];

        let i,fired,start_index;//fired用来记录是否已经使用fire函数触发过

        let memory;

        function fireHandler(context,parameter){
          fired = true;
          memory = options["memory"] && parameter;
          i = start_index?start_index:0;
          for(;i<list.length;i++){
             if(list[i].apply(context,parameter) === false && options["topOnFalse"]){
                break;
             }
          }
          start_index = null;
        }

        const result = {
            add:function(){
                const fn_list = Array.prototype.slice.call(arguments);
                fn_list.forEach((fn)=>{
                    if(toString.call(fn) === "[object Function]"){
                        if(!list.includes(fn) || !options["unique"]){
                          list.push(fn)  
                          if(options["memory"] && fired){
                              start_index = list.length -1;
                              fireHandler(result,memory);
                          }    
                        }  
                      }
                })
            },
            fire:function(){
                if(!options["once"] || !fired){
                    const parameter = Array.prototype.slice.call(arguments);
                    fireHandler(result,parameter);
                }
            }
        }

        return result;
    }

    const $ = {
        Callbacks:callback
    }
    root.$ = $;
})(window)