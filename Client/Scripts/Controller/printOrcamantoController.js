class PrintOrcamentoController{
    constructor(){
        let $ = document.querySelector.bind(document);
        
        
        this._listaConvertida = new Converter()
        this._clientes = [];
        this._equipamentos = [];
        this._desenhaPrintOorcamento = new DesenhaPrintOrcamento(document.querySelector("#orcamento"));
        

    }

    getUrlVars() {
        //usado pra pegar variáveis de url, talvez seja útil transformar isso em um módulo.
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    desenha(){
        var os = this.getUrlVars()["os"];
        var awaitOs = this.getDataOS()
        let awaitClie = this.getDataCliente();
        let awaitEquip = this.getDataEquip();
        let awaitEquipProduto = this.getDataEquipProduto(os);
        console.log()
        awaitClie.then(dataclie=>{
            awaitEquip.then(dataEquip=>{
                awaitEquipProduto.then(dataEquipProduto=>{
                    

                    // dataclie.forEach( clie=> {
                    //     console.log(clie)
                        
                    // });
                    let listaFinal = []
                    let listaServ = []
                    let listaProd =[]
                    dataEquip.forEach(equip=>{
                        let id = equip.cliente_id
                        if(equip.os == os){
                            dataclie.forEach(clie=>{
                                if(clie.id == equip.cliente_id){
                                    console.log(equip)
                                    listaFinal.push(
                                        clie.nome,
                                        clie.telefone,
                                        equip.os,                                        
                                        equip.modelo,                                       
                                        equip.orcamento)
                                }
                                
                            })
                        }   
                        
                    })
                    let counter = 0;
                    let counter2 = 0;
                    let counter3 = 0;
                    dataEquipProduto.forEach(equipProduto=>{
                        if(equipProduto.tipo == "Produto"){
                            
                            counter2 += parseFloat(equipProduto.valor);
                            listaServ.push([equipProduto.nome, equipProduto.valor, equipProduto.pe_id])
                            
                        }
                       
                        if(equipProduto.tipo == "Serviço"){
                            counter3 += parseFloat(equipProduto.valor);
                            listaProd.push([equipProduto.nome, equipProduto.valor, equipProduto.pe_id])
                            
                        }

                        counter += parseFloat(equipProduto.valor);
                  
                        
                    })
                    listaFinal.push(counter.toFixed(2), counter2.toFixed(2), counter3.toFixed(2))
                    
                
                    this._desenhaPrintOorcamento.formato(listaFinal, listaProd, listaServ);
                    this._desenhaPrintOorcamento.update(listaFinal, listaProd, listaServ);
                    
                })

                
            })
        })
       
    }
    async getDataOS(){
        //isso daqui retorna a ultima os que teve status alterado para Orçado.
        const response = await fetch('/temps');
        const data = await response.json();            
        return data;
    }
    async getDataCliente() {
        const response = await fetch('/api');
        const data = await response.json();            
        return data;
    }
    async getDataEquip() {
        const response = await fetch('/api2');
        const data = await response.json();            
        return data;
    }
    
    async getDataBoadica(id){
        const response = await fetch(`/python/${id}`);
        const data = await response.json();
        return data;
    }
    async getDataProdutos(){
        const response = await fetch('api3');
        const data = await response.json();
        return data;
    }

    async getDataEquipProduto(id){
        //paramatro id é a OS
        //retorna o equipproduto pesquisado com determinada OS/id
        const response = await fetch(`/equipproduto/${id}`);
        const data = await response.json();
        return data;

    }

}