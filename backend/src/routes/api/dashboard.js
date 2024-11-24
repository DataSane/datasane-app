const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');

router.post('/', (req, res) => {
    dashboardController.getMunicipiosMaisCriticos(req, res);
})

// router.get('/', async (req, res) => {
//     const categoriaSaneamento = req.query.categoriaSaneamento;
//     const porteMunicipio = req.query.porteMunicipio;
//     const menosOuMaisAfetado = req.query.menosOuMaisAfetado;

//     var maisCriticosSemAgua = await dashboardController.getMunicipiosMaisCriticos(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, 5);

//     const responseObj = {
//         semAgua: JSON.parse(maisCriticosSemAgua)
//     }

//     // const responseObj = {
//     //     semAgua: {
//     //         maisAfetadosSemAguaGeral: JSON.parse(maisCriticosSemAguaGeral),
//     //         maisAfetadosSemAguaPequeno: JSON.parse(maisCriticosSemAguaPequeno),
//     //         maisAfetadosSemAguaMedio: JSON.parse(maisCriticosSemAguaMedio),
//     //         maisAfetadosSemAguaGrande: JSON.parse(maisCriticosSemAguaGrande),
//     //     }
//     // }

//     res.json(responseObj);
// })

module.exports = router;