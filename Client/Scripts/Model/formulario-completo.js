class FormularioCompleto{
    constructor(nome, telefone, id, modelo, serial, def_alegado, obs){
        this._nome = nome;
        this._telefone = telefone;
        this._id = id;
        this._modelo = modelo;
        this._serial = serial;
        this._def_alegado = def_alegado,
        this._obs = obs;
    }
    get data(){
        return {
            nome:           this._nome,
            telefone:       this._telefone,
            id:             this._id,
            modelo:         this._modelo,
            serial:         this._serial,
            def_alegado:    this._def_alegado,
            obs:            this._obs
        }
    }
}