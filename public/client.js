const socket = io();
let userName ;
const textArea = document.querySelector('#textarea');
const messageArea = document.querySelector(".msg_area")
do{
    userName = prompt("Enter name");
}while(!userName);

textArea.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg =  {
        userName,
        message:message.trim()
    }
    //Append
    appendMessage(msg,'outgoing')

    //Send to Socket
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markUp = `
        <h4>${msg.userName}</h4>
        <p>${msg.message}</p>    
    `
    mainDiv.innerHTML = markUp
    messageArea.appendChild(mainDiv)
}

/// Recieved message

socket.on('message',(msg)=>{
    console.log(msg)
    appendMessage(msg,'incoming')
})