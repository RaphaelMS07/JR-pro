const express = require('express');
const app = express();

const dataStore = require('./infra/database')

const clienteDAO = require('./infra/DAO/cliente-dao')
const equipDAO = require('./infra/DAO/equip-dao')
const produtoDAO = require('./infra/DAO/produto-dao')
const tempDataDAO = require('./infra/DAO/tempData-dao')

// const spawn = require("child_process").spawn
// const pythonProcess2 = spawn('python',['services/webScrapperBoadica.py'])
// pythonProcess2.stdout.on('data', (data)=>{
//     let sdata = (data.toString())
//     let jdata = JSON.parse(sdata);    
//     console.log(sdata);
// })

var runPy = function(id){
    return new Promise(function(ok, notok){
        const {spawn} = require('child_process');
        const pythonProcess = spawn('python',['services/webScrapperBoadica.py', id])
    
        pythonProcess.stdout.on('data', (data)=>{
            let sdata = (data.toString())
            let jdata = JSON.parse(sdata);    
            // console.log(jdata);
            return ok(jdata);
        })
    
        pythonProcess.stdout.on('data',(data)=>{
            return notok(data);
        })   
    })
}



app.get('/python/:id', (request, response)=>{
    const id = request.params.id
    console.log(id +'valor do id passado para o get python')
    runPy(id).then(data=>{
        // console.log(data)        
        response.json(data)
    }).catch(erro => console.log(erro))
})
// app.post('/python', (request, response)=>{
//     console.log(request.body, 'dentro de post /python')
// })
 

// var boadica = require('./services/boadica.json');
// const { json } = require('express');
// // console.log(boadica.valores)

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`inicou na porta ${port} corretamente`))

app.use(express.static('../Client'));
app.use(express.json({limit:'1mb'}))

//schema clientes
app.post('/api', (request, response) =>{
    clienteDao = new clienteDAO(dataStore);
    
    console.log(request.body);
    data = request.body
    clienteDao.adicionar(data);

    response.json({
        stts: 'Success!',
        log_time: new Date().getDate()
    })
})

app.get('/api', (request, response) =>{
    clienteDao = new clienteDAO(dataStore);
    
        
    clienteDao.getAll().then(resp => {
        
        response.json(resp)

    }).catch(erro => console.log(erro))      
})

//aqui será postado o schema dos equipamentos.
app.post('/api2', (request, response) =>{
    equipDao = new equipDAO(dataStore);

    console.log(request.body);
    data = request.body;
    equipDao.adicionar(data);

    response.json({
        stts :'Succ'        
    })
})

app.get('/api2', (request, response) =>{
    equipDao = new equipDAO(dataStore);        
    equipDao.getAll().then(resp => {        
        response.json(resp)
    }).catch(erro => console.log(erro))      
})

//aqui será postado e pegado o schema de produtos.
app.post('/api3', (request, response)=>{
    produtoDao = new produtoDAO(dataStore);
    console.log(request.body);
    data = request.body;
    produtoDao.adicionar(data);

    response.json({
        stts: 'api3 adicionada com sucesso'
    })
})
app.get('/api3', (request, response)=>{
    produtoDao = new produtoDAO(dataStore);
    produtoDao.getAll().then(resp=> {
        response.json(resp)
    }).catch(erro => console.log(erro, 'deu ruim no get de api3'))
})

//sobre atualzações
app.put('/atualizar', (request, response) =>{
    // console.log(request.body);
    let equipDao = new equipDAO(dataStore);
    let clienteDao = new clienteDAO(dataStore);
    
    equipDao.update(request.body)
            .then(()=> response.status(200).end())
            .catch(erro => console.log(erro))
    clienteDao.update(request.body)
            .then(()=> response.status(200).end())
            .catch(erro => console.log(erro))    
})

//sobre pesquisas
app.post('/pesquisa1', (request, response) =>{
    console.log(request.body, 'post request');
    var dataID = request.body;
    
    response.json(dataID)
})

app.get('/pesquisa1', (request, response) =>{
    clienteDao = new clienteDAO(dataStore);
          
    let id = 4  
    clienteDao.getNameById(id).then(resp => {
        
        console.log(resp)

    }).catch(erro => console.log(erro))       
})

//dados temporários de transação de páginas.
app.post('/temps', (request, response) =>{
    tempDataDao = new tempDataDAO(dataStore);
    data = request.body;    
    tempDataDao.adicionar(data).then(()=> response.status(200).end())
                               .catch(erro => console.log(erro, "Deu ruim dentro de post temps"))

    console.log(request.body, 'dentro de post temps');   
})

app.get('/temps',(request, response)=>{
    tempDataDao = new tempDataDAO(dataStore);
    tempDataDao.getAll().then(resp=>{
        response.json(resp);
    }).catch(erro => console.log(erro, "deu ruim dentro de get temps"))
} )

app.delete('/temps', (request, response)=>{
    tempDataDao = new tempDataDAO(dataStore);
    tempDataDao.removeAll().then(()=> response.status(200).end())
                           .catch(erro => console.log(erro, "deu ruim dentro de delete temps"))
})
