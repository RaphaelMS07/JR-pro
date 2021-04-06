class EquipDAO{
    constructor(db){
        this._db = db;
    }
    adicionar(equip){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `INSERT INTO equipamentos (cliente_id, 
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
                                           valor_total,
                                           data_retirada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
                equip.id, equip.modelo, equip.serial, equip.def_alegado, equip.obs, new Date().getTime(), 'Não orçado', "", "", "", "", "", "", "",""
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
            this._db.all(`SELECT * FROM equipamentos`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar a tabela Produtos')
                }                                
                return resolve(result);
            })
        })
    }
    getId(){
        return new Promise((resolve, reject) =>{
            this._db.all(`SELECT id FROM equipamentos`, (erro, result) =>{
                if (erro){
                    return reject ('Não foi possível selecionar ID de')
                }                                
                return resolve(result);
            })
        })
    }
    update(equipamento){
        console.log(equipamento, 'dentro de update equip')
        
        return new Promise((resolve, reject) =>{
            this._db.run(`
                UPDATE equipamentos SET
                modelo = ?,
                serial = ?,
                def_alegado = ?,
                obs = ?,
                status = ?,
                orcamento = ?
                WHERE os = ?`,
                [
                    equipamento.modelo,
                    equipamento.serial,
                    equipamento.def_alegado,
                    equipamento.obs,
                    equipamento.status,
                    equipamento.orcamento,
                    equipamento.os
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
    
    delete(equipamento){
        console.log(equipamento, 'dentro de delete equip')

        return new promisse((resolve, reject) =>{
            this._db.get(`DELETE FROM equipamentos`,[],
            (erro, result)=> {
                if(erro){
                    return reject("Não foi possível excluir a porra toda")
                }
                console.log('A porra toda foi excluída!')
                return resolve(result);
            })
        })
    }
}
module.exports = EquipDAO;
