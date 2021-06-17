class ProdutoDAO{
    constructor(db){
        this._db = db;
    }
    adicionar(produto){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `INSERT INTO produtos_servicos (
                                            nome,
                                            boadica,                                            
                                            valor,
                                            custo,
                                            fornecedor,
                                            estoque,                                            
                                            datastamp,
                                            tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                produto.nome, produto.boadica, produto.valor, produto.custo, produto.fornecedor, produto.estoque, new Date().getTime(), produto.tipo
            ],
            (erro)=>{
                if(erro){
                    return reject(erro.message)
                }
                console.log('produto adicionado com sucesso.')
                resolve();
            })
            
        })
    }
    getAll(){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT * FROM produtos_servicos`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar a tabela Produtos')
                }                                
                return resolve(result);
            })
        })
    }
    getId(){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT ps_id FROM produtos_servicos`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar ID de produtos_servicos')
                }                                
                return resolve(result);
            })
        })
    }
    update(produto){
        console.log(produto, 'dentro de update produto')
        
        return new Promise((resolve, reject) =>{
            this._db.run(`
                UPDATE produtos_servicos SET                
                nome = ?,
                valor = ?,
                custo = ?,
                fornecedor = ?,
                estoque = ?,
                tipo = ?                               
                WHERE ps_id = ?`,
                [                    
                    produto[1], //nome
                    produto[2], //valor
                    produto[3], //custo
                    produto[4], //fornecedor       
                    produto[5], //estoque
                    produto[6], //tipo
                    produto[0], //ps_id
                ],               
                (erro)=>{
                    if(erro){
                        return reject(erro.message)
                    }
                    console.log('dado de produto atualizado com sucesso.')
                    resolve();
                })
        })
    }
    delete(produto){
        console.log(produto.ps_id, 'dentro de delete produto')

        return new Promise((resolve, reject) =>{
            this._db.get(`DELETE FROM produtos_servicos WHERE ps_id = ?`,[
                produto.ps_id
            ],
            (erro, result)=> {
                if(erro){
                    return reject("Não foi possível excluir a porra toda")
                }
                console.log('A porra toda foi excluída!')
                return resolve(result);
            })
        })
    }
    boadicaUpdate(produto){
        console.log(produto.ps_id, produto.valor_medio, 'dentro de boadicaupdate produto')
        
        return new Promise((resolve, reject) =>{
            this._db.run(`
                UPDATE produtos_servicos SET               
                valor = ?                          
                WHERE ps_id = ?`,
                [                  
                    produto.valor_medio,                                  
                    produto.ps_id
                ],               
                (erro)=>{
                    if(erro){
                        return reject(erro.message)
                    }
                    console.log('dado boadica atualizado com sucesso.')
                    resolve();
                })
        })

    }
}
module.exports = ProdutoDAO;