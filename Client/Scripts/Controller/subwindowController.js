class SubWindowController {
    constructor(){
        let $ = document.querySelector.bind(document);

        this._miniwindow = $('.miniwindow');        
        
        this._desenhaWindow = new DesenhaSubWindow($('#mini_window'));
        this._desenhaPrintOrcamento = new DesenhaPrintOrcamento($("#orcamento"));
        this._listaConvertida = new Converter();
        this._printOrcamentoContoller = new PrintOrcamentoController();
        

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

                            let todosStatus = document.querySelectorAll('option');
                            
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

    //isso aqui desenha a sub-subwindow de orçamento
    desenha2(){
        console.log('cliackado dentro da função desenha2')
    }

    cancelar(){
        let orcamentoEscrito = document.querySelector('#orcamento_id');
        orcamentoEscrito.value = ""    
        this._miniwindow.classList.add('hidden');
    }

    aplicar(osid){
        let awaitClie = this.getDataCliente();
        let awaitEquip = this.getDataEquip();
        
        let awaitProduto = this.getDataProdutos();

        

        awaitClie.then(datas => {            
            datas.forEach(data => {
                this._clientes.push(data);                
            })               
            awaitEquip.then(datas => {
                datas.forEach(data => {
                    this._equipamentos.push(data)
                }) 
                
                let newData = this._listaConvertida.conversor(this._clientes, this._equipamentos)

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

                        //isso cria um dado temporário que gera um orçamento baseado na ultima OS com status Orçado
                        if(equipData.status == "Orçado"){
                            //mantém tempData sempre vazio antes de adicionar dados
                           const options2 = {
                               method: 'DELETE'                
                           };
                           //adiciona dados do cliente e quipamento temporários
                           const options3 = {
                               method: 'POST',
                               headers: {
                                   'Content-Type': 'application/json'
                               },
                               body: JSON.stringify(newData[i])
                           };

                           fetch('/temps', options2).then(option3=>{
                               fetch('/temps', options3)
                           })         

                       }                                                                            
                    }
                }                                                                                                  
            })
        })
        awaitProduto.then(pd=>{  //isso aqui tá uma zona do kralho.
            //retorna todos os produtos
            
            const options = {
                method: 'GET'            
            };
            fetch(`/python/${pd[1].ps_id}`, options)
            //pega o id do produto e passa como parametro de URL pro GET em app.js

            let awaitboadica = this.getDataBoadica(pd[1].ps_id);
            
            awaitboadica.then(bd =>{
                console.log('foda-se')
                //retorna os dados do link do boadica com base no parametro passado em produtos ali em cima,
                //o parametro de URL entra na função runpy, vai para o python que pega a url do boadica referente ao produto
                //e retorna todas as informações do site boadica em json. NEM EU TO ENTENDENDO MAIS ESSA PORRA DIREITO!
                console.log(bd)
            })
        })        
    }
    

    salvar(osid){
        let awaitClie = this.getDataCliente();
        let awaitEquip = this.getDataEquip();
        awaitClie.then(datas => {            
            datas.forEach(data => {
                this._clientes.push(data);                
            })               
            awaitEquip.then(datas => {
                datas.forEach(data => {
                    this._equipamentos.push(data)
                })
                let newData = this._listaConvertida.conversor(this._clientes, this._equipamentos)
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
                        fetch('/atualizar', options);
                        if(equipData.status == "Orçado"){
                             //mantém tempData sempre vazio antes de adicionar dados
                            const options2 = {
                                method: 'DELETE'                
                            };
                            //adiciona dados do cliente e quipamento temporários
                            const options3 = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newData[i])
                            };

                            fetch('/temps', options2).then(option3=>{
                                fetch('/temps', options3).then(()=>{
                                    location.reload();
                                });
                            })
                            let newTab = window.open('http://localhost/printOrcamento.html')
                            setTimeout(() => {
                                newTab.close()
                            }, 1000); 
                        }else{
                            location.reload();
                        }                                                                           
                    }
                }              
                                                                                                                              
            })            
        })                
    }
}