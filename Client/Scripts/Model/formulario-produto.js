class FormularioProduto{
    constructor(nome, boadica, valor, custo, fornecedor, estoque, tipo){
        this._nome = nome;
        this._boadica = boadica;
        this._valor = valor;
        this._custo = custo;
        this._fornecedor = fornecedor;
        this._estoque = estoque;
        this._tipo = tipo
    }
    get data(){
        return {
            nome: this._nome,
            boadica: this._boadica,
            valor: this._valor,
            custo: this._custo,
            fornecedor: this._fornecedor,
            estoque: this._estoque,
            tipo: this._tipo
        }
    
    }
}