class SubwindowValoresContoller{
    constructor(){
        let $ = document.querySelector.bind(document);
        let $A = document.querySelectorAll.bind(document);
        // this._os = os;

        // this._elemento2 = $('.add_produto');
        this._allItens = $('.item_pesquisa');
        this._inputPesquisa = $A('.pesquisado');
        this.divLista = $('#dppesquisar')
        this._desenhaPesquisa = new DesenhaPesquisa($('#dppesquisar'));
        this._desenhaOrcamento = new DesenhaOrcamentoWindow($('#mini_window2'));
        
        
    }

    async getDataProduto(){
        //retorna uma lista de itens, cada item retorna: boadica, custo, datastamp, estoque, fornecedor, nome, ps_id, valor
        //valor é nulo caso seja item de boadica recém cadastrado
        const response = await fetch(`api3`);
        const data = await response.json();
        return data;
    }
    async getDataBoadica(id){
        //paramentro id é o ps_id
        //retorna item, item retorna: ender_tel, valor_medio, valores.
        //ender_tel retorna uma lista de endereços e telefones
        //cada item de ender_tel retorna endereço [0] e os telefones [1] pra cima.
        //valor_medio retorna um valor em decimal 00.00
        //valores retorna uma lista com todos os valores encontrados em ordem
        const response = await fetch(`python/${id}`);
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

   

    desenha(os){
        let awaitEquipProduto = this.getDataEquipProduto(os);
        let awaitProduto = this.getDataProduto();
        let vazio = [] //só pra testar uma parada aí.

        awaitProduto.then(pd=>{  //isso aqui tá uma zona do kralho.
            
            
            const options = {
                method: 'GET'            
            };
            fetch(`/python/${pd[1].ps_id}`, options)
            //pega o id do produto e passa como parametro de URL pro GET em app.js

            let awaitboadica = this.getDataBoadica(pd[1].ps_id);
            
            awaitboadica.then(bd =>{                
                //retorna os dados do link do boadica com base no parametro passado em produtos ali em cima,
                //o parametro de URL entra na função runpy, vai para o python que pega a url do boadica referente ao produto
                //e retorna todas as informações do site boadica em json. NEM EU TO ENTENDENDO MAIS ESSA PORRA DIREITO!
                
            })
            

            awaitEquipProduto.then(ep=>{
                this._desenhaOrcamento.formato(ep, os);
                this._desenhaOrcamento.update(ep, os);               
            })
        })

        
        
        let janela = document.querySelector('#mini_window2')
        if(janela.className == "miniwindow hidden"){            
            janela.classList.remove('hidden');
        }

    }

    goto(os){
        let ip = "192.168.2.8"
        
        let newTab = window.open(`http://${ip}/printOrcamento.html?os=${os}`)
        
    }
    fechar(buttid){
        console.log(buttid)
        let janela = document.querySelector('#mini_window2');
        let janela2 = document.querySelector('#mini_window3');
        if(buttid == 1){
            janela.classList.add('hidden');
        }
        if(buttid == 2){            
            janela2.classList.add('hidden');         
        }
        
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
            // pesquisado.setAttribute('onclick', `subwindowValores.showInfos(${ps_id})`);

            var valorado = document.querySelector(`#valor${pCount.length-1}`)            
            valorado.classList.add('valorado')
        }
        
        var pesquisa = document.createElement("input");
        pesquisa.classList.add('pesquisa');
        pesquisa.setAttribute("id", `pesquisa${pCount.length}`);
        pesquisa.setAttribute('autocomplete', 'off')
        // pesquisado.setAttribute('onclick', `subwindowValores.showInfos(${ps_id})`);

        var valor = document.createElement('input');
        valor.classList.add('valor');
        valor.setAttribute('id', `valor${pCount.length}`)
      
        var fechar = document.createElement('button');
        fechar.classList.add('fechar');
        fechar.setAttribute('id', `fechar${pCount.length}`);
        fechar.setAttribute('onclick', `subwindowValores.removerPesquisa(${pCount.length}); subwindowValores.deleteEquipProduto()`);
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
        
        pesquisa.classList.add('hidden');
        valor2.classList.add('hidden');
        fechar.classList.add('hidden');

        // let awaitEquipProduto = this.getDataEquipProduto(id);
        // awaitEquipProduto.then(ep=>{
        //     console.log(pesquisa.value)
        // })

       
    }
    deleteEquipProduto(pe_id){
        //parametro pe_id, é o id do produto embutido no produto.
        //deleta o pe_id selecionado
        let dado = {
            "pe_id": pe_id
        }
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dado)
        };
        fetch('/equipproduto', options)
        
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
    atualizarPreco(os){
        let allValor = document.querySelectorAll('.valor');
        let awaitEquipProduto = this.getDataEquipProduto(os)
        awaitEquipProduto.then(equipProduto=>{
            let listaAtualizada = []
            for(let i=0; i<allValor.length; i++){
                let valorAtual = allValor[i].value
                let idAtual = equipProduto[i].pe_id
                listaAtualizada.push([valorAtual, idAtual])
                console.log(listaAtualizada[i])
                
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(listaAtualizada[i])
                };
                fetch('/equipproduto', options)
    
            }

        })
        
        

    }
    selectPesquisa(nome, boadica, ps_id, preco){
        //var produto é a mesmíssima coisa q var pesquisa, só tem nome diferente pq eu ou retardado
        let pCount = document.querySelectorAll('.pesquisa');
        let vCount = document.querySelectorAll('.valor');

        let produto = document.querySelector(`#pesquisa${pCount.length-1}`);
        let fechar = document.querySelector(`#fechar${pCount.length-1}`)
        
        //pega o valor da OS pra atribuir ao produto, isso de jeito nenhum deveria sair do DOM, mas nois é brasileiro.
        let osV = document.querySelector('#os2').textContent 
        
        
        produto.classList.add('pesquisado');
        produto.setAttribute('readonly', 'true');
        produto.setAttribute('onclick', `subwindowValores.showInfos(${ps_id})`);
        
        

        let lastInput = pCount.length - 1
        pCount[lastInput].value = nome

        let valor = document.querySelector(`#valor${lastInput}`)
        valor.value = preco

        this.divLista.classList.add('hidden')

        let awaitBoadica = this.getDataBoadica(ps_id)
        let awaitProduto = this.getDataProduto()
        

        
        
        awaitProduto.then(produtos=>{
            let tipo = 'foda-se'

            for(let o=0; o<produtos.length; o++){
                let produto = produtos[o];
                if(produto.ps_id == ps_id){
                    tipo = produto.tipo                    
                }
                
            }
            const dados = this._montarEquipProduto(osV, ps_id, nome, valor.value, tipo).data
            
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            };
            fetch('/equipproduto', options)

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
            
        })
                          
    }
    _montarEquipProduto(os, ps_id, nome, valor, tipo){
        return new FormularioEquipProduto(
            os,
            ps_id,
            nome,
            valor,
            tipo
        )
    }

    showInfos(id){
        
        let _desenhaEnderBoadica = new DesenhaOrcamentoEnder(document.querySelector('#window_boadica'))
      
        let awaitBoadica = this.getDataBoadica(id)
        
        awaitBoadica.then(bd=>{
            console.log("id")
            _desenhaEnderBoadica.formato(bd)
            _desenhaEnderBoadica.update(bd)
                               
        })

    }
        
        
}