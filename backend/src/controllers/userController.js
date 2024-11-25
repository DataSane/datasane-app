var userModel = require('../models/userModel');

function login(req,res){
    var email = req.body.email;
    var senha = req.body.senha;
    
    userModel.authLogin(email, senha)
    .then((resultadoQuery) => {
      if (resultadoQuery.success) {
        req.session.authenticated = true;

        req.session.user = {
          session_userid: resultadoQuery.bd_userid,
          session_isadmin: resultadoQuery.bd_isadmin,
          session_username: resultadoQuery.bd_username
        };

        res.redirect('/dashboard');
        
      } else {
        req.session.authenticated = false;
        req.session.hasError = true;
        req.session.errorMessage = 'Usuário ou senha incorreta. Tente novamente!';
        
        res.redirect('/');
      }
    })
    .catch((error) => {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ mensagem: 'Erro interno no servidor. Tente novamente mais tarde.' });
    });
}

function getAllUser(req, res){
    
  userModel.getAllUser()
    .then(resposta => {
        res.status(200).json(resposta)
    }).catch(err => {
      res.status(500)
      console.log("Erro controller")
    })
}

function addUser(req, res){
  const name = req.body.userName;
  const email = req.body.email;
  const senha = req.body.senha;
  const confSenha = req.body.confSenha;
  const acesso = req.body.acesso;
    
  userModel.addUser(name, email, senha, confSenha, acesso)
    .then(resposta => {
        res.status(200).json(resposta)
    }).catch(err => {
      res.status(500)
      console.log("Erro controller")
    })
}
function addUser(req, res){
  const name = req.body.userName;
  const email = req.body.email;
  const senha = req.body.senha;
  const confSenha = req.body.confSenha;
  const acesso = req.body.acesso;
    
  userModel.addUser(name, email, senha, confSenha, acesso)
    .then(resposta => {
        res.status(200).json(resposta)
    }).catch(err => {
      res.status(500)
      console.log("Erro controller")
    })
}

function updateUser(req, res){
  const idUser = req.params.idUser
  const name = req.body.userName;
  const email = req.body.email;
  const senha = req.body.senha;
  const confSenha = req.body.confSenha;
  const acesso = req.body.acesso;
    
  userModel.updateUser(idUser, name, email, senha, confSenha, acesso)
    .then(resposta => {
        res.status(200).json(resposta)
    }).catch(err => {
      res.status(500)
      console.log("Erro controller")
    })
}

function deleteUser(req, res){
  const idUser = req.body.idUser
    
  userModel.deleteUser(idUser)
    .then(resposta => {
        res.status(200).json(resposta)
    }).catch(err => {
      res.status(500)
      console.log("Erro controller")
    })
}

function getUserWithId(req, res){
  const idUser = req.params.idUser
    
  userModel.getUserWithId(idUser)
    .then(resposta => {
        res.status(200).json(resposta)
    }).catch(err => {
      res.status(500)
      console.log("Erro controller")
    })
}

 
module.exports = {
    login,
    getAllUser,
    addUser,
    deleteUser,
    getUserWithId,
    updateUser
}