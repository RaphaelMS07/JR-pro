//sobre pesquisa equipamento
var planoFundo = document.querySelector('#corpo');

var formPesquisa1 = document.querySelector("#form_pesquisa");
var image1 = document.querySelector("#pesquisa_ico");
var input1 = document.querySelector("#pesquisa_geral");
var tipoPesquisa1 = document.querySelector('#tipo_pesquisa1');
var legenda1 = document.querySelector('#legenda1');
var optPesquisa1 = document.querySelector('#opt_pesquisa1')

var controller = true;
formPesquisa1.addEventListener('mouseenter', ()=>{

    if(controller){
        semiTrans(formPesquisa1, image1, tipoPesquisa1, 1)
    }    
    
    formPesquisa1.addEventListener('click', ()=>{
        completeForm(formPesquisa1, tipoPesquisa1, input1, legenda1, optPesquisa1, image1, 1);
        controller = false;   
    })  
})

formPesquisa1.addEventListener('mouseleave', ()=>{        
    if(controller){
        unTrans(formPesquisa1, tipoPesquisa1, input1, legenda1, optPesquisa1, image1, 1)
    }
})
planoFundo.addEventListener('click', event=>{
    if (event.currentTarget !== event.target) {
        return;       
    }else{
        unTrans(formPesquisa1, tipoPesquisa1, input1, legenda1, optPesquisa1, image1, 1)
        controller = true
    }
        
})


function setLists(index){
    if(index == 1){
        lista = {domGridForm: 'grid_form',
                 domUntranform: 'untransform',
                 domSemitransform: 'semitransform'}
        return lista;
    }
    if(index == 2){
        lista = {domGridForm: 'grid_form2',
                 domUntranform: 'untransform2',
                 domSemitransform: 'semitransform2'}
        return lista;
    }
    if(index == 3){
        lista = {domGridForm: 'grid_form3',
                 domUntranform: 'untransform3',
                 domSemitransform: 'semitransform3'}
        return lista;
    }else{
        throw console.error('index precisa ser de 1 a 3');        
    }
}

function semiTrans(form, img, tipo, setList){
    lista = setLists(setList);

    form.classList.remove(lista.domForm);
    form.classList.remove(lista.domUntranform);
    form.classList.add(lista.domSemitransform); 

    img.classList.add('invisivel');
    setTimeout(() => {
        img.classList.add('hidden');
        tipo.classList.remove("hidden");        
    }, 200);
}

function completeForm(form, tipo, input, legenda, opt, img, setList){
      
    if(setList == 1){
        setTimeout(() => {           
            input.classList.remove('hidden');            
            opt.classList.remove('hidden');
        }, 200);
    }
    if(setList == 2){
        return
    }
    if(setList == 3){
        return
    }
       
    let lista = setLists(setList)
    form.classList.remove(lista.domUntranform);
    form.classList.remove(lista.domSemitransform);
    form.classList.add(lista.domGridForm);
    img.classList.add('hidden');
    img.classList.add('invisivel');

    setTimeout(() => {
        tipo.classList.add('hidden');            
        legenda.classList.remove('hidden');            
    }, 200);   
}

function unTrans(form, tipo, input, legenda, opt, img, setList){
    let lista = setLists(setList)
    
    form.classList.remove(lista.domGridForm);
    form.classList.remove(lista.domSemitransform);
    form.classList.add(lista.domUntranform);

    tipo.classList.add('hidden');
    input.classList.add('hidden');
    // legenda.classList.remove('legenda');
    legenda.classList.add('hidden');    
    opt.classList.add('hidden');

    img.classList.remove('hidden');
    img.classList.remove('invisivel');    
}
