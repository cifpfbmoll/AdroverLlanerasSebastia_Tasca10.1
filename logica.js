/*Eventos causados al clickar los botones */
document.getElementById("carga").addEventListener("click", notices)
document.getElementById("clean").addEventListener("click", limpia)

/*Función de limpieza*/
function limpia(){
    document.getElementById("tb").innerHTML = "";
    document.getElementById("info").innerHTML = "";
    document.getElementById("clean").innerHTML = "";
}

/*Abrir canal y tratar respuesta */
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

/*Tratar fichero XML y rellenar tabla */
function cargarXML(xml){

    
    var docXML = xml.responseXML;
    var tabla = "";
    /*Información sobre el canal */
    var info = "<br><br>";
    info += "<div><span>Canal RSS usado: Feed MRSS-S</span></div>";
    info += "<div><span>URL de la página original: <a href='https://elpais.com'><button type='button' class='btn btn-link'>Link</button></a> </span> </div>"
    info += "<div><span>Descripción del canal usado: Archivo generado por sitio web que contiene info de lo publicado.</span></div>"
    var noticias = docXML.getElementsByTagName("item");
    /*Bucle que recorre todas las noticias del XML y rellena tabla con su respectivo contenido*/
    for (var i = 0; i < noticias.length; i++){
        tabla += "<tr><td>";
        tabla += noticias[i].getElementsByTagName("title")[0].textContent;
        tabla += "</td><td>";
            if (typeof noticias[i].getElementsByTagName("media:content")[0] != "undefined") {
                tabla += filtrar(noticias[i].getElementsByTagName("media:content")[0].getAttribute("type"), noticias[i].getElementsByTagName("media:content")[0].getAttribute("url"));
            } else {/*En caso de que no tenga media, se usa el logo para no romper la estructura de la tabla */
                tabla += "<img width='280' height='200' src='img/coollogo_com-23003894.png' alt='logo'>";
            }
        tabla += "</td><td>";  
        tabla += noticias[i].getElementsByTagName("description")[0].textContent;
        tabla += "</td><td>";
        tabla += noticias[i].getElementsByTagName("pubDate")[0].textContent;
        tabla += "</td><td><a class='btn btn-primary' href='";
        tabla += noticias[i].getElementsByTagName("link")[0].textContent;
        tabla += "'>Web</a></td></tr>";
    }
    /*Rellena tabla, proporciona info, proporciona boton de limpieza */
    document.getElementById("tb").innerHTML = tabla;
    document.getElementById("info").innerHTML = info;
    document.getElementById("clean").innerHTML = "<button type='button' class='btn btn-primary btn-lg btn-block' id='limpia'>Clean</button>"

}

/*Filtra elementos media entre imagenes y videos y devuelvle la tag correctamente estructurada*/
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
