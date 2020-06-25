class DesenhaOrcamentoEnder extends Desenhador{
    constructor(elemento){
        super(elemento)
        this.listaClientes = []
        
        this.dateHelper =  new DateHelper()

       
    }
    formato(model){
        let enderprecosList = []
        let telList = []
        let valorList = []
        for(let i=0; i<model.ender_tel.length; i++){
            let precos = model.valores[i]
            let telender = model.ender_tel[i]
            let ender = telender[0]
            let tel1 = telender[1]
            let tel2 = telender[2]
            
            enderprecosList.push([ender, precos, tel1, tel2])
            telList.push([tel1, tel2])
            valorList.push(precos)
            
        }

        
        // console.log(enderprecosList)
        
        return `
        <div class="miniwindow" id="mini_window3">
            <div class="window window3" id="window-enderecos">
                
                <div class="legenda_window cabecalho3">
                    <p>Lista de endereços e preços boadica</p>
                    <p>Modelo</p>
                </div>
                <button class="butt fechar_bd" onclick="subwindowValores.fechar(2)">x</button>
                <table class="table2">
                    <thead id="id_thead">
                        <tr class="tr_class">
                            <th class="cabecalho4 ponta_esquerda" id="cab1">Endereço</th>
                            <th class="cabecalho4 meio" id="cab2">Preço</th>
                            <th class="cabecalho4 ponta_direita" id="cab3">Telefones</th>
                        </tr>                                
                    </thead>
                    <tbody id="id_tbody" cellspacing="0" cellpadding="1" border="1" width="650" >
                        ${
                            enderprecosList.map(n=>
                                `
                                <tr class="rows">
                                    <td id="ender2" class="linha2">${n[0]}</td>
                                    <td id="preco2" class="linha2">${n[1]}</td>
                                    <td id="loja" class="linha2">${n[2]} ${n[3]}</td>
                                </tr>
                                `
                            )
                        }
                        
                    </tbody>                            
                </table>

            </div>
        </div>                     
        `
    }
    
    update(model){       
        this._elemento.innerHTML = this.formato(model)
        
    }
}