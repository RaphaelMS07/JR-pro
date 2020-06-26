class FormularioEquipProduto{
    constructor(os, ps_id, nome, valor, tipo){
        this._os = os;
        this._ps_id = ps_id;
        this._nome = nome;
        this._valor = valor;
        this._tipo = tipo;
       
    }
    get data(){
        return {
            os:  this._os,
            ps_id: this._ps_id,
            nome: this._nome,
            valor: this._valor,
            tipo: this._tipo
            
        }
    
    }
}