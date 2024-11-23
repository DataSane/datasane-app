const express = require('express');
const router = express.Router();

// Rota raiz dentro do grupo /dashboard
router.get('/', async function(req, res) {
    if (req.session.authenticated) {

        res.render('municipios', {
            userid: req.session.user.session_userid,
            isadmin: req.session.user.session_isadmin
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
});

// Rota raiz dentro do grupo /dashboard
router.get('/mapa', async function(req, res) {
    if (req.session.authenticated) {

        res.render('mapa', {
            userid: req.session.user.session_userid,
            isadmin: req.session.user.session_isadmin
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
});


// Rota raiz dentro do grupo /dashboard
router.get('/comparativa', async function(req, res) {
    if (req.session.authenticated) {

        res.render('comparativa', {
            userid: req.session.user.session_userid,
            isadmin: req.session.user.session_isadmin
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
});

router.get('/comparativa/resultados', async function(req, res) {
    if (!req.session.authenticated) {
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!';
        return res.redirect('/');
    }

    const id1 = req.query.id1;
    const id2 = req.query.id2;

    if (!id1 || !id2) {
        req.session.hasError = true;
        req.session.errorMessage = 'IDs dos municípios são necessários!';
        return res.redirect('/municipios/comparativa');
    }

    res.render('comparativaResultados', {
        userid: req.session.user.session_userid,
        isadmin: req.session.user.session_isadmin,
        municipio1Id: id1,
        municipio2Id: id2
    });
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