class DesenhaPrintOrcamento extends Desenhador{
    constructor(elemento){
        super(elemento);
        this.dateHelper =  new DateHelper();
        
    }
   
    formato(model, model2, medel3){
        console.log("model2")
     
        return `    
        <div class="miolo">
            <section class="sobre_cliente">
                <a class="campo">Nome do cliente: </a> <a id='nome'>${model[0]}</a><br>                    
                <a class="campo">Telefone: </a> <a id='telefone'>${model[1]}</a><br>
                <a class="campo">OS: </a> <a id='telefone'>${model[2]}</a><br>
                <br>
                <a class="campo">Data de orçamento: </a><a>${DateHelper.datastampParaData(new Date().getTime())}</a>      
            </section>
            <section class="sobre_orcamento">
                <div class="diagnostico setor1">
                    <h3 class="subtitulo">${model[3]}</h3>
                    
                    <h3 class="subtitulo">Diagnóstico: </h3>
                    <p>${model[4]}</p>
                </div>
                <div class="pecas setor2">
                    <h3 class="subtitulo">Peças:</h3>                   
                        <table>
                            <tbody>
                                ${medel3.map(n=>
                                    `
                                    <tr>
                                        <td class="descricao">${n[0]}</td>
                                        <td class="rs">R$</td>
                                        <td class="valores">${n[1]}</td>
                                    </tr>
                                    `
                                ).join('')}
                                    <tr>
                                        <td class="descricao_total">Total: </td>
                                        <td class="rs">R$</td>
                                        <td class="valores">${model[6]}</td>
                                    </tr>                              
                            </tbody>
                        </table>                                       
                </div>
                <div class ="servicos setor2">
                    <h3 class="subtitulo">Serviços:</h3>
                        <table>
                            <tbody>
                                ${model2.map(n=>
                                    `
                                    <tr>
                                        <td class="descricao">${n[0]}</td>
                                        <td class="rs">R$</td>
                                        <td class="valores">${n[1]}</td>
                                    </tr>
                                    `
                                ).join('')}
                                    <tr>
                                        <td class="descricao_total">Total: </td>
                                        <td class="rs">R$</td>
                                        <td class="valores">${model[7]}</td>
                                    </tr>                                                        
                            </tbody>
                        </table>
                </div>                    
                <div class="total setor2">
                    <a>Valor Total: </a><a>${model[5]} </a>
                    <p class= "textoPequeno">Em até ${"VARIÁVEL"}x sem juros no cartão</p>
                </div>
                <div class="totalDesconto setor2">                    
                    <p>Valor Total: </a><a>${model[5]} </p>
                    <p class= "textoPequeno">Com desconto de ${"VARIÁVEL"} à vista no dinheiro ou por pix</p>
                    
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
    update(model, model2, model3){
        this._elemento.innerHTML = this.formato(model, model2, model3);
    }
}