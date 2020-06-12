class DesenhaPrintOrcamento extends Desenhador{
    constructor(elemento){
        super(elemento);
        this.dateHelper =  new DateHelper();
        
    }
    formato(model){   
        
        
        return `    
        <div class="miolo">
            <section class="sobre_cliente">
                <a class="campo">Nome do cliente: </a> <a id='nome'>${model.cliente_nome}</a><br>                    
                <a class="campo">Telefone: </a> <a id='telefone'>${model.cliente_telefone}</a><br>
                <br>
                <a class="campo">Data de orçamento: </a><a>VARIÁVEL</a>                  
            </section>
            <section class="sobre_orcamento">
                <div class="diagnostico setor1">
                    <h3 class="subtitulo">${model.modelo}modelo do equipamento</h3>
                    <br>
                    <h3 class="subtitulo">Diagnóstico: </h3>
                    <p>${model.orcamento}</p>
                </div>
                <div class="servicos setor2">
                    <h3 class="subtitulo">Serviços:</h3>
                    <p>${model.orcamento}</p>                    
                </div>
                <div class ="pecas setor2">
                    <h3 class="subtitulo">Peças:</h3>
                    <p>${model.orcamento} </p>
                </div>                    
                <div class="total setor2">
                    <a>Valor Total: </a><a>VARIÁVEL </a>
                </div>
                <div class="comunicado setor2"> 
                    <p>Prazo de entrega até 3 dias úteis apartir da data de aprovação do serviço.</p>
                    <br>                    
                    <p>Todas as peças e serviços tem garantia de 3 meses apartir da data de entrega. Valores de orçamentos são válidos por uma semana e poderão ser recalculados caso o período expire. </p>
                </div>
            </section>
        </div>            

        `
        
    }
    update(model){
        this._elemento.innerHTML = this.formato(model);
    }
}