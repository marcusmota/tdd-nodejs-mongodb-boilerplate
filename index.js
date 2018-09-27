const app = require("./src/app");
const parametros = require("./src/config/db.json");

var appName = port = connectString = "";

if(process.env.NODE_ENV == "production"){
    port = parametros.production.port;
    appName = parametros.production.appName;
}else if(process.env.NODE_ENV == "test"){
    port = parametros.test.port;
    appName = parametros.test.appName;
}else{
    port = parametros.development.port;
    appName = parametros.development.appName;
}

if(!module.parent){ 

    app.listen(port, () => {
        console.log(`------------------------------------------------------------------------------------------------------------------------------------------`);
        console.log(``);
        console.log(``);
        console.log(`===================`);
        console.log(`APP: ${appName}`);
        console.log(`PORT: ${port}`);
        console.log(`MODO: ${process.env.NODE_ENV}`);
        console.log('DATA: '+new Date());
        console.log(`===================`);
        console.log(``);
        console.log(``);
    }); 
    
}


module.exports = app;
