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
                                
                    `<p id="${item.id}" class="item_pesquisa info_nome" onclick='formController.selectPesquisa("${item.nome}", "${item.telefone}", "${item.id}")'>${item.nome}</p>`
                )
                    

            }
            if(item.ps_id){
                listaParagrafos.push(
                    `<p id="${item.ps_id}" class="item_pesquisa info_nome" onclick='subwindowValores.selectPesquisa("${item.nome}", "${item.boadica}", "${item.ps_id}", "${item.valor}")'>${item.nome}</p>`
                )
                    

                
            }else(
                listaParagrafos.push(
                    `<p id ="${item.ps_id}" class="item_pesquisa info_produto" onclick='formController.selectPesquisa("${item.nome}", "${item.valor}", "${item.ps_id}", "${item.custo}", "${item.tipo}")'>${item.nome}</p>'`
                )
            )
            
                
        }
        
        return listaParagrafos.join('')      
    }
    update(model){
        this._elemento.innerHTML = this.formato(model)
    }
}