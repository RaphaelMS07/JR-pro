//form1
var formClie = document.querySelector(".form1");
var boxClie = document.querySelectorAll(".caixa_texto");
var legendClie = document.querySelectorAll(".legenda");
var fechadura1 = document.querySelector('.fechar1');
var bordador1 = document.querySelector('.borderer');
var cadastrar1 = document.querySelector('.butt_azul');
var formNome = document.querySelector('#nome2');

function semiTransForm(){    
    formClie.classList.add("form1-semiativado");
    
}

function showInside(){
    for(i=0; i<boxClie.length; i++){
        boxClie[i].classList.remove("caixa_texto");
        boxClie[i].classList.add("caixa_texto-ativado");
    }
    for(i=0; i<legendClie.length; i++){
        legendClie[i].classList.remove("legenda");
        legendClie[i].classList.add("legenda-ativado");
        
    }
    fechadura1.classList.remove('hidden');
    bordador1.classList.add('hidden');
    cadastrar1.classList.remove('hidden')   
}

function unTransForm(){ 
    if (boxClie[0].className != "caixa_texto-ativado"){
        formClie.classList.remove("form1-semiativado");   
        formClie.classList.add("form1");
    }            
}

function unTransFormAbsolute(){
    formClie.classList.remove("form1-semiativado");   
    formClie.classList.add("form1");
    fechadura1.classList.add('hidden');
    bordador1.classList.remove('hidden');
    cadastrar1.classList.add('hidden')

    for(i=0; i<boxClie.length; i++){
        boxClie[i].classList.remove("caixa_texto-ativado");
        boxClie[i].classList.add("caixa_texto");
    }
    for(i=0; i<legendClie.length; i++){
        legendClie[i].classList.remove("legenda-ativado");
        legendClie[i].classList.add("legenda");        
    }       
}

formClie.addEventListener('click', showInside);
fechadura1.addEventListener('click', unTransFormAbsolute);

formClie.addEventListener('mouseenter', function(){
    formClie.classList.remove('form1')
    formClie.classList.add("form1-semiativado");
    
    formClie.addEventListener('click', function(){
        for(i=0; i<boxClie.length; i++){
            boxClie[i].classList.remove("caixa_texto");
            boxClie[i].classList.add("caixa_texto-ativado");           
        }                
        formClie.addEventListener('mouseleave', function(){
            formClie.classList.add("form1-semiativado");          
        });
    })      
    if(boxClie[0].className == "caixa_texto radius" || boxClie[0].className =="radius caixa_texto"){
        formClie.addEventListener('mouseleave', function(){
            formClie.classList.remove("form1-semiativado");
            formClie.classList.add("form1");  
                      
        });        
    }else{
        formClie.addEventListener('mouseleave', function(){
            formClie.classList.remove("form1");
            formClie.classList.add("form1-semiativado");   
            
            
        });
    }
})

//form2
var formEquip = document.querySelector(".form2");
var boxEquip = document.querySelectorAll(".caixa_texto2");
var legendEquip = document.querySelectorAll(".legenda2");
var checkEquip = document.querySelector(".checkbox_retorno")
var fechadura2 = document.querySelector('.fechar2');
var subDiv = document.querySelector('.sub_div')




function semiTransForm2(){    
    formEquip.classList.add("form2-semiativado");    
}

showInside2 = function(){
    checkEquip.classList.add("checkbox_retorno-ativado");
    fechadura2.classList.remove('hidden');
    subDiv.classList.remove('hidden');
    bordador1.classList.add('hidden');

    for(i=0; i<boxEquip.length; i++){
        boxEquip[i].classList.remove("caixa_texto2");
        boxEquip[i].classList.add("caixa_texto2-ativado");        
    }
    for(i=0; i<legendEquip.length; i++){
        legendEquip[i].classList.remove('legenda2');
        legendEquip[i].classList.add("legenda2-ativado");
        
    }    
}

function unTransForm2(){   
    if(boxEquip[0].className != 'caixa_texto2-ativado'){
        formEquip.classList.remove("form2-semiativado");    
        formEquip.classList.add("form2");
    }      
}

function unTransFormAbsolute2(){
    for(i=0; i<boxEquip.length; i++){
        boxEquip[i].classList.remove("caixa_texto2-ativado");
        boxEquip[i].classList.add("caixa_texto2");
    }
    for(i=0; i<legendEquip.length; i++){
        legendEquip[i].classList.remove("legenda2-ativado");
        legendEquip[i].classList.add("legenda2");
    }

    formEquip.classList.remove("form2-semiativado");   
    formEquip.classList.add("form2");
    checkEquip.classList.remove('checkbox_retorno-ativado');
    checkEquip.classList.add('checkbox_retorno');
    fechadura2.classList.add('hidden');
    subDiv.classList.add('hidden');
    bordador1.classList.remove('hidden');       
}

formEquip.addEventListener('click', showInside2);
fechadura2.addEventListener('click', unTransFormAbsolute2)

formEquip.addEventListener('mouseenter', function(){
    formEquip.classList.remove('form2')
    formEquip.classList.add("form2-semiativado");
    
    formEquip.addEventListener('click', function(){
        for(i=0; i<boxEquip.length; i++){
            boxEquip[i].classList.remove("caixa_texto2");
            boxEquip[i].classList.add("caixa_texto2-ativado");          
        }
                
        formEquip.addEventListener('mouseleave', function(){
            formEquip.classList.add("form2-semiativado");           
        });
    })      
    if(boxEquip[0].className == "caixa_texto2 radius" || boxEquip[0].className =="radius caixa_texto2"){
        formEquip.addEventListener('mouseleave', function(){
            formEquip.classList.remove("form2-semiativado");
            formEquip.classList.add("form2");  
                     
        });
        
    }else{
        formEquip.addEventListener('mouseleave', function(){
            formEquip.classList.remove("form2");
            formEquip.classList.add("form2-semiativado");           
        });
    }
})

//interações entre form1 e form2
var buttSubmit1 = document.querySelector('#submeter')

buttSubmit1.addEventListener('click', semiTransForm2)
buttSubmit1.addEventListener('click', showInside2)
