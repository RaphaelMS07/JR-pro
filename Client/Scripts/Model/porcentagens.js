class Porcentualizador{
    constructor(){

    }

    static limitadores3(variavel, lim1, lim2, lim3, perc1, perc2, perc3, perc4){
        if(variavel <= lim1){
            return perc1
        }
        if(variavel > lim1 && variavel <= lim2){
            return perc2
        }
        if(variavel > lim2 && variavel <= lim3){
            return perc3
        }
        if(variavel > lim3){
            return perc4
        }
    }
}
//em construção.