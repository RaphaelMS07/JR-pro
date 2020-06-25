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
    getAllbyID(os){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT * FROM equipProduto WHERE os = ?`
            ,
            [
                os
            ],
            (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar ID de equipProduto')
                }                                
                return resolve(result);
            })
        })
    }
    update(produto){
        console.log(produto, 'dentro de update equip')
        
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
    delete(dado){
        return new Promise((resolve, reject)=>{
            this._db.get(`DELETE FROM equipProduto WHERE pe_id = ?`,[
                dado.pe_id
            ],
            (erro, result)=>{
                if (erro) {
                    return reject("Não foi possivel excluir", produto)
                }
                console.log('Produto atrelado ao equipamento removido com sucesso: ', dado.pe_id)
                return resolve(result)
            })
        })
    }
}

module.exports = EquipProdutoDAO;