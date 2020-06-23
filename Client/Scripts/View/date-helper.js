class DateHelper {
    
    constructor() {
        
        // throw new Error('Esta classe não pode ser instanciada');
    }
    
    static dataParaTexto(data) {
        
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
    
    static textoParaData(texto) {
        
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) 
            throw new Error('Deve estar no formato aaaa-mm-dd');
             
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }

    static datastampParaData(datastamp) {
        let dia = new Date(datastamp)  //parece q o *1 ajuda a converter em número, vai saber....
        return `${dia.getDate()}/${dia.getMonth()+1}/${dia.getFullYear()}` // por algum motivo o mês funciona diferente do resto. como se fosse index de uma lista.
        
    }

    static virgulaParaPonto(texto){        
        var resp = texto.replace(",", ".")
        return resp
    }
}