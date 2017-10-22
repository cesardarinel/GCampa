
function insertarBarrio(v_id,v_zona,v_descripcion) {
    
    var active = dataBase.result;
    var data = active.transaction(["barrios"], "readwrite");
    var object = data.objectStore("barrios");
    
    var request = object.put({
        id          : v_id,
        zona        : v_zona,
        descripcion : v_descripcion
    });
    
    request.onerror = function (e) {
        console.log("Error: "+request.error.name + '\n\n' + request.error.message)
       // alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
     //   alert('Object successfully added');
        cargarBarrio();
    };
}



function cargarBarrio() {
                
                var active = dataBase.result;
                var data = active.transaction(["barrios"], "readonly");
                var object = data.objectStore("barrios");
                
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
                            <td>' + elements[key].zona + '</td>\n\
                            <td>' + elements[key].descripcion + '</td>\n\
                            <td>\n\
                                <button type="button" onclick="load(' + elements[key].id + ');">Modificar</button>\n\
                            </td>\n\
                        </tr>';                        
                    }
                    
                    elements = [];
                    document.querySelector("#listaBarrio").innerHTML = outerHTML;
                };
}