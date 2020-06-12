class PrintOrcamentoController{
    constructor(){
        let $ = document.querySelector.bind(document);
        this._desenhaPrintOorcamento = new DesenhaPrintOrcamento($("#orcamento"));
        
        this._listaConvertida = new Converter()
        this._clientes = [];
        this._equipamentos = [];

    }
    desenha(){
        var awaitOs = this.getDataOS()
        awaitOs.then(dados=>{
            this._desenhaPrintOorcamento.formato(dados);
            this._desenhaPrintOorcamento.update(dados);
        })
    }
    async getDataOS(){
        //isso daqui retorna a ultima os que teve status alterado para Orçado.
        const response = await fetch('/temps');
        const data = await response.json();            
        return data;
    }

    // async getDataCliente() {
    //     const response = await fetch('/api');
    //     const data = await response.json();            
    //     return data;
    // }

    // async getDataEquip() {
    //     const response = await fetch('/api2');
    //     const data = await response.json();            
    //     return data;
    // }
}