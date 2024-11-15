var modalAlerta = document.querySelector("#modalAlerta");
var formAlerta = document.querySelector("#formAlerta");
var buttonEditAlert = document.querySelector("#buttonEditAlert");
var buttonAdd = document.querySelector("#buttonAdd");

// alterna a visibilidade do modal
function toggleModal(){
    modalAlerta.classList.toggle("visible")
}

modalAlerta.addEventListener("click" , (e) => {
    if(e.target.id == "modalAlerta" || e.target.id == "closeButton" || e.target.id == "buttonCancel"){
        toggleModal();
    }

});

buttonEditAlert.addEventListener("click" , (e) => {
        toggleModal();
});

buttonAdd.addEventListener("click" , (e) => {
        toggleModal();
});


formAlerta.addEventListener("submit", (e) => {
    e.preventDefault();
})




