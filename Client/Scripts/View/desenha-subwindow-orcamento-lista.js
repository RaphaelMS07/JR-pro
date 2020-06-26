class DesenhaOrcamentoWindow extends Desenhador{
    constructor(elemento){
        super(elemento)
        this.listaClientes = []
        
        this.dateHelper =  new DateHelper()

       
    }
    formato(model, os){
        //retorna lista; cada item retorna: pe_id, os, ps_id, nome, tipo, valor
        let counter = 0
        let counter2 = 0
        let counter3 = 0
        for(let i=0; i<model.length; i++){
            let number = parseFloat(model[i].valor)
            let item = model[i]
            if(item.tipo == 'Produto'){
                counter2 += number
                console.log()
            }
            else if(item.tipo == 'Serviço'){
                counter3 += number
                console.log()
            }
            
            
            counter += number
        }
        return `
        <div class="window window2 main_grid" id="window-orcamento">
            <div class="legenda_window cabecalho3">
                <span >OS: </span> <span id="os2">${os}</span>
            </div>            
            <section id="add_produtos_area" class="grid_produtos">
                
                <p class="legenda_window" id="legenda_add_produtos">Adicionar itens</p>                
                <div class="pseudo-textbox" id='add_produtos'>
                    <div class="add_produto">
                    ${                        
                        model.map(n=>
                            `
                            <div id="${n.pe_id}">
                            <input class="pesquisa pesquisado" id="pesquisa${model.indexOf(n)}" autocomplete="off" readonly="true" onclick="subwindowValores.showInfos(${n.ps_id})" value="${n.nome}"><input class="valor valorado" id="valor${model.indexOf(n)}" value="${n.valor}"><button class="fechar" id="fechar${model.indexOf(n)}" onclick="subwindowValores.removerPesquisa(${model.indexOf(n)}); subwindowValores.deleteEquipProduto(${n.pe_id})">X</button>
                            </div>
                            `
                        ).join('')
                    }
                    
                        
                    </div>
                    <div id='dppesquisar' class="hidden"></div>                                
                    <button class="add_butt" value="add_produto" onclick="subwindowValores.desenhaLista()" title="adicionar valor">+</button>
                </div>
                <div class="rodape">
                    <div class="legenda_window2">
                        <span class="legenda_window">TOTAL: </span>
                        <span id="total" class="legenda_window legenda_valor">R$ ${counter}</span>
                    </div>
                    <br>
                    <div class="legenda_window2">
                        <span class="legenda_window">Peças: </span>
                        <span id="total" class="legenda_window legenda_valor">R$ ${counter2} </span>
                    </div>
                    <div class="legenda_window2">
                        <span class="legenda_window">Serviços: </span>
                        <span id="total" class="legenda_window legenda_valor">R$ ${counter3} </span>
                    </div>
                </div>
                
                <button class="butt" id="printer" title="imprimir orçamento" onclick="subwindowValores.goto(${os})">&#x1f5b6;</button>
                <button class="butt" id="refresh" title="atualizar alterações de preço" onclick="console.log('refreshed')">&#x1f5d8; </button>
                <button class="butt" id="ok" title="fechar não cancela alterações!" onclick="subwindowValores.fechar(1)">Fechar </button>
            </section>
            <div id="window_boadica"></div>
                                 
        </div>
        
        `          
    }
    
    update(model, os){       
        this._elemento.innerHTML = this.formato(model, os)
        
    }
}