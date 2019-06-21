var mymap = L.map('id_map').setView([-2.18157, -79.87551], 16);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWF2ZW5kYW4iLCJhIjoiY2p3NnVzdHozMjdxeDQzcXBnYjlwMTRqcyJ9.S00xReWyD9_Eb4B1h-VgIg'
}).addTo(mymap);

markers = {
    'Urdesa': L.marker([-2.16609, -79.90893]),
    'Los ceibos': L.marker([-2.1622, -79.938]),
    'Las Peñas':L.marker([-2.18157, -79.87551]),
    "La puntilla": L.marker([-2.1422, -79.8619]),
    "Kennedy Norte": L.marker([-2.1597, -79.902])
}


$(document).ready(()=>{
    
    $.ajax({
        url: "data/restaurants.json",
        success: function(data){
    
            populate_results(data.restaurants);
        }
    })
    
})


function populate_results(restaurants){

    for (restaurant of restaurants){
        let template = 
        `<div class="result-box">
            <div class="x">
                    <img src="/images/restaurants/${restaurant["img_url"]}">
                    <div class="description">
                        <h1>${restaurant["nombre"]}</h1>
                        <div class="star-rating">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
        
                        <h3>${restaurant["resenas"]}</h3>
                        <h3>${restaurant["mesas_disponibles"]} mesas disponibles</h3>
                        <span>${restaurant["ubicación"]}</span>
                    </div>
                </div>
                <button class="takeit">take it!</button>
            </div>`;
        
        markers[restaurant["ubicación"]].addTo(mymap)

        let result_element =  $(template)
        result_element.click(()=>{
            mymap.setView(markers[restaurant["ubicación"]].getLatLng(), 15)
        })

        $("#results").append(result_element);

    }
}