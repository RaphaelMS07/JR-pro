class Formulario{
    constructor(nome, telefone, email, ender){
        this._nome = nome;
        this._telefone = telefone;
        this._email = email;
        this._ender = ender;
    }
    get data(){
        return {
            nome: this._nome,
            telefone: this._telefone,
            email: this._email,
            endereco: this._ender
        }
    
    }
}