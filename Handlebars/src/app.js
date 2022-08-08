import express from "express";
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import { Server } from "socket.io";

const app =express();
const server = app.listen(8080,()=>console.log('Its Working'));
const io= new Server(server);
app.use(express.json());

//motor
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.urlencoded({extended:true}));
app.use('/',viewsRouter);
app.use(express.static(__dirname+'/public'));

let log=[]
io.on('connection',socket=>{
    socket.on('message',data=>{
        log.push(data)
        io.emit('log',log)
    })
})




let logchar=[]
io.on('connection',socket=>{
    console.log('conectado2')
    socket.on('newchar',data=>{
        logchar.push(data)
        console.log(data)
        console.log(logchar)
        io.emit('logchar',logchar)
    })
})