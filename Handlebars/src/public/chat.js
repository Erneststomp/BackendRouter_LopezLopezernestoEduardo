const socket=io(
    {autoConnect:false}
);
    let USER = JSON.parse(localStorage.getItem('User'));
    console.log(USER)
if(USER===null){
  Swal.fire({
    title: 'Log In',
    input: 'email',
    inputPlaceholder: 'Set your email address',
    allowOutsideClick: false,
    allowEscapeKey: false,
    })
    .then(result => {
        userName = result.value
        localStorage.setItem('User', JSON.stringify(userName));
        socket.connect();
    });
}else{
    userName=USER
    socket.connect();
}

  
let user;
let messagechat=[]
const ChatBox = document.getElementById('mymessage')

ChatBox.addEventListener('keyup',evt=>{
    evt.preventDefault()
    if(evt.key==="Enter"){
        if(ChatBox.value.trim().length>0){
            const currentDate = new Date().toLocaleString()
            socket.emit('message',{user:userName,message:ChatBox.value, date:currentDate})
            ChatBox.value=''
        }
    }
})

socket.on('log',data=>{
    let log=document.getElementById('log_chat')
    let messages=''
    data.forEach(message=>{
        messages=messages+`<p style="color:brown">${message.date}</p> <p style="color:blue; font-weight:bold">${message.user}</p> dice: <p style="font-style: italic;color:green">${message.message}</p><br>`
    })
    log.innerHTML=messages;
    
})



const products={
    titles: document.getElementById('title'),    
    rewards: document.getElementById('price'),   
    speciess: document.getElementById('especie'),   
    thumbnails: document.getElementById('thumbnail')   
}
buttonSend=document.getElementById('sendNewChar')
buttonSend.addEventListener('click',sends)

function sends(){
    console.log(products)
    console.log(products.titles.value)
    if(products.titles.value!==''&&products.rewards.value!==''&&products.speciess.value!==''){
            socket.emit('newchar',{title:products.titles.value,reward:products.rewards.value,species:products.speciess.value,thumbnail:products.thumbnails.value})
    }
}


socket.on('logchar',data=>{
    evt.preventDefault()
    let logchar=document.getElementById('log_products')
    let lchar=[]
    data.forEach(newchar=>{
        lchar=lchar+`<p> character: ${newchar.title} </p> Reward: ${newchar.reward} Specie: ${newchar.species} Image: ${newchar.thumbnail}<br>`
    })
    logchar.innerHTML=lchar;
})