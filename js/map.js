let map;
let activeInfoWindow;

function initMap() {

    const mapOptions = {
        center: { lat: 	52.409538, lng: 16.931992 }, 
        zoom: 13 
};


map = new google.maps.Map(document.getElementById('map'), mapOptions);

  
const locations = [
        {
            position: { lat: 52.395585925096384, lng: 16.873705634277357 }, 
            title: "Dodaj nazwe",
            info: "Dodaj opis",
            icon: "https://img.icons8.com/?size=100&id=12203&format=png&color=000000",
            price: "Dodaj opis",
        },
        {
            position: { lat: 52.396900276731465, lng: 16.959533578108008 }, 
            title: "Dodaj nazwe",
            info: "Dodaj opis",
            icon: "https://img.icons8.com/?size=100&id=12203&format=png&color=000000",
            price: "Dodaj opis",
            
        },
        {
            position: { lat: 52.40249800968917, lng: 16.953620023601374}, 
            title: "Dodaj nazwe",
            info: "Dodaj opis",
            icon: "https://img.icons8.com/?size=100&id=12203&format=png&color=000000",
            price: "Dodaj opis",
        },
        {
            position: { lat: 52.40380251666477, lng: 16.940116450346633 }, 
            title: "Dodaj nazwe",
            info: "Dodaj opis",
            icon: "https://img.icons8.com/?size=100&id=12203&format=png&color=000000",
            price: "Dodaj opis",
        },
        {
            position: { lat: 52.39324106458198, lng: 16.94310202739482}, 
            title: "Dodaj nazwe",
            info: "Dodaj opis",
            icon: "https://img.icons8.com/?size=100&id=12203&format=png&color=000000",
            price: "Dodaj opis",
        },
        {
            position: { lat: 52.39475278545774, lng: 16.896369272227734}, 
            title: "Dodaj nazwe",
            info: "Dodaj opis",
            icon: "https://img.icons8.com/?size=100&id=12203&format=png&color=000000",
            price: "Na Łazarskim rejonie nie jest kolorowo",
        }
];


locations.forEach((location) => {

    const marker = new google.maps.Marker({

        position: location.position,
        map: map,
        title: location.title,
        icon: {
            url: location.icon,
            scaledSize: new google.maps.Size(35, 35)
        },
        animation: google.maps.Animation.DROP
        
    });

    const infowindow = new google.maps.InfoWindow({

        content: `<div class="infowindow-content"><strong>${location.title}</strong><br>${location.info}<br><strong>Cena:</strong> ${location.price}</div>`

    });

    marker.addListener('click', () => {

        if (activeInfoWindow) {
            activeInfoWindow.close();
        }
        infowindow.open(map, marker);
        activeInfoWindow = infowindow;

    });

    marker.addListener('dblclick', () => {

        window.location.href = location.destination;

    });
});
}
