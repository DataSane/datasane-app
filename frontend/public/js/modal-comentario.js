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

    await fetch(`${actualIP}/api/comentarios/${idAlerta}`).then(res => {
        if (res.ok) {
            res.json().then(resposta => {
                const listaComentarios = resposta;

                if(listaComentarios.length == 0){
                    comentarioList.innerHTML = '<h2 style="text-align: center"> Nenhum comentário adicionado</h2>'
                }

                listaComentarios.forEach(element => {
                    comentarioList.innerHTML += `
                    <div class="comentario-container">
                        <div class="header-comentario">
                            <div class="icon-profile"></div>
                            <div class="header-title">
                                <p>${element.Admin == 1 ? 'Secretário' : 'Analista'}</p>
                                <h3>${element.Usuario}</h3>
                            </div>
                        </div>
                        <p>${element.MensagemComentario}</p>
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

modalComentario.addEventListener("click", (e) => {
    if (e.target.id == "modalComentario" || e.target.id == "closeButtonComentario") {
        closeModalComentario();
    }

});



