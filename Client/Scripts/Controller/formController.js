class FormController {
    constructor(){
        let $ = document.querySelector.bind(document);

        this._clientes = [];

        this._inputNome = $('#nome');
        this._inputTel = $('#telefone');
        this._inputMail = $('#email');
        this._inputEnder = $('#endereco');
        
        this._inputEquipNome = $('#nome2')
        this._inputEquipTel = $('#telefone2')
        this._inputEquipId = $('#id')
        this._inputEquipModel = $('#modelo')
        this._inputEquipSerial = $('#serial')
        this._inputEquipDefeito = $('#defeito')
        this._inputEquipObs = $('#observ')

        this._listaDesenhador = new DesenhaPesquisa($('#divPesquisa'))

    }
    adicionarCliente(event){
        event.preventDefault();
        
        const dados = this._montarFormCliente().data
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };
        fetch('/api', options)        

        this._limpaform()

        var awaitDatas = this.getDataCliente()
        awaitDatas.then(datas => {            
            datas.forEach(data => {
                this._clientes.push(data);                
            })
            this._inputEquipNome.value = this._clientes[this._clientes.length -1].nome
            this._inputEquipTel.value = this._clientes[this._clientes.length -1].telefone
            this._inputEquipId.value = this._clientes[this._clientes.length -1].id
            
            // só vai dar pra fazer alguma coisa com esses valores aqui dentro dessa merda de promisse.                                                                    
        })        
    }

    adicionarEquip(event){
        event.preventDefault();
        
        const dados = this._montarFormEquip().data
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };
        fetch('/api2', options)        

        this._limpaform2()      
    }
    pesquisar(){       
        var awaitDatas = this.getDataCliente()
        awaitDatas.then(datas => {

            let listaNomes = []            
            datas.forEach(data => {
                this._clientes.push(data);
                listaNomes.push(data.nome);                
            })
            
            this._listaDesenhador.formato(this._clientes)
            this._listaDesenhador.update(this._clientes)
            
            var inputKeyWord = document.querySelector('#nome2');            
            var divNomes = document.querySelector('#divPesquisa');
            var listaNomes2 = document.querySelectorAll('.info_nome');             
            
            inputKeyWord.addEventListener('input', function(){         

                if(inputKeyWord.value.length > 1){ 
                    divNomes.classList.remove('hidden')
                                        
                    for(i=0; i < listaNomes.length; i++){
                        let item = listaNomes2[i];
                        let nome = item.textContent;           

                        var express = RegExp(inputKeyWord.value, 'i')
                        if(express.test(nome)){
                            item.classList.remove('hidden')                      
                        }else{
                            item.classList.add('hidden')
                        }
                    }
                }else{
                    for(let i=0; i<listaNomes.length; i++){
                        let item = listaNomes2[i];
                        item.classList.add('hidden')
                    }
                }
            })                                                                               
        })       
    }

    selectPesquisa(nome, telefone, id){
            var divNomes = document.querySelector('#divPesquisa')
            
            this._inputEquipNome.value = nome 
            this._inputEquipTel.value = telefone
            this._inputEquipId.value = id 
            
            divNomes.classList.add('hidden')
              
    }

    async getDataCliente() {
        const response = await fetch('/api');
        const data = await response.json();            
        return data;
    }  
    
    _montarFormCliente(){
        return new Formulario(
            this._inputNome.value,
            this._inputTel.value,
            this._inputMail.value,
            this._inputEnder.value
        )
    }

    _montarFormEquip(){
        return new FormularioCompleto(
            this._inputEquipNome.value,
            this._inputEquipTel.value, 
            this._inputEquipId.value,
            this._inputEquipModel.value,
            this._inputEquipSerial.value,
            this._inputEquipDefeito.value,
            this._inputEquipObs.value
        )
    }


    _limpaform(){
        this._inputNome.value = '';
        this._inputTel.value = '';
        this._inputMail.value = '';
        this._inputEnder.value = '';
        this._inputNome.focus();
    }
    _limpaform2(){
        this._inputEquipNome.value = '',
        this._inputEquipTel.value = '', 
        this._inputEquipId.value = '',
        this._inputEquipModel.value = '',
        this._inputEquipSerial.value = '',
        this._inputEquipDefeito.value = '',
        this._inputEquipObs.value = ''

    }
}