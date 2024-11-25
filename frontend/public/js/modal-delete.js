var modalDelete = document.querySelector("#modalDelete");

// alterna a visibilidade do modal
function toggleModalDelete(idAlerta) {
    modalDelete.classList.toggle("visible")

    modalDelete.innerHTML = `
    <div class="modal-content align-top">
            <div class="close-icon">
                <i class="fa-solid fa-x" id="closeButton"></i>
            </div>
            <h2 style="text-align:center">Deseja mesmo apagar este alerta?</h2>
            <div class="buttons-container">
                <button id="buttonCancel" class="btn-container-style cancel">Cancelar</button>
                <button onclick="apagarAlerta(${idAlerta})" class="btn-container-style delete-button">Apagar</button>
            </div>
        </div>
    `
}

function apagarAlerta(idAlerta) {
    fetch(`${actualIP}/api/alertas/deletar`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idAlerta: idAlerta
        })
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error('Error in getAlertas');
            }
            response.json().then(resposta => {
                location.reload()
            })
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

}

modalDelete.addEventListener("click", (e) => {
    if (e.target.id == "modalDelete" || e.target.id == "closeButton" || e.target.id == "buttonCancel") {
        toggleModalDelete();
    }

});










