class FormController {
    constructor(){
        let $ = document.querySelector.bind(document);

        this._clientes = [];
        this._produtos = [];

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

        this._inputProdudoNome = $('#nome3');
        this._inputBoadica = $('#link');
        this._inputValor = $('#valor2');
        this._inputCusto = $('#custo');
        this._inputFornecedor = $('#fornecedor');
        this._inputEstoque = $('#estoque');
        this._inputPs_id = $('#ps_id');
        
        this._divTipo = document.getElementById('tipos');
        
        this._listaDesenhador = new DesenhaPesquisa($('#divPesquisa'));
        this._listaDesenhador2 = new DesenhaPesquisa($('#divPesquisa2'));
        

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
            
            // só vai dar pra fazer alguma coisa com esses valores dentro dessa merda de promisse.                                                                    
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

        this._limpaform2();
        let ip = 'localhost'
        let newTab = window.open(`http://${ip}/imprimir.html`)
        setTimeout(() => {
            newTab.close()
        }, 1000); 
    }

    adicionarProduto(event){
        event.preventDefault();

        event.preventDefault();
        
        let inputTipoProduto = document.getElementById('produto_radio');
        let inputTipoServico = document.getElementById('servico_radio');
        

        

        if(inputTipoProduto.checked){
            this._divTipo.value = inputTipoProduto.value;
            
        }
        else if(inputTipoServico.checked){
            this._divTipo.value = inputTipoServico.value;
            
        }
        const dados = this._montarFormProduto().data
        console.log(dados.tipo, this._divTipo.value);
        if(this._inputPs_id.value != "0"){
            this.atualizarProduto(this._inputPs_id.value, dados.nome, dados.valor, this._divTipo.value, dados.custo, dados.fornecedor, dados.estoque);
            
        }else if(this._inputPs_id.value == "0"){

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            };

            fetch('/api3', options)
            this._limpaform3();
            
        }
         
    }
    
    atualizarProduto(ps_id, nome, valor, tipo, custo="", fornecedor="", estoque=""){
        
        let novosDados = [ps_id, nome, valor, tipo, custo, fornecedor, estoque]

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novosDados)
        };
        fetch('/atualizarapi3', options)
    
    }

    nukeForProdutos(quantidadeTotal){
        for(let i=0; i<= quantidadeTotal; i++){
            let dado = {
                "ps_id": i
            }
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dado)
            };
            fetch('/api3', options)
        }
        
    }
    

    pesquisar(){
        var awaitDatas = this.getDataCliente()
        awaitDatas.then(datas => {
            let listaNomes = []            
            datas.forEach(data => {
                this._clientes.push(data); //ma q porra eh essa?
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

                        var express = RegExp(inputKeyWord.value, 'i') // acho que esse 'i' tem a ver com case sensitive
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

    pesquisarProduto(){
        var awaitDatas = this.getDataProduto()
        awaitDatas.then(datas =>{
            let listaProdutos = []
            datas.forEach(data => {
                this._produtos.push(data);
                listaProdutos.push(data.nome);                
            })
            
            this._listaDesenhador2.formato(this._produtos);
            this._listaDesenhador2.update(this._produtos);
            
            var inputKeyWord = document.getElementById('nome3');
            var divNomes = document.getElementById('divPesquisa2');
            var listaProdutos2 = document.querySelectorAll('.info_produto');
            

            inputKeyWord.addEventListener('input', function(){
                if(inputKeyWord.value.length > 1){
                    divNomes.classList.remove('hidden');

                    for(i=0; i< listaProdutos.length; i++){
                        let item = listaProdutos2[i];
                        let nome = item.textContent;

                        var express = RegExp(inputKeyWord.value, 'i')
                        if(express.test(nome)){
                            item.classList.remove('hidden');
                            
                        }else{
                            item.classList.add('hidden');
                        }
                    }                   
                }else{
                    for(let i=0; i<listaProdutos.length; i++){
                        let item = listaProdutos2[i];
                        item.classList.add('hidden');
                    }
                }
            })
        })
    }


    selectPesquisa(nome, telefone, fornecedor, estoque, id){
            var divNomes = document.querySelector('#divPesquisa')
            
            this._inputEquipNome.value = nome 
            this._inputEquipTel.value = telefone
            this._inputEquipId.value = id
            this._inputFornecedor.value = fornecedor
            this._inputEstoque.value = estoque
            
            divNomes.classList.add('hidden')
              
    }
    
    selectPesquisa2(nome, valor, custo, fornecedor, estoque, ps_id){
        var divNomes = document.querySelector('#divPesquisa2')

        let botaoCadastrar = document.querySelector('#submeter3').value;
        botaoCadastrar = 'Atualizar';
        console.log(botaoCadastrar)
        
        this._inputProdudoNome.value = nome 
        this._inputValor.value = valor
        this._inputCusto.value = custo
        this._inputFornecedor.value = fornecedor
        this._inputEstoque.value = estoque
        this._inputPs_id.value = ps_id
        
        divNomes.classList.add('hidden')
          
}

    async getDataCliente() {
        const response = await fetch('/api');
        const data = await response.json();            
        return data;
    }
    
    async getDataProduto(){
        const response = await fetch('api3');
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

    _montarFormProduto(){
        console.log(this._divTipo.value)
        
        return new FormularioProduto(
            this._inputProdudoNome.value,
            this._inputBoadica.value,
            this._inputValor.value,
            this._inputCusto.value,
            this._inputFornecedor.value,
            this._inputEstoque.value,
            this._divTipo.value
            
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
    _limpaform3(){
        
        this._inputProdudoNome.value = ''
        this._inputBoadica.value = ''
        this._inputValor.value = ''
        this._inputCusto.value = ''
        this._inputFornecedor.value = ''
        this._inputEstoque.value = ''
        
    }
}