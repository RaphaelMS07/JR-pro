class ListaController{
    constructor(){
        let $ = document.querySelector.bind(document)
        
        this._clientes = [];
        this._equipamentos = [];
        this._desenhador = new TabelaDesenhador($('#listaClientes'))
        this._listaConvertida = new Converter()        
    }
    
    sortTable(index) {
        
        let headers = document.getElementsByTagName('th')
        
        for(let n=0; n<headers.length; n++){
            let head = headers[n]
            head.classList.remove('selecionado')          
        }
        headers[index].classList.add('selecionado')

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("listaClientes");
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("td")[index];
                y = rows[i + 1].getElementsByTagName("td")[index];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;      
                } else {
                    /*If no switching has been done AND the direction is "asc",
                    set the direction to "desc" and run the while loop again.*/
                    if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                }
            }
        }        
    }    

    desenha(){
        var awaitClie = this.getDataCliente()
        var awaitEquip = this.getDataEquip()
        awaitClie.then(datas => {            
            datas.forEach(data => {
                this._clientes.push(data);                
            })               
            awaitEquip.then(datas => {
                datas.forEach(data => {
                    this._equipamentos.push(data)
                })
                var newData = this._listaConvertida.conversor(this._clientes, this._equipamentos)
                    
                this._desenhador.formato(newData) //caso n haja nenhum retirado, renderizar antes,   
                this._desenhador.update(newData)

                for(let i = 0; i<(newData.length); i++){ 
                                   
                    
                    if(newData[i].status == "Retirado"){                                             
                        newData.splice(i, 1);
                        i-- // pra controlar o tamanho da lista e deixar o looping ser completo                        
                        this._desenhador.formato(newData)    
                        this._desenhador.update(newData)                       
                    }
                    
                }                                                                
            })
        })                
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
}
