/*inicializamos la base de datos */
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;

function inicioDB() {
    
    dataBase = indexedDB.open("LaBaseDeDatos", 5);
    
    dataBase.onupgradeneeded = function (e) {
    
        var active = dataBase.result;    

        var cliente = active.createObjectStore('cliente', { keyPath : 'id', autoIncrement : true });
        cliente.createIndex('by_name', 'name', { unique : false });
        cliente.createIndex('by_dni', 'dni', { unique : true});


        var zona = active.createObjectStore('zona', { keyPath : 'id', autoIncrement : true });
        zona.createIndex('codigo', 'codigo', { unique : false });
        zona.createIndex('descripcion', 'descripcion', { unique : true});

        var barrio = active.createObjectStore('barrio', { keyPath : 'id', autoIncrement : true });
        barrio.createIndex('codigo', 'codigo', { unique : false });
        barrio.createIndex('descripcion', 'descripcion', { unique : true});

        var chosas = active.createObjectStore('chosas', { keyPath : 'id', autoIncrement : true });
        chosas.createIndex('by_name', 'name', { unique : false });
        chosas.createIndex('by_dni', 'dni', { unique : true});

        var object = active.createObjectStore('people', { keyPath : 'id', autoIncrement : true });
        object.createIndex('by_name', 'name', { unique : false });
        object.createIndex('by_dni', 'dni', { unique : true});
        
    };
    
    dataBase.onsuccess = function (e) {
        //comentar para performer
        console.log(e);
       // alert('Database loaded');
        loadAll();
    };
    
    dataBase.onerror = function (e) {
        //comentar para performer
        console.log(e);
       // alert('Error loading database');
    };
}


function Reiniciar(){
    
    var DBDeleteRequest = indexedDB.deleteDatabase("LaBaseDeDatos");

      DBDeleteRequest.onerror = function(event) {
      console.log("Error deleting database.");
    };
     
    DBDeleteRequest.onsuccess = function(event) {
      console.log("Database deleted successfully");
        
      console.log(event.result); // should be undefined
    };
    location.reload(true);
}