class DesenhaPrintOrcamento extends Desenhador{
    constructor(elemento){
        super(elemento);
        this.dateHelper =  new DateHelper();
        
    }
    formato(model){
        
        let lastCad = 0
        let osController = 0
        let cliente = 0
        for(let i=0; i < model.length; i++){
            cliente = model[i];
            
            if(cliente.os > osController){
                osController = cliente.os
                lastCad = cliente;                
            }
        }
        console.log(lastCad)
        
        
        return `    
        <div class="miolo">                
            <section class="sobre_cliente">
                <a class="campo">Nome do cliente: </a> <a id='nome'>${lastCad.cliente_nome}</a><br>                    
                <a class="campo">Telefone: </a> <a id='telefone'>${lastCad.cliente_telefone}</a><br>                   
                
            </section>
            <section class="sobre_equipamento">
                <div class="os">
                    <a class="campo">N° OS: </a> <a id='nome'>${lastCad.os}</a><br>
                </div>
                <a class="campo">Equipamento: </a> <a id='nome'>${lastCad.modelo}</a><br>                    
                <a class="campo">N° Serial: </a> <a id='telefone'>${lastCad.serial}</a><br>
                <a class="campo">Data de entrada: </a> <a id='entrada'>${DateHelper.datastampParaData(lastCad.datastamp)}</a><br>                    
                <a class="campo">Defeito alegado: </a> <a id='defeito'>${lastCad.def_alegado}</a><br>  
                <a class="campo">Observações: </a> <a id='obs'>${lastCad.obs}</a><br>                    
                
            </section>
            <section class="termo_responsabilidade">
                <h3>Termo de Responsabilidade:</h3>
                <P>
                    O cliente está ciente do prazo de 180 dias limite para fazer a retirada do equipamento. Caso o prazo não
                    seja cumprido, a empresa J&R informática poderá reivindicar o equipamento para fins de cobrir quaisquer
                    prejuízos referente ao serviço e as peças usadas no equipamento. O cliente também está ciente de valor de R$60,00 (sessenta reais) referente ao orçamento de notebooks caso o mesmo não aprove o orçamento.
                </P>
                <br>
                <p class="ass_client">Ass. Cliente: ______________________________________________________</p>
                <br>
                <p class="ass_jr">Ass. J&R Informática: ______________________________________________________</p>
            </section>               
        </div>           
    
        `
    }
    update(model){
        this._elemento.innerHTML = this.formato(model);
    }
}