const express = require('express');
const router = express.Router();

// Rota raiz dentro do grupo /dashboard
router.get('/', async function(req, res) {
    if (req.session.authenticated) {

        res.render('dashboard', {
            userid: req.session.user.session_userid,
            isadmin: req.session.user.session_isadmin
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!';
        res.redirect('/');
    }
});

module.exports = router;