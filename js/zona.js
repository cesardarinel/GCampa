
function insertarZona(v_descripcion) {
    
    var active = dataBase.result;
    var data = active.transaction(["zona"], "readwrite");
    var object = data.objectStore("zona");
    
    var request = object.put({
        descripcion : v_descripcion
    });
    
    request.onerror = function (e) {
        console.log("Error: "+request.error.name + '\n\n' + request.error.message)
       // alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
     //   alert('Object successfully added');
        cargarZonas();
    };
}



function cargarZonas() {
                
                var active = dataBase.result;
                var data = active.transaction(["zona"], "readonly");
                var object = data.objectStore("zona");
                
                var elements = [];
                
                object.openCursor().onsuccess = function (e) {
                    
                    var result = e.target.result;
                    
                    if (result === null) {
                        return;
                    }
                    
                    elements.push(result.value);
                    result.continue();
                    
                };
                
                data.oncomplete = function() {
                    
                    var outerHTML = '';
                    
                    for (var key in elements) {
                        
                        outerHTML += '\n\
                        <tr>\n\
                            <td>' + elements[key].id + '</td>\n\
                            <td>' + elements[key].descripcion + '</td>\n\
                            <td>\n\
                                <button type="button" onclick="load(' + elements[key].id + ');">Details</button>\n\
                            </td>\n\
                        </tr>';                        
                    }
                    
                    elements = [];
                    document.querySelector("#ListaEstacas").innerHTML = outerHTML;
                };
}