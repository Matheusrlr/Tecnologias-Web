var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CadastroSchema = new Schema({
 valor : String,
 data : String,
 quantidade_ingressos: String,
 nome: String,
 tipo: String,
 horario: String
});

module.exports = mongoose.model('Festa', CadastroSchema);