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
                                            datastamp) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [
                produto.nome, produto.boadica, produto.valor, produto.custo, produto.fornecedor, produto.estoque, new Date().getTime()
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
                tipo = ?,
                nome = ?,
                valor = ?,
                estoque = ?,
                boadica = ?                
                WHERE ps_id = ?`,
                [
                    produto.tipo,
                    produto.nome,
                    produto.valor,
                    produto.estoque,
                    produto.boadica,
                    produto.orcamento,
                    produto.id
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
}
module.exports = ProdutoDAO;