var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Usuario = require('./app');
var Empresa = require('./empresa');
var Festa = require('./festa');
var port = 5000;

var db = 'mongodb://localhost/Ingressos';
mongoose.connect(db,{ useNewUrlParser: true } );

var jwt = require('jsonwebtoken');

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended:true
}));



app.post('/login', function(req, res) {
    var login = req.body.login;
    var senha = req.body.senha;
   // console.log ("PPP",req.body);
    Usuario.findOne(
        {login:login},
        req.body,
    function(err,usuario){
        if(err){
        res.send('Erro ao buscar Usuário');
        console.log ('Ocorreu um problema',err);
        }else{
            
            console.log("Usuarios");
            //res.json(usuario);
            if(usuario!=null){
                if (usuario.senha == senha){
                    var token = jwt.sign({ id: usuario._id }, 'supersecret', {
                            expiresIn: 86400
                        });

                    res.status(200).send({ token: token, tipo: 'usuario' });    
                    
                }
            }
         else {
            return res.status(401).send({ token: null, tipo: null });
        }
        }
    });
});
    





// CRUD cadastro de usuários
app.get('/usuario', function(req,res){
    console.log('200');
    Usuario.find({},function(err,Usuarios){
        if(err){
        res.send('Um erro ocorreu');
        console.log ('Ocorreu um problema',err);
    }else{
        console.log("Usuarios");
        res.json(Usuarios);
    }
    });
});

app.get('/usuario/:cpf', function(req,res){
   // console.log('201');
    Usuario.findOne(
        {cpf:req.params.cpf},
        req.body,
    function(err,Usuario){
        if(err){
        res.send('Erro ao buscar Usuário');
        console.log ('Ocorreu um problema',err);
        }else{
            console.log("Usuarios");
            res.json(Usuario);
        }
    });
});

app.post('/usuario',  function(req,res){

    var newUsuario = new Usuario();

    newUsuario.cpf = req.body.cpf;
    newUsuario.email = req.body.email;
    newUsuario.nome = req.body.nome;
    newUsuario.login = req.body.login;
    newUsuario.senha = req.body.senha;

    newUsuario.save(function(err,Usuario){
        if(err){
            res.send('Erro em salvar o usuario');
            console.log ('Ocorreu um problema',err);
        }else{
            console.log("Usuario");
            res.send("Cadastrado com Sucesso");
        }
    });
});



app.put('/usuario', function(req,res){
    Usuario.findOneAndUpdate(
        {cpf:req.body.cpf},
        req.body,
        {new:true},
    function(err, Usuario)  {
        if(err){
            console.log ("Ocorreu um erro",err);
            res.send(JSON.stringify('Um erro ocorreu'));
        }else{
            console.log("newUsuario");
           ///res.status(204);
            res.send(JSON.stringify("Alterado com sucesso"));

        }
        });
});

app.delete('/usuario/:cpf', function(req,res){
    Usuario.findOneAndRemove({
        cpf: req.params.cpf,
    },function(err, Usuario){
            if(err){
                res.send('Erro ao deletar');
                console.log ('Ocorreu um problema',err);
            }else{
                //console.log(look);
                res.send("Deletado com sucesso");
        }
    });
});




//CRUD Empresa

app.get('/empresa',  function(req,res){
    console.log('200');
    Empresa.find({},function(err,Empresas){
        if(err){
        res.send('Um erro ocorreu');
        
    }else{
        console.log(Empresas);
        res.json(Empresas);
    }
    });
});

app.get('/empresa/:cnpj', function(req,res){
    //console.log('201');
    Empresa.findOne(
        {cnpj:req.params.cnpj},
        req.body,
        function(err,Empresa){
        if(err){
        res.send('Um erro ocorreu');
        }else{
            console.log('Empresas');
            res.json(Empresa);
        }
    });
});

app.post('/empresa', function(req,res){

    var newEmpresa = new Empresa();

    newEmpresa.cnpj = req.body.cnpj;
    newEmpresa.email = req.body.email;
    newEmpresa.nome = req.body.nome;
    newEmpresa.login = req.body.login;
    newEmpresa.senha = req.body.senha;

    newEmpresa.save(function(err,Empresa){
        if(err){
            res.send('Erro em salvar a empresa');
        }else{
            console.log('Empresa');
            res.send('Cadastrado com Sucesso');
        }
    });
});


app.put('/empresa',  function(req,res){
    Empresa.findOneAndUpdate(
       { cnpj:req.body.cnpj},
        req.body,
        {new:true},
    function(err, empresa){
        if(err){
            console.log (JSON.stringify('Ocorreu um erro',err));
            res.send ("Ocorreu um erro")
        }else{
           
            //res.status(204);
            res.send (JSON.stringify("Alterado com sucesso"));

        }
        });
});

app.delete('/empresa/:cnpj', function(req,res){
    Empresa.findOneAndRemove({
        cnpj: req.params.cnpj,
    },function(err, Empresa){
            if(err){
                res.send('Erro ao deletar');
                console.log ('Ocorreu um erro',err);
            }else{
               // console.log(look);
               // res.status(204);
                res.send("Deletado com sucesso");
        }
    });
});




//  CRUD das Festas
app.get('/festa', function(req,res){
    console.log('200');
    Festa.find({},function(err,Festas){
        if(err){
        res.send('Um erro ocorreu');
        console.log ('Ocorreu um erro',err);
    }else{
        console.log('Festa');
        res.json(Festas);
    }
    });
});
// Da uma olhada depois por causa do parametro id
app.get('/festa/:id', function(req,res){
    //console.log('201');
    Festa.findOne(
        {nome:req.params.nome},
        req.body,
    function(err,Festa){
        if(err){
        res.send('Não existe uma festa com esse nome');
        console.log ('Ocorreu um erro',err);
        }else{
            console.log(Festa);
            res.json(Festa);
        }
    });
});

app.post('/festa', function(req,res){

    var newFesta = new Festa();

    newFesta.valor = req.body.valor;
    newFesta.data = req.body.data;
    newFesta.nome = req.body.nome;
    newFesta.quantidade_ingressos = req.body.quantidade_ingressos;
    newFesta.tipo = req.body.tipo;
    newFesta.horario = req.body.horario;

    newFesta.save(function(err,Festa){
        if(err){
            res.send('Erro em salvar a festa');
            console.log ('Ocorreu um erro',err);
            
        }else{
            console.log('Festa');
            res.send('Cadastrado com Sucesso');
        }
    });
});



app.put('/festa', function(req,res){
    Festa.findOneAndUpdate(
        {nome:req.body.nome},
        req.body,
        {new:true},
    function(err, Festa){
        if(err){
            console.log (JSON.stringify("newFesta",err));
            res.send ("Ocorreu um problema");
        }else{
            //console.log(newFesta);
            res.send (JSON.stringify("Alterado com sucesso"));

        }
     });
});

app.delete('/festa/:nome', function(req,res){
    Festa.findOneAndRemove({
        nome: req.params.nome
    },function(err, Festa){
            if(err){
                res.send('Erro ao deletar');
                console.log ('Ocorreu um erro',err);
            }else{
               // console.log(look);
               res.send("Deletado com sucesso");
        }
    });
});


app.listen(port,function(){
    console.log('app na porta: \n' + port);


});