class DesenhaPrintOrcamento extends Desenhador{
    constructor(elemento){
        super(elemento);
        this.dateHelper =  new DateHelper();
        
    }
   
    formato(model, model2, medel3){
        let valorTotalProdutos = parseFloat(model[6]);
        let valorTotal = parseFloat(model[5]);
        let numeroDeServiços = model2.length;
        
        let parcelaStatus = '';
        let porcentagemDesconto = 0;
        let produtoNulo = '';

        if (valorTotalProdutos <= 0){
            produtoNulo = 'hidden'
        }else{
            produtoNulo = ``
        }

        if(valorTotal <= 100){           
            parcelaStatus = 'hidden';
        }
        if(100 < valorTotal && valorTotal <= 300){          
            parcelaStatus = 3;
            porcentagemDesconto = 10;
        }
        if(300 < valorTotal && valorTotal <= 1000){           
            parcelaStatus = 6;
            porcentagemDesconto = 15;      
        }
        else{           
            parcelaStatus = 12;
            porcentagemDesconto = 20;
        }


        let adicionado = valorTotal * (1 + porcentagemDesconto/100);
        let adicionadoRedondo = adicionado - (adicionado % 5);
        
        let adicionadoTratado = DateHelper.pontoParaVirgula(parseFloat(adicionadoRedondo).toFixed(2));
        let parcela = adicionado / parcelaStatus;
        let parcelaTratado = DateHelper.pontoParaVirgula(parseFloat(parcela).toFixed(2));

        let diferencaDePreco = adicionadoRedondo - model[5];
        let valorDistribuido = parseInt(diferencaDePreco/numeroDeServiços);             
        console.log(valorDistribuido);

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
                <div class="setor1">
                    <h3 class="subtitulo">${model[3]}</h3>
                    
                    <h3 class="subtitulo">Diagnóstico: </h3>
                    <p class="diagnostico">${model[4]}</p>
                </div>
                <div class="pecas setor2 ${produtoNulo}">
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
                <div class ="servicos setor2 ">
                    <h3 class="subtitulo">Serviços:</h3>
                        <table>
                            <tbody>
                                ${model2.map(n=>
                                    `
                                    <tr>
                                        <td class="descricao">${n[0]}</td>
                                        <td class="rs">R$</td>
                                        <td class="valores">${parseFloat(n[1]) + valorDistribuido},00</td>
                                    </tr>
                                    `
                                ).join('')}
                                    <tr>
                                        <td class="descricao_total">Total: </td>
                                        <td class="rs">R$</td>
                                        <td class="valores">${parseFloat(model[7]) + valorDistribuido*2},00</td>
                                    </tr>                                                        
                            </tbody>
                        </table>
                </div>                    
                <div class="total setor2 ${parcelaStatus}">
                    <p class="subtitulo ${parcelaStatus}">Valor total: </a><a>${adicionadoTratado} </p>
                    <p class= "textoPequeno ${parcelaStatus}">Em até ${parcelaStatus}x de ${parcelaTratado} sem juros no cartão</p>
                </div>
                <div class="totalDesconto setor2">                    
                    <p class="subtitulo">Valor à vista: </a><a>${model[5]} </p>
                    <p class= "textoPequeno ${parcelaStatus}">Com desconto de ${porcentagemDesconto}% à vista no dinheiro ou por transferência</p>
                    
                </div>
               
                <div class="comunicado setor2"> 
                    <p>Prazo de entrega até 3 dias úteis apartir da data de aprovação do serviço.</p>
                                        
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