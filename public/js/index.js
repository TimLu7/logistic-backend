const loginURL = 'http://localhost:3000/api/login/';

document.getElementById("login-form").action =loginURL;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function checkMsg(){
    let msg=urlParams.get("msg");
    if(msg){
        alert(msg);
    }
}
checkMsg();
function checkForm(){
    let name = document.getElementById("username").value;　
    console.log(name);
    let password = document.getElementById("password").value;　
    console.log(password);
    if(!name||name==""){
        alert("username mustn't be empty.");
        return false;
    }
    if(!password||password==""){
        alert("password mustn't be empty.");
        return false;
    }


　　return true;
}