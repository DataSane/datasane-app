const express = require('express');
const router = express.Router();

// Rota raiz dentro do grupo /dashboard
router.get('/', async function(req, res) {
    if (req.session.authenticated) {

        res.render('analistas', {
            userid: req.session.user.session_userid,
            isadmin: req.session.user.session_isadmin,
            username: req.session.user.session_username
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
});

// Rota raiz dentro do grupo /dashboard
router.get('/iframe', (req, res) =>{
    if (req.session.authenticated) {

        let hasError = false;
        let errorMessage = '';

        let hasBeenRegistered = false;

        if(req.session.hasError){
            hasError = true;
            errorMessage = req.session.errorMessage;

            delete req.session.hasError;
            delete req.session.errorMessage;
        }

        if(req.session.hasBeenRegistered){
            hasBeenRegistered = true;
            delete req.session.hasBeenRegistered
        }
        
        // dados do usuário
        const user = req.session.user;
        res.render('analistasIframe', {
            userId: user.session_userId,
            hasError: hasError,
            errorMessage: errorMessage,
            hasBeenRegistered: hasBeenRegistered
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes para registrar monitores!'
        res.redirect('/');
    }
});

// router.get('/fazenda/:fazendaId', function(req, res){
//     if (req.session.authenticated) {

//         // dados do usuário
//         const user = req.session.user;
//         const fazendaId = req.params.fazendaId
        
//         res.render('fazenda', {
//             userId: user.session_userId,
//             userName: user.session_userName,
//             userEmail: user.session_userEmail,
//             fazendaId: fazendaId
//         });

//     }else{
//         req.session.hasError = true;
//         req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
//         res.redirect('/');
//     }
// })

module.exports = router;