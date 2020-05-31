class Converter{

    conversor (data1, data2){
        let lista_convertida = [];
        for (let i=0; i < data1.length; i++){
            
            for (let i2=0; i2 < data2.length; i2++){
                if(data1[i].id == data2[i2].cliente_id){
                    lista_convertida.push({
                        cliente_id: data1[i].nome,
                        cliente_nome: data1[i].nome, //é redundante, mas qm sabe né? pode ser útil, sei lá...
                        cliente_email: data1[i].email,
                        cliente_telefone: data1[i].telefone,
                        cliente_ender: data1[i].endereco,
                        cliente_datastamp: data1[i].datastamp,

                        os: data2[i2].os,
                        modelo: data2[i2].modelo,
                        serial: data2[i2].serial,
                        def_alegado: data2[i2].def_alegado,
                        status: data2[i2].status,
                        orcamento: data2[i2].orcamento,
                        datastamp: data2[i2].datastamp,
                        id: data2[i2].cliente_id,
                        obs: data2[i2].obs
                    })
                }                
            }
        }
        
        return lista_convertida
    }
}