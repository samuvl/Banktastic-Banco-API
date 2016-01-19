//Servicio para pasar parámetros entre controladores

function SharedPropierties(){
    
    var property;
    
        this.getProperty =  function () {
                return property;
            };
        
        this.setProperty = function(value) {
                property = value;
                return property;
            };
        
    
}

app.service("sharedPropierties", SharedPropierties);

