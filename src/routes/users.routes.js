import { Router } from "express"
import { Characters } from '../public/data/manager.js';
const Contenedor = new Characters();

const router=Router();

    router.get('/characters', async (req, res) => {
        const allCharacters = await Contenedor.getAll()
        res.send(allCharacters)
    })
    
    router.get('/character/:id', async (req, res) => {
        const allCharacters = await Contenedor.getAll()
        let idData=parseInt(req.params.id);
        if (isNaN(idData))return res.status(400).send("Debe ingresar un numero")
        if(parseInt(idData)<1||parseInt(idData)>allCharacters.length) return res.status(400).send("No se puede encontrar la palabra deseada")
        
    
        allCharacters.find(object =>{
            if(object.id===parseInt(idData)){
                res.send(object)
            }
        });

    })  

let sentence = 'Hola mundo como estan'
router.get('/frase',(req,res)=>{
    res.send({sentence})
})

router.get('/letras/:num',(req,res)=>{
    if (isNaN(req.params.num))return res.status(400).send("Debe ingresar un numero")
    if(parseInt(req.params.num)<1||parseInt(req.params.num)>sentence.length) return res.status(400).send("No se puede encontrar el caracter deseado")
    let num =parseInt(req.params.num)
    res.send({letter:sentence.charAt(num-1)})
})
router.get('/palabras/:pos',(req,res)=>{
    if (isNaN(req.params.pos))return res.status(400).send("Debe ingresar un numero")
    let newArray=sentence.split(" ")
    console.log(newArray.length)
    if(parseInt(req.params.pos)<1||parseInt(req.params.pos)>newArray.length) return res.status(400).send("No se puede encontrar la palabra deseada")
    let pos =parseInt(req.params.pos)
    res.send({Word:newArray[pos-1]})
})


router.post('/palabra',(req,res)=>{
    let newWord  = req.body.papa
    console.log(newWord)
    res.send(newWord)
    sentence=sentence.concat(` ${newWord}`)
    console.log(sentence)

})


router.put('/palabra/:pos',(req,res)=>{
    let newWord  = req.body.papa
    if (isNaN(req.params.pos))return res.status(400).send("Debe ingresar un numero")
    let newArray=sentence.split(" ")
    if(parseInt(req.params.pos)<1||parseInt(req.params.pos)>newArray.length) return res.status(400).send("No se puede encontrar la palabra deseada")
 
    let pos =parseInt(req.params.pos-1)
    let oldWord=newArray[pos]
    newArray[pos]=newWord
    sentence=newArray.join(' ')
    res.send({vija:newWord,nueva:newWord})
    console.log(oldWord) 
    console.log(newWord)
    console.log(sentence)

})

router.delete('/palabras/:pos',(req,res)=>{
    let newWord  = req.body.papa
    if (isNaN(req.params.pos))return res.status(400).send("Debe ingresar un numero")
    let newArray=sentence.split(" ")
    if(parseInt(req.params.pos)<1||parseInt(req.params.pos)>newArray.length) return res.status(400).send("No se puede encontrar la palabra deseada")
    let pos =parseInt(req.params.pos-1)
    newArray.splice(pos,1)
    sentence=newArray.join(' ')
    res.send(sentence)
    console.log(sentence)

})



export default router; 