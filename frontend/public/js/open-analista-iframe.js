var openModalAdicionarAnalista = document.querySelector('#openModalAdicionarAnalista')
var modalAdicionarAnalista = document.querySelector('#modalAdicionarAnalista');
var closeAdicionarAnalista = document.querySelector('#closeAdicionarAnalista');

modalAdicionarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})

openModalAdicionarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})

closeAdicionarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})