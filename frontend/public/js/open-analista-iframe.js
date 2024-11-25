var modalDelete = document.querySelector("#modalDelete");
var modalAlerta = document.querySelector("#modalAlerta");

// alterna a visibilidade do modal
function toggleModalDelete(idUsuario) {
    modalDelete.classList.toggle("visible")

    modalDelete.innerHTML = `
    <div class="modal-content align-top">
            <div class="close-icon">
                <i class="fa-solid fa-x" id="closeButton"></i>
            </div>
            <h2 style="text-align:center">Deseja mesmo apagar este alerta?</h2>
            <div class="buttons-container">
                <button id="buttonCancel" class="btn-container-style cancel">Cancelar</button>
                <button onclick="apagarUsuario(${idUsuario})" class="btn-container-style delete-button">Apagar</button>
            </div>
        </div>
    `
}

function apagarUsuario(idUsuario){
    fetch(`${actualIP}/api/user/deletar`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUser: idUsuario
        })
    }).then(res => {
        if (res.ok) {
            location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

function closeEditModa(){
    modalAlerta.classList.toggle("visible");
}

function toggleModalEdit(idUser) {
    modalAlerta.classList.toggle("visible");
    fetch(`${actualIP}/api/user/procurar/${idUser}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Error in getAlertas');
            }
            response.json().then(resposta => {
                const usuario = resposta[0];
                console.log(usuario)

                modalAlerta.innerHTML = `
            <div class="modal-content">
                <div class="close-icon">
                    <i class="fa-solid fa-x" id="closeButton"></i>
                </div>
                <h2>Editar Usuário</h2>
                <div class="form-alerta" action="" id="formAlerta">
                    <p>Nome</p>
                        <input value="${usuario.username}" class="input_form" id="input_nome" type="text" placeholder="Digite um nome">
                    
                    <p>Email</p>
                        <input value="${usuario.email}" class="input_form" id="input_email" type="text" placeholder="Digite um nome">
                    
                    <p>Senha</p>
                        <input value="${usuario.password}" class="input_form" value="" id="input_senha" type="password" placeholder="*******">
                    
                    <p>Confirmar Senha</p>
                        <input value="${usuario.password}" class="input_form" value="" id="input_conf_senha" type="password" placeholder="*******">
                    
                    <p>Acesso</p>
                        <select class="input_form" name="" id="idSelectAcesso" value="teste">
                            <option value="true" ${usuario.isadmin ? 'selected' : ''}>Admin</option>
                            <option value="false" ${usuario.isadmin ? '' : 'selected'} >Analista</option>
                        </select>
                    
                    <button onclick="editarUsuario(${idUser})" class="btn-form-alerta confirm">Salvar</button>
                    <button onclick="closeEditModa()" class="btn-form-alerta">Cancelar</button>
                </div>
            </div>
            `;
            })
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    
}

function editarUsuario(idUser){
    fetch(`${actualIP}/api/user/atualizar/${idUser}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: input_nome.value,
            email: input_email.value,
            senha: input_senha.value,
            confSenha: input_conf_senha.value,
            acesso: idSelectAcesso.value == "true" ? true : false,
        })
    }).then(res => {
        if (res.ok) {
            location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}


function toggleModalAdd(){
    modalAlerta.classList.toggle("visible");
    modalAlerta.innerHTML = `
            <div class="modal-content">
                <div class="close-icon">
                    <i class="fa-solid fa-x" id="closeButton"></i>
                </div>
                <h2>Criar Usuário</h2>
                <div class="form-alerta" action="" id="formAlerta">
                    <p>Nome</p>
                        <input class="input_form" id="input_nome" type="text" placeholder="Digite um nome">
                    
                    <p>Email</p>
                        <input class="input_form" id="input_email" type="text" placeholder="Digite um nome">
                    
                    <p>Senha</p>
                        <input class="input_form" value="" id="input_senha" type="password" placeholder="*******">
                    
                    <p>Confirmar Senha</p>
                        <input class="input_form" value="" id="input_conf_senha" type="password" placeholder="*******">
                    
                    <p>Acesso</p>
                        <select class="input_form" name="" id="idSelectAcesso">
                            <option value="true">Admin</option>
                            <option value="false">Analista</option>
                        </select>
                    
                    <button onclick="adicionarUsuario()" class="btn-form-alerta confirm">Adicionar Usuário</button>
                    <button onclick="toggleModalAdd()" class="btn-form-alerta">Cancelar</button>
                </div>
            </div>
            `;
}

function adicionarUsuario(){
    fetch(`${actualIP}/api/user/adicionar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: input_nome.value,
            email: input_email.value,
            senha: input_senha.value,
            confSenha: input_conf_senha.value,
            acesso: idSelectAcesso.value == "true" ? true : false,
        })
    }).then(res => {
        if (res.ok) {
            location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

// CLOSE MODAL
modalDelete.addEventListener("click", (e) => {
    if (e.target.id == "modalDelete" || e.target.id == "closeButton" || e.target.id == "buttonCancel") {
        modalDelete.classList.toggle("visible")
    }

});

modalAlerta.addEventListener("click", (e) => {
    if (e.target.id == "modalAlerta" || e.target.id == "closeButton" || e.target.id == "buttonCancel") {
        modalAlerta.classList.toggle("visible");
    }

});
