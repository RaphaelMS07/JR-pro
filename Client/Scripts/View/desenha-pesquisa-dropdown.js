class DesenhaPesquisa extends Desenhador{
    constructor(elemento){
        super(elemento)
    }

    formato(model){
        var listaParagrafos = []
        for (let i=0; i< model.length; i++){
            let item = model[i];
            // console.log(item)
             
            listaParagrafos.push(               
                                
                `<p id="${item.id}" class="item_pesquisa info_nome" onclick='formController.selectPesquisa("${item.nome}", "${item.telefone}", "${item.id}")'>${item.nome}</p>`)
                // formController.selectPesquisa("${item}")
                
        }
        
        return listaParagrafos.join('')      
    }
}