class SubWindowController {
    constructor(){
        let $ = document.querySelector.bind(document);

        this._miniwindow = $('.miniwindow');        
        
        this._desenhaWindow = new DesenhaSubWindow($('#mini_window'));
        this._listaConvertida = new Converter()

        this._clientes = [];
        this._equipamentos = [];
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

    desenha(id){     //está sendo usado na tabela-desenhador!
        
        if(this._miniwindow.className == 'miniwindow hidden'){  
        
            let awaitClie = this.getDataCliente()
            let awaitEquip = this.getDataEquip()
            awaitClie.then(datas => {            
                datas.forEach(data => {
                    this._clientes.push(data);                
                })               
                awaitEquip.then(datas => {
                    datas.forEach(data => {
                        this._equipamentos.push(data)
                    })
                    let newData = this._listaConvertida.conversor(this._clientes, this._equipamentos)
                    
                    for(let i=0; i<newData.length; i++){
                        let clienteData = newData[i]
                        let clienteOs = clienteData.os
                                                
                        
                        if(clienteOs == id){                         
                            this._desenhaWindow.formato(newData, clienteOs);
                            this._desenhaWindow.updateEspecial(newData, clienteOs);

                            let todosStatus = document.querySelectorAll('option')
                            
                            for(let o = 0; o<todosStatus.length; o++){
                                let statusCerto = todosStatus[o];                             
                                
                                if(clienteData.status == statusCerto.value){                                 
                                    document.getElementById("statuses").selectedIndex = o;                             
                                }
                            }
                            newData = [] //reseta as listas pra evitar duplicação
                            this._clientes = []
                            this._equipamentos = []
                        }
                    }                                                                                                   
                })
            })
        }
        let janela = document.querySelector('.miniwindow');
        if(janela.className == "miniwindow hidden"){            
            janela.classList.remove('hidden');
        }
    }

    cancelar(){
        let orcamentoEscrito = document.querySelector('#orcamento_id');
        orcamentoEscrito.value = ""    
        this._miniwindow.classList.add('hidden');
    }
    aplicar(osid){
        let awaitEquip = this.getDataEquip();
        awaitEquip.then(datas => {           
            for(let i=0; i<datas.length; i++){
                let equipData = datas[i]               
                
                if(equipData.os == osid){

                    let textOrcamento = document.querySelector('#orcamento_id').value
                    let statusOptions = document.querySelector('select')
                    equipData.orcamento = textOrcamento
                    equipData.status = statusOptions.value
                    const options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(equipData)
                    };
                    fetch('/atualizar', options)                                       
                }
            }                                                                                                   
        }) 
    }

    salvar(osid){
        let awaitEquip = this.getDataEquip();

        awaitEquip.then(datas => {           
            for(let i=0; i<datas.length; i++){
                let equipData = datas[i]               
                
                if(equipData.os == osid){

                    let textOrcamento = document.querySelector('#orcamento_id').value
                    let statusOptions = document.querySelector('select')
                    equipData.orcamento = textOrcamento
                    equipData.status = statusOptions.value                  

                    const options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(equipData)
                    };
                    fetch('/atualizar', options)
                    location.reload();                                       
                }
            }                                                                                                   
        })           
    }
}