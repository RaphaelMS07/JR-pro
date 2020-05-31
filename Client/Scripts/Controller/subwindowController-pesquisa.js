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
        let awaitClie = this.getDataCliente();

        awaitClie.then(datas => {            
            datas.forEach(data => {
                this._clientes.push(data);                
            })               
            awaitEquip.then(datas => {
                datas.forEach(data => {
                    this._equipamentos.push(data)
                })
                let newDatas = this._listaConvertida.conversor(this._clientes, this._equipamentos)
                
                for(let i=0; i<newDatas.length; i++){
                    let newData = newDatas[i]                  
                    if(newData.os == osid){
    
                        let textOrcamento = document.querySelector('#orcamento_id').value;
                        let statusOptions = document.querySelector('#status').value;
                        let equipamento = document.querySelector('#equipamento').value;
                        let serialNumber = document.querySelector('#serial').value;

                        let nomeCliente = document.querySelector('#nome').value;
                        let emailCliente = document.querySelector('#email').value;
                        let telCliente = document.querySelector('#tel').value;
                        let enderCliente = document.querySelector('#ender').value;

                        newData.orcamento = textOrcamento
                        newData.status = statusOptions
                        newData.modelo = equipamento
                        newData.serial = serialNumber

                        newData.cliente_id = nomeCliente;
                        newData.cliente_email = emailCliente;
                        newData.cliente_telefone = telCliente;
                        newData.cliente_ender = enderCliente;                
    
                        const options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newData)
                        };
                        fetch('/atualizar', options)                                       
                    }                                                                                                                   
                }
            })        
        })        
    }

    salvar(osid){
        let awaitEquip = this.getDataEquip();
        let awaitClie = this.getDataCliente();
        awaitClie.then(datas => {            
            datas.forEach(data => {
                this._clientes.push(data);                
            })               
            awaitEquip.then(datas => {
                datas.forEach(data => {
                    this._equipamentos.push(data)
                })
                let newDatas = this._listaConvertida.conversor(this._clientes, this._equipamentos)
                
                for(let i=0; i<newDatas.length; i++){
                    let newData = newDatas[i]                
                    if(newData.os == osid){
    
                        let textOrcamento = document.querySelector('#orcamento_id').value;
                        let statusOptions = document.querySelector('#status').value;
                        let equipamento = document.querySelector('#equipamento').value;
                        let serialNumber = document.querySelector('#serial').value;


                        let nomeCliente = document.querySelector('#nome').value;
                        let emailCliente = document.querySelector('#email').value;
                        let telCliente = document.querySelector('#tel').value;
                        let enderCliente = document.querySelector('#ender').value;

                        newData.orcamento = textOrcamento
                        newData.status = statusOptions
                        newData.modelo = equipamento
                        newData.serial = serialNumber

                        newData.cliente_id = nomeCliente;
                        newData.cliente_email = emailCliente;
                        newData.cliente_telefone = telCliente;
                        newData.cliente_ender = enderCliente;                
    
                        const options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newData)
                        };
                        fetch('/atualizar', options);
                        location.reload();                                         
                    }                                                                                                                   
                }
            })        
        })  
    }
}