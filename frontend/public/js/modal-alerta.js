var modalAlerta = document.querySelector("#modalAlerta");
var buttonAdd = document.querySelector("#buttonAdd");

// alterna a visibilidade do modal

async function fetchAndRenderMunicipios() {
    try {
        const response = await fetch(`${actualIP}/api/municipios`);
        if (!response.ok) {
            throw new Error('Error in getMunicipios');
        }
        const municipios = await response.json();
        renderMunicipiosInDatalists(municipios);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function renderMunicipiosInDatalists(municipios) {
    const datalist1 = document.getElementById('municipio1');

    municipios.forEach(municipio => {
        const option1 = document.createElement('option');
        option1.value = municipio.nome; 
        option1.dataset.id = municipio.idMunicipio; 

        const option2 = document.createElement('option');
        option2.value = municipio.nome;
        option2.dataset.id = municipio.idMunicipio;

        datalist1.appendChild(option1);
    });
}

function getSelectedMunicipioId(inputElement, datalistId) {
    const datalist = document.getElementById(datalistId);
    const selectedOption = Array.from(datalist.options).find(option => option.value === inputElement.value);
    return selectedOption ? selectedOption.dataset.id : null;
}

function toggleModal() {
    fetchAndRenderMunicipios();
    modalAlerta.classList.toggle("visible")
    modalAlerta.innerHTML = `
    <div class="modal-content">
                <div class="close-icon">
                    <i class="fa-solid fa-x" id="closeButton"></i>
                </div>
                <h2>Adicionar Alerta</h2>
                <div class="form-alerta" id="formAlerta">
                    <p>Município</p>
                    <div class="input-pesquisa">
                        <input list="municipio1" id="input_municipio" type="text" placeholder="Pesquise um município...">
                        <datalist id="municipio1">
                                <!-- Options will be populated here -->
                            </datalist>  
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <p>Descrição</p>
                    <textarea name="" id="desc_value" rows="15" cols="70" placeholder="Descreva o problema..."></textarea>
                    <button onclick="adicionarAlerta()" class="btn-form-alerta confirm">Adicionar</button>
                    <button onclick="toggleModal()" class="btn-form-alerta">Cancelar</button>
                </div>
            </div>
    `;
}

function toggleModalEdit(idAlerta) {
    fetchAndRenderMunicipios();
    modalAlerta.classList.toggle("visible")
    fetch(`${actualIP}/api/alertas/${idAlerta}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Error in getAlertas');
            }
            response.json().then(resposta => {
                const alerta = resposta[0];
                console.log(alerta)

                modalAlerta.innerHTML = `
            <div class="modal-content">
                <div class="close-icon">
                    <i class="fa-solid fa-x" id="closeButton"></i>
                </div>
                <h2>Editar alerta</h2>
                <div class="form-alerta" action="" id="formAlerta">
                    <p>Município</p>
                    <div class="input-pesquisa">
                        <input list="municipio1" value="${alerta.municipio}" id="input_municipio" type="text" placeholder="Pesquise um município...">
                        <datalist id="municipio1">
                                <!-- Options will be populated here -->
                            </datalist>  
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <p>Descrição</p>
                    <textarea name="" id="desc_value" rows="15" cols="70" placeholder="Descreva o problema..."></textarea>
                    <button onclick="editarAlerta(${idAlerta})" class="btn-form-alerta confirm">Salvar</button>
                    <button onclick="toggleModal()" class="btn-form-alerta">Cancelar</button>
                </div>
            </div>
            `;
                desc_value.innerHTML = `${alerta.descricao}`
            })
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });


}

async function adicionarAlerta() {
    const municipio = document.querySelector("#input_municipio").value
    const desc = document.querySelector("#desc_value").value;

    const user = await getUserSession();

    if (municipio.trim() == "" || desc.trim() == "") {
        alert("Preencha todos os campos")
    } else {
        await fetch(`${actualIP}/api/alertas/adicionar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUser: user.session_userid,
                municipio: municipio,
                descricao: desc
            })
        }).then(res => {
            if (res.ok) {
                location.reload();
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

async function editarAlerta(id) {
    const municipio = document.querySelector("#input_municipio").value
    const desc = document.querySelector("#desc_value").value;

    const user = await getUserSession();

    if (municipio.trim() == "" || desc.trim() == "") {
        alert("Preencha todos os campos")
    } else {
        await fetch(`${actualIP}/api/alertas/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUser: user.session_userid,
                municipio: municipio,
                descricao: desc
            })
        }).then(res => {
            if (res.ok) {
                location.reload();
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

modalAlerta.addEventListener("click", (e) => {
    if (e.target.id == "modalAlerta" || e.target.id == "closeButton" || e.target.id == "buttonCancel") {
        toggleModal();
    }

});


buttonAdd.addEventListener("click", (e) => {
    toggleModal();
});







