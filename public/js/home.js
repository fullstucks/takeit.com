//var cards = document.getElementsByClassName('card open-details')

var cards = document.querySelectorAll('.open-details')
for (card of cards){
    card.addEventListener('click', function(event){
        window.open('/infoRestaurante', '_self')
    })
}

var takeit_btns = document.querySelectorAll('.takeit')
for(btn of takeit_btns){
    btn.addEventListener('click', function(event){
        window.open('/seleccionarEntradas', '_self')
    })
}
