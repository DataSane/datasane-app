var openModalAdicionarAnalista = document.querySelector('#openModalAdicionarAnalista')
var modalAdicionarAnalista = document.querySelector('#modalAdicionarAnalista');
var closeAdicionarAnalista = document.querySelector('#closeAdicionarAnalista');
    
openModalAdicionarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})

closeAdicionarAnalista.addEventListener('click', function(){
    modalAdicionarAnalista.classList.toggle('active');
})