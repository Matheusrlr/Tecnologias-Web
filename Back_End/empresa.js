var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CadastroSchema = new Schema({
 cnpj: String,
 email: String,
 nome: String,
 login: String,
 senha : String
});

module.exports = mongoose.model('Empresa', CadastroSchema);