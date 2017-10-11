
function insertarChozas(v_sexo,v_descripcion) {
    
    var active = dataBase.result;
    var data = active.transaction(["chozas"], "readwrite");
    var object = data.objectStore("chozas");
    
    var request = object.put({
        sexo        : v_sexo,
        descripcion : v_descripcion
    });
    
    request.onerror = function (e) {
        console.log("Error: "+request.error.name + '\n\n' + request.error.message)
       // alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
     //   alert('Object successfully added');
        CargarChozas();
    };
}

function CargarChozas() {
                
                var active = dataBase.result;
                var data = active.transaction(["chozas"], "readonly");
                var object = data.objectStore("chozas");
                
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
                            <td>' + elements[key].dni + '</td>\n\
                            <td>' + elements[key].name + '</td>\n\
                            <td>\n\
                                <button type="button" onclick="load(' + elements[key].id + ');">Details</button>\n\
                                <button type="button" onclick="loadByDni(' + elements[key].dni + ');">Details DNI</button>\n\
                            </td>\n\
                        </tr>';                        
                    }
                    
                    elements = [];
                    document.querySelector("#elementsList").innerHTML = outerHTML;
                };
                
            }