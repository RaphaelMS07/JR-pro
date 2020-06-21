class DesenhaPesquisa extends Desenhador{
    constructor(elemento){
        super(elemento)
    }

    formato(model){
        var listaParagrafos = []
        for (let i=0; i< model.length; i++){
            let item = model[i];
            // console.log(item)
            if(item.telefone){
                listaParagrafos.push(               
                                
                    `<p id="${item.id}" class="item_pesquisa info_nome" onclick='formController.selectPesquisa("${item.nome}", "${item.telefone}", "${item.id}")'>${item.nome}</p>`
                )
                    

            }else{
                listaParagrafos.push(
                    `<p id="${item.ps_id}" class="item_pesquisa info_nome" onclick='subwindowValores.selectPesquisa("${item.nome}", "${item.boadica}", "${item.ps_id}")'>${item.nome}</p>`
                )
                    

                
            }
            
                
        }
        
        return listaParagrafos.join('')      
    }
}