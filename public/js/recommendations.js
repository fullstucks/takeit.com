$(document).ready(function(){

    $.ajax({
        url: "data/recommendations.json",
        success: function(data){
            parse_top_restaurants_html(data.top_gye)
            parse_top_zones_html(data.zonas_destacadas)
        }
    })

    
})

function parse_top_restaurants_html(data){
    for (element of data){
        var img = $('<img></img>')
        img.attr('src','/images/restaurants/'+ element.img_url)

        var image_wrapper = $('<div></div>')
        image_wrapper.addClass('image-wrapper')
        image_wrapper.append(img)

        var h1 = $('<h1></h1>'),
            h3_1 = $('<h3></h3>'),
            h3_2 = $('<h3></h3>');
        h1.text(element.nombre)
        h3_1.text(element.resenas + " reseñas")
        h3_2.text(element.mesas_disponibles + " mesas disponibles")

        var card_details = $('<div></div>')
        card_details.addClass('card-details')
        card_details.append(h1)
        card_details.append(h3_1)
        card_details.append(h3_2)

        var card = $('<div></div>')
        card.addClass('card open-details')
        card.append(image_wrapper)
        card.append(card_details)

        $('#topgye').append(card)

    }
}
function parse_top_zones_html(data){
    for (element of data){
        var img = $('<img></img>')
        img.attr('src','/images/zonas/'+ element.img_url)

        var h5 = $('<h5>'+element.nombre+'</h5>')

        var h4 = $('<h4>'+ element.n_restaurants+' restaurantes</h4>')

        var div = $('<div></div>')
        div.append(h5)
        div.append(h4)
        div.attr('class','in-center-image')

        var a = $('<a></a>')
        a.append(img)
        a.append($('<div></div>').attr('class', 'shadower'))
        a.append(div)

        $('#topzones').append(a)

    }
}