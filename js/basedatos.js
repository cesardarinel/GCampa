
/*inicializamos la base de datos */
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;

function inicioDB() {
    
    dataBase = indexedDB.open("LaBaseDeDatos", 1);    
    dataBase.onupgradeneeded = function (e) {
    
        var active = dataBase.result;    

        var persona = active.createObjectStore('personas', { keyPath : 'id', autoIncrement : true });
        persona.createIndex('nombre', 'nombre', { unique : false });
        persona.createIndex('edad', 'edad', { unique : false});
        persona.createIndex('sexo', 'sexo', { unique : false});
        persona.createIndex('barrio', 'barrio', { unique : false});

        var zona = active.createObjectStore('zona', { keyPath : 'id', autoIncrement : true });
        zona.createIndex('descripcion', 'descripcion', { unique : false});
        //  zona.createIndex('codigo', 'codigo', { unique : false });

        var barrio = active.createObjectStore('barrios', { keyPath : 'id', autoIncrement : true });
        barrio.createIndex('zona', 'zona', { unique : false });
        barrio.createIndex('descripcion', 'descripcion', { unique : false});
        //  barrio.createIndex('codigo', 'codigo', { unique : false });

        var chosas = active.createObjectStore('chozas', { keyPath : 'id', autoIncrement : true });
        chosas.createIndex('sexo', 'sexo', { unique : false });
        chosas.createIndex('descripcion', 'descripcion', { unique : false });
    };
    
    dataBase.onsuccess = function (e) {
        //comentar para performer
        console.log(e);
        cargarTodo();
    };
    
    dataBase.onerror = function (e) {
        //comentar para performer
        console.log(e);
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