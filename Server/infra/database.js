const sqlite = require('sqlite3').verbose();

const dataStore = new sqlite.Database('./bancoDeDados.db', (erro) => {
    if (erro){
        return console.error(erro.message);
    }
    console.log('Conectado ao banco de dados')
})

dataStore.serialize(function(){
    dataStore.run("PRAGMA foreign_keys=ON");
    dataStore.run(`CREATE TABLE IF NOT EXISTS clientes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(255),
        telefone VARCHAR(255),
        email VARCHAR(255),
        endereco VARCHAR(255),
        datastamp VARCHAR(255),
        data_nascimento VARCHAR(25),
        cep VARCHAR(25),
        cpf VARCHAR(25),
        rg VARCHAR(25),
        sexo VARCHAR(25),
        estado_civil VARCHAR(25)
    )`);

    dataStore.run(`CREATE TABLE IF NOT EXISTS equipamentos(               
        os INTEGER PRIMARY KEY AUTOINCREMENT,        
        cliente_id INTEGER(25),
        modelo VARCHAR(255),
        serial VARCHAR(255),
        def_alegado VARCHAR(255),
        obs VARCHAR(255),
        datastamp INTEGER(255),
        status VARCHAR(255),
        orcamento TEXT,        
        tipo_equip VARCHAR(25),
        servico VARCHAR(255),
        valor_servico VARCHAR(25),
        valor_hardware VARCHAR(25),
        valor_lucro VARCHAR(25),
        data_retirada INTEGER(255),
        tecnico VARCHAR(255)
    )`);
        
    });
   
// dataStore.close(()=> console.log('db encerrado'))
module.exports = dataStore;
