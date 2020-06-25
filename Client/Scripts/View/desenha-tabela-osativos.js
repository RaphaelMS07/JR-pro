class TabelaDesenhador extends Desenhador{
    constructor(elemento){
        super(elemento)
        this.converter = new Converter()
    }    
   
    formato(model){   
 
        return `
                    <thead>
                        <tr>
                            <th class="cabecalho2 ponta_esquerda" onclick="listaController.sortTable(0)"></th>
                            <th class="cabecalho2" onclick="listaController.sortTable(1)">Cliente</th>
                            <th class="cabecalho2" onclick="listaController.sortTable(2)">OS</th>
                            <th class="cabecalho2" onclick="listaController.sortTable(3)">Modelo</th>
                            <th class="cabecalho2 hidden" onclick="listaController.sortTable(4)">N° Serial</th>
                            <th class="cabecalho2" onclick="listaController.sortTable(5)">Defeito</th>
                            <th class="cabecalho2" onclick="listaController.sortTable(6)">status</th>
                            <th class="cabecalho2" onclick="listaController.sortTable(7)">Data de entrada</th>
                            <th class="cabecalho2  ponta_direita" onclick="listaController.sortTable(0)"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${model.map(n => `
                                                    
                            <tr id="${n.os}"class="linha" onclick="subwindowController.desenha('${n.os}')">
                                <td id="st" class="itens ${n.status} nano"> </td>
                                <td id="cliente_id" class="itens grande">${n.cliente_id}</td>
                                <td id="os" class="itens micro">${n.os}</td>
                                <td id="modelo" class="itens medio">${n.modelo}</td>
                                <td id="serial" class="itens medio hidden">${n.serial}</td>
                                <td id="def_alegado" class="itens macro">${n.def_alegado}</td>
                                <td id="status" class="itens pequeno">${n.status}</td>
                                <td id="data" class="itens pequeno">${DateHelper.datastampParaData(n.datastamp)}</td>
                                <td id="num_id" class="hidden">${n.id}</td>
                                <td id="st" class="itens ${n.status} nano"> </td>                                
                            </tr>
                            
                        `).join('')}                
                    </tbody>               
                `
    }
    
}

