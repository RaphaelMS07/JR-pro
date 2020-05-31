class ClienteDAO{
    constructor(db){
        this._db = db;
    }

    adicionar(cliente){
        return new Promise((resolve, reject)=>{
            this._db.run(`INSERT INTO clientes (nome,
                                                telefone,
                                                email,
                                                endereco, 
                                                datastamp,
                                                data_nascimento,
                                                cpf,
                                                rg,
                                                sexo,
                                                estado_civil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
                cliente.nome, cliente.telefone, cliente.email, cliente.endereco, new Date().getTime(), "", "", "", "", ""
            ],
            (erro)=>{
                if(erro){
                    return reject(erro.message)
                }
                console.log('dado adicionado com sucesso.')
                resolve();
            })
            
        })
    }
    update(cliente){
        console.log(cliente, 'dentro de update cliente')
        
        return new Promise((resolve, reject) =>{
            this._db.run(`
                UPDATE clientes SET
                nome = ?,
                telefone = ?,
                email = ?,
                endereco = ? 
                
                WHERE id = ?`,
                [
                    cliente.cliente_id,
                    cliente.cliente_telefone,
                    cliente.cliente_email,                    
                    cliente.cliente_ender,
                    cliente.id                  
                ],               
                (erro)=>{
                    if(erro){
                        return reject(erro.message)
                    }
                    console.log('dados de cliente atualizados com sucesso.')
                    resolve();
                })
        })
    }
    getAll(){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT * FROM clientes`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar a tabela Clientes')
                }                               
                return resolve(result);
            })
        })
    }
    getAllByName(name){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT * FROM clientes WHERE nome = ?`, [name], (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar Cliente')
                }                               
                return resolve(result);
            })
        })
    }
    getNameById(id){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT nome, id FROM clientes WHERE id = ?`, [id], (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar o ID')
                }                               
                return resolve(result);
            })
        })
    }
    getIdByName(name){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT id, telefone FROM clientes WHERE nome = ?`, [name], (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar o cliente')
                }                               
                return resolve(result);
            })
        })        
    }
    getAllEquipByClient(id){
        return new Promise((resolve, reject) =>{

            let cliente_id = this._db.all(`SELECT id FROM clientes WHERE nome = ?`, [id])
            this._db.all(`SELECT * FROM equipamentos WHERE cliente_id = ?`, [cliente_id], (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar o cliente')
                }                               
                return resolve(result);
            })
        })        
    }
}

module.exports = ClienteDAO;