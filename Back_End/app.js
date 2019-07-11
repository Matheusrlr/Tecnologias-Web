var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CadastroSchema = new Schema({
 cpf: String,
 email: String,
 nome: String,
 login : String,
 senha : String
});

module.exports = mongoose.model('Usuario', CadastroSchema);