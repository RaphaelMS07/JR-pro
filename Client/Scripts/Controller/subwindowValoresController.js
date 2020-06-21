class SubwindowValoresContoller{
    constructor(id){
        let $ = document.querySelector.bind(document);
        let $A = document.querySelectorAll.bind(document);
        this._id = id;

        this._elemento2 = $('.add_produto');
        this._allItens = $('.item_pesquisa');
        this._inputPesquisa = $A('.pesquisado');
        this.divLista = $('#dppesquisar')
        this._desenhaPesquisa = new DesenhaPesquisa($('#dppesquisar'));
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

    desenha(idProduto){
        let awaitProduto = this.getDataProduto(idProduto)
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
    desenhaLista(){
      
        let pCount = document.querySelectorAll('.pesquisa');  //conta a quantidade de itens pesquisa pra gerar um novo id pro item
        
        //essa parte faz com que o vizinho de cima mude alguns atributos.     
        if(pCount.length > 0){
            console.log(pCount.length-1)
            var pesquisado = document.querySelector(`#pesquisa${pCount.length-1}`)
            pesquisado.setAttribute('readonly', 'true') 
            pesquisado.classList.add('pesquisado')
        }

        for(let i=0; i<pCount.length; i++){
            
        }
    
              
        var pesquisa = document.createElement("input");
        pesquisa.classList.add('pesquisa');
        pesquisa.setAttribute("id", `pesquisa${pCount.length}`);
        pesquisa.setAttribute('autocomplete', 'off')
        

        var fechar = document.createElement('button');
        fechar.classList.add('fechar');
        fechar.setAttribute('id', `fechar${pCount.length}`);
        fechar.setAttribute('onclick', `subwindowValores.removerPesquisa(${pCount.length})`);
        var tfechar = document.createTextNode('X');
        fechar.appendChild(tfechar);

        
        this._elemento2.appendChild(pesquisa);
        this._elemento2.appendChild(fechar)

        this.pesquisar(pCount.length)

        
    }
    removerPesquisa(id){
        
        let pesquisa = document.getElementById(`pesquisa${id}`);
        let fechar = document.getElementById(`fechar${id}`);
        // console.log(fechar)
        pesquisa.parentNode.removeChild(pesquisa);        
        fechar.parentNode.removeChild(fechar);
        
    }
    pesquisar(inputID){
        
        
        let awaitProduto = this.getDataProduto()
        
        awaitProduto.then(produtos=>{
            
            this._desenhaPesquisa.formato(produtos)
            this._desenhaPesquisa.update(produtos)

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
    selectPesquisa(nome, boadica, id){
        let pCount = document.querySelectorAll('.pesquisa');
        let produto = document.querySelector(`#pesquisa${pCount.length-1}`);
        produto.classList.add('pesquisado');
        produto.setAttribute('readonly', 'true');
        

        let lastInput = pCount.length - 1
        pCount[lastInput].value = nome

        this.divLista.classList.add('hidden')
        
        let somadorTotal = 0;
        
        let awaitBoadica = this.getDataBoadica(id)
        awaitBoadica.then(bd=>{      
            console.log(bd)      
            for(let i=0; i<pCount; l++){
                
            }            
        })
       
        
    }
        
        
}