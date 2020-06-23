class DesenhaOrcamentoWindow extends Desenhador{
    constructor(elemento){
        super(elemento)
        this.listaClientes = []
        let listaDeListas = []
        this.dateHelper =  new DateHelper()

       
    }
    formato(model){
        return `
        <div class="window window2 main_grid" id="window-orcamento">
            <section id="add_produtos_area" class="grid_produtos">
                <label for="add_produtos" class="legenda_window" id="legenda_add_produtos">Adicionar itens</label>
                <div class="pseudo-textbox" id='add_produtos'>
                    <div class="add_produto">
                    ${                        
                        model.map(n=>
                            `
                            <input class="pesquisa pesquisado" id="pesquisa${model.indexOf(n)}" autocomplete="off" readonly="true" onclick="subwindowValores.showInfos(${n.ps_id})" value="${n.nome}"><input class="valor valorado" id="valor${model.indexOf(n)}" value="${n.valor}"><button class="fechar" id="fechar${model.indexOf(n)}" onclick="subwindowValores.removerPesquisa(${model.indexOf(n)})">X</button>
                            `
                        ).join('')
                    }
                    
                        
                    </div>
                    <div id='dppesquisar' class="hidden"></div>                                
                    <button class="add_butt" value="add_produto" onclick="subwindowValores.desenhaLista()">+</button>
                </div>
                <a class="legenda_window">TOTAL: </a> <a id="total" class="legenda_window"></a>
            </section>                                                
        </div>
        `          
    }
    
    update(model){       
        this._elemento.innerHTML = this.formato(model)
        
    }
}