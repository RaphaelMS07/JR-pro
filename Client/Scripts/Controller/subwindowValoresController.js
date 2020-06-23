class SubwindowValoresContoller{
    constructor(){
        let $ = document.querySelector.bind(document);
        let $A = document.querySelectorAll.bind(document);
        // this._id = id

        // this._elemento2 = $('.add_produto');
        this._allItens = $('.item_pesquisa');
        this._inputPesquisa = $A('.pesquisado');
        this.divLista = $('#dppesquisar')
        this._desenhaPesquisa = new DesenhaPesquisa($('#dppesquisar'));
        this._desenhaOrcamento = new DesenhaOrcamentoWindow($('#mini_window2'));
    }

    async getDataProduto(){
        //retorna uma lista de itens, cada item retorna: boadica, custo, datastamp, estoque, fornecedor, nome, ps_id, valor
        //valor é nulo caso seja item de boadica
        const response = await fetch(`api3`);
        const data = await response.json();
        return data;
    }
    async getDataBoadica(id){
        //retorna item, item retorna: ender_tel, valor_medio, valores.
        //ender_tel retorna uma lista de endereços e telefones
        //cada item de ender_tel retorna endereço [0] e os telefones [1] pra cima.
        //valor_medio retorna um valor em decimal 00.00
        //valores retorna uma lista com todos os valores encontrados em ordem
        const response = await fetch(`python/${id}`);
        const data = await response.json();
        return data;
    }

    desenha(){
        // let awaitProduto = this.getDataProduto(idProduto)
        // awaitProduto.then(pd=>{  //isso aqui tá uma zona do kralho.
        //     //retorna todos os produtos
            
        //     const options = {
        //         method: 'GET'            
        //     };
        //     fetch(`/python/${pd[1].ps_id}`, options)
        //     //pega o id do produto e passa como parametro de URL pro GET em app.js

        //     let awaitboadica = this.getDataBoadica(pd[1].ps_id);
            
        //     awaitboadica.then(bd =>{
        //         console.log('foda-se')
        //         //retorna os dados do link do boadica com base no parametro passado em produtos ali em cima,
        //         //o parametro de URL entra na função runpy, vai para o python que pega a url do boadica referente ao produto
        //         //e retorna todas as informações do site boadica em json. NEM EU TO ENTENDENDO MAIS ESSA PORRA DIREITO!
        //         console.log(bd)
        //     })
        // })
        let janela = document.querySelector('#mini_window2')
        if(janela.className == "miniwindow hidden"){            
            janela.classList.remove('hidden');
        }
        let awaitProduto = this.getDataProduto()
        let vazio = [] //só pra testar uma parada aí.
        awaitProduto.then(pd=>{
            
            this._desenhaOrcamento.formato(vazio);
            this._desenhaOrcamento.update(vazio);
        })
        

    }
    desenhaLista(){
        let _elemento2 = document.querySelector('.add_produto');
      
        let pCount = document.querySelectorAll('.pesquisa');  //conta a quantidade de itens pesquisa pra gerar um novo id pro item
        
        // essa parte faz com que o vizinho de cima mude alguns atributos.     
        if(pCount.length > 0){
            console.log(pCount.length-1)
            var pesquisado = document.querySelector(`#pesquisa${pCount.length-1}`)            
            pesquisado.setAttribute('readonly', 'true') 
            pesquisado.classList.add('pesquisado')

            var valorado = document.querySelector(`#valor${pCount.length-1}`)
            valorado.setAttribute('readonly', 'true');
            valorado.classList.add('valorado')
        }
         
        
    
              
        var pesquisa = document.createElement("input");
        pesquisa.classList.add('pesquisa');
        pesquisa.setAttribute("id", `pesquisa${pCount.length}`);
        pesquisa.setAttribute('autocomplete', 'off')

        var valor = document.createElement('input');
        valor.classList.add('valor');
        valor.setAttribute('id', `valor${pCount.length}`)
        valor.setAttribute('readonly', 'true');
        

         
        

        var fechar = document.createElement('button');
        fechar.classList.add('fechar');
        fechar.setAttribute('id', `fechar${pCount.length}`);
        fechar.setAttribute('onclick', `subwindowValores.removerPesquisa(${pCount.length})`);
        var tfechar = document.createTextNode('X');
        fechar.appendChild(tfechar);

        
        _elemento2.appendChild(pesquisa);
        _elemento2.appendChild(valor)
        _elemento2.appendChild(fechar)

        this.pesquisar(pCount.length)

        
    }
    removerPesquisa(id){
        let totalDom = document.getElementById('total');
        let valor = document.querySelector(`#valor${id}`);

        let numValor = parseFloat(valor.value)
        totalDom.textContent -= numValor
        
        let pesquisa = document.getElementById(`pesquisa${id}`);
        let fechar = document.getElementById(`fechar${id}`);
        let valor2 = document.getElementById(`valor${id}`)
        // console.log(fechar)
        pesquisa.classList.add('hidden');
        valor2.classList.add('hidden');
        fechar.classList.add('hidden');     
    }
    pesquisar(inputID){
        let _desenhaPesquisa = new DesenhaPesquisa(document.querySelector('#dppesquisar'));
        
        let awaitProduto = this.getDataProduto()
        
        
        awaitProduto.then(produtos=>{
            console.log(produtos)
            
            
            _desenhaPesquisa.formato(produtos)
            _desenhaPesquisa.update(produtos)
            

            let keylistener = document.querySelector(`#pesquisa${inputID}`)
            let allitens = document.querySelectorAll('.item_pesquisa')

            this.divLista = document.querySelector('#dppesquisar')
            
            keylistener.addEventListener('input', ()=>{
                if(keylistener.value.length >= 3){
                    this.divLista.classList.remove('hidden')
                    
                    for(let i=0; i < allitens.length; i++){
                        let item = allitens[i];
                        let texto = item.textContent;
                                                
                        var express = RegExp(keylistener.value, 'i')
                        if(express.test(texto)){
                            item.classList.remove('hidden')
                        }else{
                            item.classList.add('hidden')
                        }
                    }
                    
                }else{
                    this.divLista.classList.add('hidden')
                }
            })         
            
        });
    }
    selectPesquisa(nome, boadica, id, preco){
        //var produto é a mesmíssima coisa q var pesquisa, só tem nome diferente pq eu ou retardado
        let pCount = document.querySelectorAll('.pesquisa');
        let produto = document.querySelector(`#pesquisa${pCount.length-1}`);

        let vCount = document.querySelectorAll('.valor')
        
        produto.classList.add('pesquisado');
        produto.setAttribute('readonly', 'true');
        produto.setAttribute('onclick', `subwindowValores.showInfos(${id})`);
       

        let lastInput = pCount.length - 1
        pCount[lastInput].value = nome

        let valor = document.querySelector(`#valor${lastInput}`)
        valor.value = preco

        this.divLista.classList.add('hidden')

        let awaitBoadica = this.getDataBoadica(id)
        let awaitProduto = this.getDataProduto()
        
        awaitProduto.then(produtos=>{
            
            const options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produtos)
            };
            fetch('/atualizarapi3', options)

            awaitBoadica.then(bd=>{
            
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bd)
                };
                fetch('/atualizarapi3', options)
            })
        }).then(()=>{
            let totalTotal = 0
            var express = RegExp('hidden', 'i')
            
            for(let i=0; i<vCount.length; i++){
                let numValor = parseFloat(vCount[i].value) 
                if(!express.test(vCount[i].className)){                  
                    totalTotal += numValor 
                }
            }

            let totalDom = document.getElementById('total');
            totalDom.textContent = totalTotal
            console.log(totalTotal)
        })                    
    }

    showInfos(id){
        console.log(id)
        let awaitBoadica = this.getDataBoadica(id)
        awaitBoadica.then(bd=>{      
            console.log(bd)
                   
        })

    }
        
        
}