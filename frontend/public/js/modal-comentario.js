var modalComentario = document.querySelector("#modalComentario");
var buttonComentariosAlert = document.querySelector("#buttonComentariosAlert");
var buttonComentarDestails = document.querySelector("#buttonComentarDestails");

// alterna a visibilidade do modal
function toggleModalComentario(){
    modalComentario.classList.toggle("visible")
}

modalComentario.addEventListener("click" , (e) => {
    if(e.target.id == "modalComentario" || e.target.id == "closeButtonComentario"){
        toggleModalComentario();
    }

});

buttonComentariosAlert.addEventListener("click" , (e) => {
        toggleModalComentario();
});

buttonComentarDestails.addEventListener("click" , (e) => {
        toggleModalComentario();
});


