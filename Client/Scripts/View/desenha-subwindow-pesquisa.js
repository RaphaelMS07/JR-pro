class DesenhaSubWindow extends Desenhador{
    constructor(elemento){
        super(elemento)
        this.listaClientes = []
        let listaDeListas = []
        this.dateHelper =  new DateHelper()

       
    }
    formato(model, os){      
        
        for(let i = 0; i<model.length; i++){
            let cliente = model[i];
            // console.log(cliente.os)
            
            if (cliente.os == os){
                
                this.listaClientes.push([
                    cliente.cliente_nome,       //0
                    cliente.cliente_email,      //1
                    cliente.cliente_telefone,   //2
                    cliente.cliente_ender,      //3
                    cliente.modelo,             //4
                    cliente.serial,             //5
                    cliente.datastamp,          //6
                    cliente.def_alegado,        //7
                    cliente.os,                 //8
                    cliente.status,             //9
                    cliente.orcamento,          //10
                    cliente.obs                 //11
                ])                
            }            
        }
        
        let listaCerta = this.listaClientes[this.listaClientes.length -1] //gambiarra fodida
        if(this.listaClientes.length > 2){
            this.listaClientes.splice(0,1)
        }    
        return`
            <div id='window_id'class="window">
                <div class=" form_window">
                    <p class="titulo_window">Editar</p>
                    <div class="grid1">
                        <input type="text" id="nome" class="caixa_texto_window radius" value="${listaCerta[0]}">
                        <input type="text" id="email" class="caixa_texto_window radius" value="${listaCerta[1]}">                                
                    </div>
                    
                    
                    <div class="grid2">
                        <input type="text" id="tel" class="caixa_texto_window radius" value="${listaCerta[2]}">                            
                        <input type="text" id="ender" class="caixa_texto_window radius" value="${listaCerta[3]}">
                    </div>
                    
                    
                    <div class="grid3 legenda_window">
                        <label for="equipamento" class="legenda_window">Equipamento</label>
                        <label for="serial" class="legenda_window">N° Serial</label>
                        <label for="data" class="legenda_window">Data de entrada</label>  
                                                    
                    </div>
                    <div class="grid4">
                        <input type="text" id="equipamento" class="caixa_texto_window radius" value="${listaCerta[4]}">                            
                        <input type="text" id="serial" class="caixa_texto_window radius" value="${listaCerta[5]}">                                
                        <input type="text" id="data" class="caixa_texto_window radius" readonly="true" value="${DateHelper.datastampParaData(listaCerta[6])}">                            
                    </div>
                    <div class="grid5 legendas_window">
                        <label for="defeito" class="legenda_window">Defeito Alegado</label>                                                               
                        <label for="os" class="legenda_window"> N° OS.</label>                       
                        <label for="status" class="legenda_window"> Status</label>
                                                        
                    </div>
                    <div class="grid6">
                        <textarea name="defeito" id="defeito" cols="40" rows="1" class="caixa_orcamento caixa_texto_window radius" value="">${listaCerta[7]}</textarea>                                
                        <input type="text" id="os" class="caixa_texto_window radius" readonly="true" value="${listaCerta[8]}">

                        <input type="text" id="status" class="caixa_texto_status radius" value="${listaCerta[9]}">
                    </div>
                    <div class="grid7 legendas_window">
                        <label for="obs" class="legenda_window">Observações</label>                                                      
                    </div>
                    <div class="grid8 legendas_window">
                        <input type="text" id="obs" class="caixa_texto_window radius" value="${listaCerta[11]}">                                                      
                    </div>
                        
                    
                    <div class="orcamento">
                        <label for="orcamento_id" class="legenda_window">Orçamento</label>
                        <textarea wrap="hard" name="orcamento" id="orcamento_id" cols="69" rows="6"  class="radius caixa_orcamento">${listaCerta[10]}</textarea>
                    </div>
                    <div class="botoes">
                        <button id="aplicar" class="butt" onclick="subwindowController.aplicar(${listaCerta[8]})"> Aplicar</button>
                        <button id='salvar' class="butt" onclick="subwindowController.salvar(${listaCerta[8]})">Salvar</button>
                        <button id='cancelar' onclick="subwindowController.cancelar()" class="butt">Cancelar</button>                                
                    </div>
                    
                </div>                        
            </div>     
            
            `
    }
    updateEspecial(model, os){       
        this._elemento.innerHTML = this.formato(model, os)        
    }
}