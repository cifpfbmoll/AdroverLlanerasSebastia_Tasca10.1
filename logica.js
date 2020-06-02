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
        tabla += "</td>";
            if (typeof noticias[i].getElementsByTagName("media:content")[0] != "undefined") {
                tabla += filtrar(noticias[i].getElementsByTagName("media:content")[0].getAttribute("type"), noticias[i].getElementsByTagName("media:content")[0].getAttribute("url"))
            }
        tabla += noticias[i].getElementsByTagName("pubDate")[0].textContent;
        tabla += "</td><td>";
        tabla += noticias[i].getElementsByTagName("link")[0].textContent;
        tabla += "</td></tr>";
    }
    document.getElementById("tb").innerHTML = tabla;

}

function filtrar(typeImage, itemMedia){
    var contenido = "";
    if (typeImage.substr(0, 9) === "image") {
        contenido += "<td><img src='" + itemMedia + "'></td><td>";
    } else {
        contenido += '<td><video width="320" height="240" controls ><source src="'
            + itemMedia + '" type="' + typeImage + '">Video</video></td><td>';
    }
    return contenido;
}