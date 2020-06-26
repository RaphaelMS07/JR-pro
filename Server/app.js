const express = require('express');
const app = express();

const dataStore = require('./infra/database')

const clienteDAO = require('./infra/DAO/cliente-dao')
const equipDAO = require('./infra/DAO/equip-dao')
const produtoDAO = require('./infra/DAO/produto-dao')
const tempDataDAO = require('./infra/DAO/tempData-dao');
const equipProdutoDAO = require('./infra/DAO/equipProduto-dao')
const { request } = require('express');



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






const port = process.env.PORT || 80;
app.listen(port, () => console.log(`inicou na porta ${port} corretamente`))

app.use(express.static('../Client'));
app.use(express.json({limit:'1mb'}))

//sobre infos da api python
app.get('/python/:id', (request, response)=>{
    const id = request.params.id
    
    runPy(id).then(data=>{            
        response.json(data)
    }).catch(erro => console.log(erro))
})

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

app.post('/equipproduto', (request, response)=>{ //isso aqui é sobre produtos atrelados a equipamentos.
    equipProdutoDao = new equipProdutoDAO(dataStore);
    // console.log(request.body)
    equipProdutoDao.adicionar(request.body);
    response.json({
        stts : 'Succ'
    })
})
app.get('/equipproduto/:id', (request, response)=>{
    const id = request.params.id
    equipProdutoDao = new equipProdutoDAO(dataStore);
    equipProdutoDao.getAllbyID(id).then(resp=>{
        response.json(resp)
    }).catch(erro=> console.log('deu ruim na pesquisa de produto por os em app.get ', erro))
})
                                  
app.delete('/equipproduto', (request, response)=>{
    console.log(request.body)
    equipProdutoDao = new equipProdutoDAO(dataStore);
    equipProdutoDao.delete(request.body).then(()=>response.status(200).end())
                                        .catch(erro=> console.log('deu ruim ao deletar equipproduto em app.delete ', erro))

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

app.put('/atualizarapi3', (request, response)=>{ //se colocar a mesma rota do api3, vai ficar lento pra kralho!
    let produtoDao = new produtoDAO(dataStore);
    produtoDao.boadicaUpdate(request.body)
              .then(()=> response.status(200).end)
              .catch(erro=> console.log('deu ruim no put /atualizarapi3', erro))
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
