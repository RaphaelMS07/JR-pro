class EquipProdutoDAO{
    constructor(db){
        this._db = db;
    }
    adicionar(produto){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `INSERT INTO equipProduto (os, 
                                           ps_id, 
                                           nome, 
                                           valor) VALUES (?, ?, ?, ?)`, 
            [
                produto.os, produto.ps_id, produto.nome, produto.valor
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
    getAll(){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT * FROM equipProduto`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar a tabela equipProdutos')
                }                                
                return resolve(result);
            })
        })
    }
    getId(){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT id FROM equipProduto`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar ID de equipProduto')
                }                                
                return resolve(result);
            })
        })
    }
    update(produto){
        console.log(equipamento, 'dentro de update equip')
        
        return new Promise((resolve, reject) =>{
            this._db.run(`
                UPDATE equipProduto SET
                os = ?,
                ps_id = ?,
                nome = ?,
                valor = ?`
                ,
                [
                    produto.os,
                    produto.ps_id,
                    produto.nome,
                    produto.valor
                    
                ],               
                (erro)=>{
                    if(erro){
                        return reject(erro.message)
                    }
                    console.log('dado atualizado com sucesso.')
                    resolve();
                })
        })
    }
    delete(produto){
        return new Promise((resolve, reject)=>{
            this._db.get(`DELETE FROM equipProduto WHERE pe_id = ?`,[
                    produto.pe_id
            ],
            (erro, result)=>{
                if (erro) {
                    return reject("Não foi possivel excluir", produto)
                }
                console.log('Dado temporário removido com sucesso!')
                return resolve(result)
            })
        })
    }
}

module.exports = EquipProdutoDAO;