
function insertarBarrio(v_zona,v_descripcion) {
    
    var active = dataBase.result;
    var data = active.transaction(["barrios"], "readwrite");
    var object = data.objectStore("barrios");
    
    var request = object.put({
        zona        : v_zona,
        descripcion : v_descripcion
    });
    
    request.onerror = function (e) {
        console.log("Error: "+request.error.name + '\n\n' + request.error.message)
       // alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
     //   alert('Object successfully added');
        loadAll();
    };
}