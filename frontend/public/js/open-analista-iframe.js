var openModalAdicionarAnalista = document.querySelector('#openModalAdicionarAnalista')
var openModalEditarAnalista = document.querySelector('#openModalEditarAnalista')
var modalAdicionarAnalista = document.querySelector('#modalAdicionarAnalista');
var closeAdicionarAnalista = document.querySelector('#closeAdicionarAnalista');
    
openModalAdicionarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})

openModalEditarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})

closeAdicionarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})