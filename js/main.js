
/*  Clases limpias, Distribución                      */
function agregarZona(){
    var descipcion =document.querySelector("#zona_name").value;
    document.querySelector('#zona_name').value = '';
    insertarZona(descipcion);
}

function cargarTodo(){
    cargarZonas();
}

/* Esto hay que migrarlo a cada clase                 */
function add() {
    
    var active = dataBase.result;
    var data = active.transaction(["people"], "readwrite");
    var object = data.objectStore("people");
    
    var request = object.put({
        dni : document.querySelector("#dni").value,
        name : document.querySelector("#name").value.toLowerCase(),
        surname : document.querySelector("#surname").value
    });
    
    request.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
        document.querySelector('#dni').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#surname').value = '';
        alert('Object successfully added');
        loadAll();
    };
}
            
function load(id) {
    
    var active = dataBase.result;
    var data = active.transaction(["people"], "readonly");
    var object = data.objectStore("people");
    
    var request = object.get(parseInt(id));
    
    request.onsuccess = function () {
        
        var result = request.result;
        
        if (result !== undefined) {
            alert("ID: " + result.id + "\n\
            DNI: " + result.dni + "\n\
            Name: " + result.name + "\n\
            Surname: " + result.surname);
        }
    };
    
}

function loadByDni(dni) {
    
    var active = dataBase.result;
    var data = active.transaction(["people"], "readonly");
    var object = data.objectStore("people");
    var index = object.index("by_dni");
    
    var request = index.get(String(dni));
    
    request.onsuccess = function () {
        
        var result = request.result;
        
        if (result !== undefined) {
            alert("ID: " + result.id + "\n\
            DNI: " + result.dni + "\n\
            Name: " + result.name + "\n\
            Surname: " + result.surname);
        }
    };
    
}

function loadAll() {
    
    var active = dataBase.result;
    var data = active.transaction(["people"], "readonly");
    var object = data.objectStore("people");
    
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
       // document.querySelector("#elementsList").innerHTML = outerHTML;
    };
    
}

function loadAllByName() {
    
    var active = dataBase.result;
    var data = active.transaction(["people"], "readonly");
    var object = data.objectStore("people");
    var index = object.index('by_name');
    
    var elements = [];
    
    index.openCursor().onsuccess = function (e) {
        
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
        //document.querySelector("#elementsList").innerHTML = outerHTML;
    };
    
}
