
/*inicializamos la base de datos */
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;

function inicioDB() {
    
    dataBase = indexedDB.open("LaBaseDeDatos", 1);    
    dataBase.onupgradeneeded = function (e) {
    
        var active = dataBase.result;    

        var persona = active.createObjectStore('personas', { keyPath : 'id', autoIncrement : true });
        persona.createIndex('nombre', 'nombre', { unique : false });
        persona.createIndex('edad', 'edad', { unique : true});
        persona.createIndex('sexo', 'sexo', { unique : true});
        persona.createIndex('barrio', 'barrio', { unique : true});

        var zona = active.createObjectStore('zona', { keyPath : 'id', autoIncrement : true });
        zona.createIndex('descripcion', 'descripcion', { unique : true});
        //  zona.createIndex('codigo', 'codigo', { unique : false });

        var barrio = active.createObjectStore('barrios', { keyPath : 'id', autoIncrement : true });
        barrio.createIndex('zona', 'zona', { unique : false });
        barrio.createIndex('descripcion', 'descripcion', { unique : true});
        //  barrio.createIndex('codigo', 'codigo', { unique : false });

        var chosas = active.createObjectStore('chozas', { keyPath : 'id', autoIncrement : true });
        chosas.createIndex('sexo', 'sexo', { unique : false });
        chosas.createIndex('descripcion', 'descripcion', { unique : false });
/*
        var object = active.createObjectStore('people', { keyPath : 'id', autoIncrement : true });
        object.createIndex('by_name', 'name', { unique : false });
        object.createIndex('by_dni', 'dni', { unique : true});
*/      
    };
    
    dataBase.onsuccess = function (e) {
        //comentar para performer
        console.log(e);
       // alert('Database loaded');
        cargarTodo();
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