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
        tabla += "<tr><td style='width: 30%;'>";
        tabla += noticias[i].getElementsByTagName("title")[0].textContent;
        tabla += "</td>";
            if (typeof noticias[i].getElementsByTagName("media:content")[0] != "undefined") {
                tabla += filtrar(noticias[i].getElementsByTagName("media:content")[0].getAttribute("type"), noticias[i].getElementsByTagName("media:content")[0].getAttribute("url"))
            } else {
                tabla += "<td><img width='300' height='220' src='img/coollogo_com-23003894.png' alt='logo'></td><td>";
            }
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
        media += "<td><img width='300' height='220' src='" + itemMedia + "'></td><td>";
    } else if (typeImage.substr(0, 5) === "video"){
        media += '<td><video width="300" height="220" controls ><source src="'
            + itemMedia + '" type="' + typeImage + '">Video</video></td><td>';
    }
    return media;
}