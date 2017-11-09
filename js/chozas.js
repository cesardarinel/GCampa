
function insertarChozas(v_sexo,v_descripcion,v_cantidad) {
    
    let active = dataBase.result;
    let data = active.transaction(["chozas"], "readwrite");
    let object = data.objectStore("chozas");
    
    let request = object.put({
        sexo        : v_sexo,
        descripcion : v_descripcion,
        cantidad    : v_cantidad
    });
    
    request.onerror = function (e) {
        console.log("Error: "+request.error.name + '\n\n' + request.error.message)
    };

    data.oncomplete = function (e) {
        CargarChozas();
    };
}

function CargarChozas() {
                
    let active = dataBase.result;
    let data = active.transaction(["chozas"], "readonly");
    let object = data.objectStore("chozas");
                
    let elements = [];
                
                object.openCursor().onsuccess = function (e) {
                    
                    let result = e.target.result;
                    
                    if (result === null) {
                        return;
                    }
                    
                    elements.push(result.value);
                    result.continue();
                    
                };
                
                data.oncomplete = function() {
                  //cuando completa 
                };
                
}