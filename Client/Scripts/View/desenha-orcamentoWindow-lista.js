class DesenhaOrcamentoWindow extends Desenhador{
    constructor(elemento){
        super(elemento)
        this.listaClientes = []
        let listaDeListas = []
        this.dateHelper =  new DateHelper()

       
    }
    formato(model, os){
        return           
    }
    
    updateEspecial(model, os){       
        this._elemento.innerHTML = this.formato(model, os)
        
    }
}