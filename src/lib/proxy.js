const data = {
    text:""
};


const inputText = document.getElementById("inputText");
const showText = document.getElementById("showText");

const proxyItem = new Proxy(data,{
  set(target,key,value){
    inputText.value = value;
    showText.innerText = value;  
    target[key] = value;
  },
  get(target,key){
     return target[key];
  }
})

inputText.oninput = function(e){
  proxyItem.text = e.target.value;
}


