const data = {};
const data_bak = {
    text:""
}

const inputText = document.getElementById("inputText");
const showText = document.getElementById("showText");

Object.defineProperty(data,"text",{
    set(value){
        inputText.value = value;
        showText.innerText = value;
        data_bak.text = value;
    },
    get(){
        return data_bak.text;
    }
})

inputText.oninput = function(e){
  data.text = e.target.value;
}


