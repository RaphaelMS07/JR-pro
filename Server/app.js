const express = require('express');
const app = express();

const dataStore = require('./infra/database')

const clienteDAO = require('./infra/DAO/cliente-dao')
const equipDAO = require('./infra/DAO/equip-dao')

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('iniciou na porta 3000 normalmente'))

app.use(express.static('../Client'));
app.use(express.json({limit:'1mb'}))

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
    console.log(request.param, 'get request')      
    let id = 4  
    clienteDao.getNameById(id).then(resp => {
        
        console.log(resp)

    }).catch(erro => console.log(erro))       
})
