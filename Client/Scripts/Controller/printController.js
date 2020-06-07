class PrintController{
    constructor(){
        let $ = document.querySelector.bind(document);
        this._desenhaPrintOS = new DesenhaPrintOs($("#ordem_service"));

        this._listaConvertida = new Converter()
        this._clientes = [];
        this._equipamentos = [];

    }
    desenha(){
        var awaitClie = this.getDataCliente()
        var awaitEquip = this.getDataEquip()
        awaitClie.then(datas => {            
            datas.forEach(data => {
                this._clientes.push(data);                
            })               
            awaitEquip.then(datas => {
                datas.forEach(data => {
                    this._equipamentos.push(data)
                })
                var newData = this._listaConvertida.conversor(this._clientes, this._equipamentos)
                    
                this._desenhaPrintOS.formato(newData)
                this._desenhaPrintOS.update(newData)
                                                  
            })
        })
                        
    }

    async getDataCliente() {
        const response = await fetch('/api');
        const data = await response.json();            
        return data;
    }

    async getDataEquip() {
        const response = await fetch('/api2');
        const data = await response.json();            
        return data;
    }
}
