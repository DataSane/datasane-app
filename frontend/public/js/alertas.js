var alertContent = document.querySelector("#alertContentId");
const btnAdd = document.querySelector("#buttonAdd")

const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

function toggleArrow(idArrow) {
    var arrowDetails = document.getElementById(idArrow);
    arrowDetails.classList.toggle("rotate")
}

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

async function getListaAlertas() {
    const user = await getUserSession();

    fetch(`${actualIP}/api/alertas`)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Error in getAlertas');
            }

            response.json().then(resposta => {
                const listaAlertas = resposta;
                alertContent.innerHTML = '';
                console.log(listaAlertas)
                console.log(user)
                
                if(listaAlertas.length == 0){
                    alertContent.innerHTML = '<h2> Nenhum alerta adicionado</h2>'
                }
            
                if (user.session_isadmin == 1) {                    
                    btnAdd.classList.remove("enable")

                    listaAlertas.forEach(element => {
                        alertContent.innerHTML += `
                        <details class="alert-container">
                        <summary onclick="toggleArrow('arrowDetail${element.idAlerta}')" class="alert-title-container pointer">
                                <i class="fa-solid fa-circle-exclamation"></i>
                                <p>${element.municipio}</p>
                                <i id="arrowDetail${element.idAlerta}" class="fa-solid fa-chevron-right"></i>
                        </summary>
                        <div class="description-content">
                            <h3>Descrição:</h3>
                            <p>${element.descricao}</p>
                            <button onclick="toggleModalComentario(${element.idAlerta})">Comentar</button>
                        </div>
                    </details>
                        `
                    });
                } else {

                    btnAdd.classList.add("enable")
                    
                    listaAlertas.forEach(element => {
                        alertContent.innerHTML += `
                        <div class="alert-container">
                        <div class="alert-title-container">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <p>${element.municipio}</p>
                        </div>
                        <button onclick="toggleModalEdit(${element.idAlerta})" class="alert-button edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onclick="toggleModalComentario(${element.idAlerta})" class="alert-button chat">
                            <i class="fa-solid fa-message"></i>
                        </button>
                        <button onclick="toggleModalDelete(${element.idAlerta})" class="alert-button delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                        `
                    });
                }

            })


        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

document.addEventListener('DOMContentLoaded', async () => {
    getListaAlertas();
})
