const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', (req, res) => {
});

router.post('/login', userController.login);

// router.get('/:id', (req, res) => {
//     res.json({ id: req.params.id, nome: 'João' });
// });

router.get('/me', (req, res) => {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({
            authenticated: false,
            message: 'Usuário não autenticado.'
        });
    }
});


module.exports = router;