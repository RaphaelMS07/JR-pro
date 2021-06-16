class DesenhaPesquisa extends Desenhador{
    constructor(elemento){
        super(elemento)
    }

    formato(model){
        var listaParagrafos = []
        for (let i=0; i< model.length; i++){
            let item = model[i];
            if(item.telefone){
                listaParagrafos.push(               
                                
                    `<p id="${item.id}" class="item_pesquisa info_nome hidden" onclick='formController.selectPesquisa("${item.nome}", "${item.telefone}", "${item.id}")'>${item.nome}</p>`
                )
                    

            }
            if(item.ps_id){
               
                listaParagrafos.push(
                    `<p id="${item.ps_id}" class="item_pesquisa info_produto hidden" onclick = 'try {formController.selectPesquisa2("${item.nome}", "${item.valor}", "${item.custo}", "${item.fornecedor}","${item.estoque}","${item.ps_id}")}catch(e){subwindowValores.selectPesquisa("${item.nome}", "${item.boadica}", "${item.ps_id}", "${item.valor}")}'>${item.nome}</p>`

                )                    
              
            }              
        }
        
        return listaParagrafos.join('')      
    }
    update(model){
        this._elemento.innerHTML = this.formato(model)
    }
}