import express from "express";
import usersRouter from './routes/users.routes.js'

const app =express();
const server = app.listen(8080,()=>console.log('Its Working'))
app.use(express.json())
app.use('/api',usersRouter )
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send("<h1>Bienvenido a Express</h1>")

})



// app.get('/user',(req,res)=>{
//     res.send({users})
// })

// app.get('/user/:userId',(req,res)=>{
//     console.log(req.params)
//     let id=req.params.userId
//     res.send(users[id-1])
// })