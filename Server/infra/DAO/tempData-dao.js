class TempDataDAO{
    constructor(db){
        this._db = db;
    }
    adicionar(temp){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `INSERT INTO tempData ( os,
                                        cliente_nome,
                                        cliente_telefone, 
                                        modelo, 
                                        serial, 
                                        def_alegado, 
                                        obs, 
                                        datastamp, 
                                        status, 
                                        orcamento,
                                        tipo_equip,
                                        servico,
                                        valor_servico,
                                        valor_hardware,
                                        valor_lucro,
                                        data_retirada,
                                        data_orcamento,
                                        tecnico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
                temp.os, temp.cliente_nome, temp.cliente_telefone, temp.modelo, temp.serial, temp.def_alegado, temp.obs,  new Date().getTime(), temp.status, temp.orcamento, "", "", "", "", "", "", "", ""
            ],
            (erro, result)=>{
                if(erro){
                    return reject("deu ruim kralho, fodeu")
                }
                console.log('dado temporário adicionado com sucesso.')
                resolve(result);
            })
            
        })
    }
    getAll(){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT * FROM tempData`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar a tabela Produtos')
                }                                
                return resolve(result);
            })
        })
    }
    removeAll(){
        return new Promise((resolve, reject)=>{
            this._db.get(`DELETE FROM tempData`,
            (erro, result)=>{
                if (erro) {
                    return reject("Não foi possivel excluir dados temporários")
                }
                console.log('Dado temporário removido com sucesso!')
                return resolve(result)
            })
        })
    }
}
module.exports = TempDataDAO;
