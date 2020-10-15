(function(global){ 
      var $,jQuery;
    
      $ = jQuery = function(content,context){
          return new jQuery.fn.init(content,context);
      }
    
      jQuery.fn = jQuery.prototype = {
          init:function(content,context){
            context = context || document;
            this.context = context;
            if(typeof content === "string"){   
                child_nodes = context.querySelectorAll(content);
                jQuery.fn.merge(this,child_nodes);
                return this;
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
          text:function(value){
            return access(this,function(value){
                if(value === undefined || value === null){ //返回值
                  return this.innerText;  
                }else{ //设置值
                  this.innerText = value;  
                }
            },null,value);
          },
          css:function(key,value){
            return access(this,function(key,value){
                if(value === undefined || value === null){//返回样式值
                    return getComputedStyle(this)[key];
                }else{ //设置样式值
                    this.style[key] = value;
                }
            },key,value)
          },
          addClass(value){
            return access(this,function(value){
               var classes = typeof value === "string" && value;
               var i = 0,cur;
               if(classes){
                 var array = classes.match(/\S+/g);
                 var classList = " "+this.className+" ";
                 while(cur = array[i++]){
                    if(classList.indexOf(" "+cur+" ") == -1){
                        classList+=(cur+" ")
                    }
                 }
                 this.className = classList.trim();
               } 
            },null,value)
          },
          removeClass(value){
            return access(this,function(value){
                var classes = typeof value === "string" && value;
                var i = 0,cur;
                if(classes){
                  var array = classes.match(/\S+/g);
                  var classList = " "+this.className+" ";
                  while(cur = array[i++]){
                     if(classList.indexOf(" "+cur+" ") != -1){
                         classList = classList.replace(" "+cur,"");
                     }
                  }
                  this.className = classList.trim();
                } 
             },null,value)
          }    
      }

      var access = function(elems,fn,key,value){
        var len = elems.length,i = 0,chainbel;
        if(Object.prototype.toString.call(key) === "[object Object]"){
            for(let keys in key){
                access(elems,fn,keys,key[keys]);
            }
        }
        var is_single = key === null ? true : false;
        if(value !== undefined){
            chainbel = true;
            if(is_single){
                var cache = fn; 
                fn = function(key,value){
                  return cache.call(this,value);
                }
             }
            for(;i<len;i++){
                fn.call(elems[i],key,value);  
            }
        }
        return chainbel?elems:fn.call(elems[0],key,value);
      }
    
      jQuery.fn.init.prototype = jQuery.fn;
    
      global.$ = global.jQuery = $;
      
    }
    )(window)