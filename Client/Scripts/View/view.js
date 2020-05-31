class Desenhador{
    constructor(elemento){
        this._elemento = elemento
    }
    formato(){
        throw console.error('O metodo formato deve ser implementado usando outro objeto que utilize da classe Desenhador');        
    }
    update(model){
        this._elemento.innerHTML = this.formato(model)
    }
}