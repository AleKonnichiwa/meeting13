class Automotores {
    constructor(marca, modelo,fechaFabricacion, cantidaPuertas, disponibleVenta) {
        this.marca = marca;
        this.modelo = modelo;
        this.fechaFabricacion = fechaFabricacion;
        this.cantidaPuertas = cantidaPuertas;
        this.disponibleVenta = disponibleVenta;
    }
}



let autito1 = new Automotores('honda', 'fit', '01/01/2020', 4, true);
let autito2 = new Automotores('ford', 'fiesta', '02,02,2020', 4, false);


let arrayInfo = [autito1, autito2]; 
console.log('Informacion de automotores cargada')

module.exports = { arrayInfo }