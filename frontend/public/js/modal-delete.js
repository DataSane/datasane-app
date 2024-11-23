var modalDelete = document.querySelector("#modalDelete");
var buttonDelete = document.querySelector("#buttonDelete");

// alterna a visibilidade do modal
function toggleModalDelete(){
    modalDelete.classList.toggle("visible")
}

modalDelete.addEventListener("click" , (e) => {
    if(e.target.id == "modalDelete" || e.target.id == "closeButton" || e.target.id == "buttonCancel"){
        toggleModalDelete();
    }

});

buttonDelete.addEventListener("click" , (e) => {
        toggleModalDelete();
});








