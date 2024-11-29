var modalComentario = document.querySelector("#modalComentario");


// alterna a visibilidade do modal
function closeModalComentario(){
    modalComentario.classList.toggle("visible")
}

async function toggleModalComentario(idAlerta) {
    modalComentario.classList.toggle("visible")
    modalComentario.innerHTML = `
    <div class="modal-content-coment">
                <div class="close-icon">
                    <i class="fa-solid fa-x" id="closeButtonComentario"></i>
                </div>
                <h2>Comentários</h2>
                <div id="comentarioListId" class="comentario-list">
                    
                </div>
                
                <div class="form-enviar-comentario">
                    <input id="input_comentario" type="text" name="" id="" placeholder="Digite aqui..."> 
                    <button onclick="adicionarComentario(${idAlerta})">Enviar</button>
                </div>
            </div>
    `
    comentarioListId.innerHTML = '';
    listarComentarios(idAlerta);

}


async function listarComentarios(idAlerta) {
    const comentarioList = document.querySelector("#comentarioListId")
    const user = await getUserSession()

    await fetch(`${actualIP}/api/comentarios/${idAlerta}`).then(res => {
        if (res.ok) {
            res.json().then(resposta => {
                const listaComentarios = resposta;
                console.log(listaComentarios)
                if(listaComentarios.length == 0){
                    comentarioList.innerHTML = '<h2 style="text-align: center"> Nenhum comentário adicionado</h2>'
                }

                listaComentarios.forEach(element => {
                    comentarioList.innerHTML += `
                <div class="comentario-container ${element.UserId == user.session_userid ? 'comentario-right' : ''}">
                        <div class="header-container"> 
                            <div class="header-comentario">
                                <!-- <div class="icon-profile"></div> -->
                                <div class="header-title">
                                    <p>${element.Admin == 1 ? 'Secretário' : 'Analista'}</p>
                                    <h3>${element.Usuario}</h3>
                                </div>
                            </div>
                            ${element.UserId == user.session_userid ? `
                            <div class="dropdown">
                                <i onclick="abrirDropDown(${element.ComentarioID})" class="fa-solid fa-ellipsis dropbtn"></i>
                                <div id="dropdownId${element.ComentarioID}" class="dropdown-content">
                                    <a onclick="EnableEditarComentario(${element.ComentarioID})" href="#">Editar</a>
                                    <a onclick="toggleModalDeleteComentario(${element.ComentarioID}, ${idAlerta})" href="#">Apagar</a>
                                </div>
                            </div>    
                            ` : ''}
                        </div>
                    <div class="edit_comentario_container">
                        <input id="input_edit${element.ComentarioID}" value="${element.MensagemComentario}" class="input_comentario" type="text" disabled>
                        <button onclick="editarComentario(${element.ComentarioID}, ${idAlerta})" id="btn_edit${element.ComentarioID}" class="btn_edit_comentario btn_disabled"> Salvar </button>
                    </div>
                </div>
                    `
                });

            })
        }
    }).catch(err => {
        console.log(err)
    })
}

async function adicionarComentario(idAlerta) {
    const comentarioValue = document.querySelector("#input_comentario").value

    const user = await getUserSession()

    if (comentarioValue.trim() == "") {
        alert("Preencha todos os campos")
    } else {
        await fetch(`${actualIP}/api/comentarios/adicionar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUser: user.session_userid,
                idAlerta: idAlerta,
                comentario: comentarioValue
            })
        }).then(res => {
            if (res.ok) {
                res.json().then(reposta => {
                    
                    comentarioListId.innerHTML = '';
                    listarComentarios(idAlerta);
                    document.querySelector("#input_comentario").value = '';

                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

}

function editarComentario(comentarioId, idAlerta){
    const comentarioList = document.querySelector("#comentarioListId")
    const comentarioValue = document.querySelector(`#input_edit${comentarioId}`).value

    fetch(`${actualIP}/api/comentarios/atualizar/${comentarioId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comentario: comentarioValue
        })
    }).then(res => {
        if (res.ok) {
            comentarioList.innerHTML = '';
            listarComentarios(idAlerta);
        }
    }).catch(err => {
        console.log(err)
    })
}

function abrirDropDown(comentarioId){
    const dropdown = document.querySelector(`#dropdownId${comentarioId}`);
    dropdown.classList.toggle("menuEnable")
}

function EnableEditarComentario(comentarioId){
    const dropdown = document.querySelector(`#dropdownId${comentarioId}`);
    const input = document.querySelector(`#input_edit${comentarioId}`)
    const button = document.querySelector(`#btn_edit${comentarioId}`)

    input.removeAttribute("disabled")
    dropdown.classList.toggle("menuEnable")
    button.classList.remove("btn_disabled")
}

modalComentario.addEventListener("click", (e) => {
    if (e.target.id == "modalComentario" || e.target.id == "closeButtonComentario") {
        closeModalComentario();
    }

});



