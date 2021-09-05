const readConsole = () => {

    return new Promise(resolve => {

        console.clear();

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question(`\nIngrese un lugar o presione cero para salir: `, (lugar) => {
            //console.log('Lugar: '+lugar);
            readline.close();
            //pasarle el lugar al service para que haga la busqueda
            resolve(lugar);//lo que se ingrese se manda aca
            
        });
    });
}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question(`\nPresione ENTER para continuar:`, (lugar) => {
            readline.close();
            resolve();
        });
    });
}



module.exports = {
    readConsole,
    pausa
}