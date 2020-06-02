document.getElementById("boton").addEventListener("click", notices)

function notices(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            cargarXML(this);
            }
    };
    xhr.open("GET", "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada", true);
    xhr.send();
}

function cargarXML(xml){
    var docXML = xml.responseXML;
    var tabla = "";
    var noticias = docXML.getElementsByTagName("item");
    for (var i = 0; i < noticias.length; i++){
        tabla += "<tr><td>";
        tabla += noticias[i].getElementsByTagName("title")[0].textContent;
        tabla += "</td><td>";
            if (typeof noticias[i].getElementsByTagName("media:content")[0] != "undefined") {
                tabla += filtrar(noticias[i].getElementsByTagName("media:content")[0].getAttribute("type"), noticias[i].getElementsByTagName("media:content")[0].getAttribute("url"));
            } else {
                tabla += "<img width='280' height='200' src='img/coollogo_com-23003894.png' alt='logo'>";
            }
        tabla += "</td><td>";  
        tabla += noticias[i].getElementsByTagName("description")[0].textContent;
        tabla += "</td><td>";
        tabla += noticias[i].getElementsByTagName("pubDate")[0].textContent;
        tabla += "</td><td><a class='btn btn-primary' href='";
        tabla += noticias[i].getElementsByTagName("link")[0].textContent;
        tabla += "'>Link</a></td></tr>";
    }
    document.getElementById("tb").innerHTML = tabla;

}
function filtrar(typeImage, itemMedia){
    var media = "";

    console.log(typeImage.substr(0, 5))
    if (typeImage.substr(0, 5) === "image") {
        media += "<img width='280' height='200' src='" + itemMedia + "'>";
    } else if (typeImage.substr(0, 5) === "video"){
        media += '<video width="280" height="-200" controls ><source src="'
            + itemMedia + '" type="' + typeImage + '">Video</video>';
    }
    return media;
}