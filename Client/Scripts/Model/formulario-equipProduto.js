class FormularioEquipProduto{
    constructor(os, ps_id, nome, valor){
        this._os = os;
        this._ps_id = ps_id;
        this._nome = nome;
        this._valor = valor;
       
    }
    get data(){
        return {
            os:  this._os,
            ps_id: this._ps_id,
            nome: this._nome,
            valor: this._valor
            
        }
    
    }
}