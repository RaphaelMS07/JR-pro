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
        let dataAtual = new Date(datastamp)  //parece q o *1 ajuda a converter em número, vai saber....

        let mesTratado =''
        let diaTratado = ''

        if(dataAtual.getMonth()+1<10){
            let mes = dataAtual.getMonth()+1
            mesTratado = '0'+mes
        }else{
            mesTratado = dataAtual.getMonth()+1
        }
        if(dataAtual.getDate() < 10){
            let dia = dataAtual.getDate()
            diaTratado = '0'+dia
        }else{
            diaTratado = dataAtual.getDate()
        }
      
        
        
        return `${diaTratado}/${mesTratado}/${dataAtual.getFullYear()}` // por algum motivo o mês funciona diferente do resto. como se fosse index de uma lista.
        
    }

    static virgulaParaPonto(texto){        
        var resp = texto.replace(",", ".")
        return resp
    }

    static pontoParaVirgula(texto){
        var resp = texto.replace('.', ',')
        return resp
    }
}