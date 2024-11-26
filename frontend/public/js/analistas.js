const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
const listUserContent = document.querySelector("#listUserId");

async function getUserSession() {
    return fetch(`${actualIP}/api/user/me`)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('Usuário não autenticado');
            }

            return await response.json()
        })
        .catch((error) => {
            console.error('Erro ao buscar dados do usuário:', error);
        });

}

async function listarUsuarios() {
    const AuthUser = await getUserSession();
    console.log(AuthUser)

    listUserContent.innerHTML = `
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
    `;
    fetch(`${actualIP}/api/user`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Usuário não autenticado');
            }

            response.json().then(resposta => {
                const listaUsuarios = resposta;
                console.log(listaUsuarios)
                listaUsuarios.forEach(user => {
                    listUserContent.innerHTML += `
                <tr>
                        <td> ${user.userid} </td>
                        <td> ${user.username} <span class="you">${user.userid == AuthUser.session_userid ? "(você)" : ""}</span> </td>
                        <td> ${user.email} </td>
                        <td> ${user.isadmin ? "Admin" : "Analista"} </td>
                        <td>
                            <button onclick="toggleModalEdit(${user.userid})" class="btn-edi">
                                <img width="17" height="17"
                                    src="https://img.icons8.com/material-outlined/24/FFFFFF/edit--v1.png"
                                    alt="edit--v1" />
                            </button>
                            <button onclick="toggleModalDelete(${user.userid})" class="btn-del">
                                <img width="17" height="17"
                                    src="https://img.icons8.com/material-outlined/24/FFFFFF/trash--v1.png"
                                    alt="trash--v1" />
                            </button>
                        </td>
                    </tr>
                `
                });
            })

        }).catch(err => {
            console.log(err)
        })
}

document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
})