"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// URL del endpoint para obtener los inmuebles destacados
const url = 'https://www.simi-api.com/ApiSimiweb/response/v21/inmueblesDestacados/total/4/limite/1';
// Configuración de cabecera para la autenticación con la API
const headers = new Headers();
// La API requiere autenticación básica con usuario en blanco y el token como contraseña
headers.set('Authorization', 'Basic ' + btoa(':' + '6kwdZqPVaOs6IIVwC1VLpgrf72JCKLXB9dvuVSxK-861'));
// Esperar a que el DOM esté completamente cargado para ejecutar el código
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hacemos la solicitud a la API usando fetch
        const res = yield fetch(url, { headers });
        // Convertimos la respuesta en JSON
        const data = yield res.json();
        console.log(data);
        // Seleccionamos el contenedor donde se mostrarán los inmuebles destacados
        const contenedor = document.getElementById('destacados');
        // Iteramos sobre los resultados del objeto data
        for (let key in data) {
            // Algunos elementos pueden no tener Código_Inmueble (ej: infoAdd), los omitimos
            if (!data[key].Codigo_Inmueble)
                continue;
            // Guardamos la información del inmueble actual
            const inmueble = data[key];
            // Creamos una tarjeta (HTML) con esa información
            const card = crearCard(inmueble);
            // La insertamos en el contenedor
            contenedor.innerHTML += card;
        }
    }
    catch (error) {
        // Si algo falla, mostramos el error en la consola
        console.error('Error al cargar inmuebles destacados:', error);
    }
}));
/**
 * Función para crear la tarjeta HTML de cada inmueble
 * @param {Object} inmueble - Objeto con los datos de un inmueble
 * @returns {string} - Estructura HTML de la tarjeta
 */
function crearCard(inmueble) {
    return `
    <div class="card">
      <!-- Imagen principal del inmueble -->
      <img src="${inmueble.foto1}" alt="Foto inmueble" class="card__image" />

      

      <!-- Información básica del inmueble -->
      <div class="card__info">
        <!-- Mostrar canon de arriendo si existe, sino mostrar valor de venta -->
        <p class="card__price">$${inmueble.Canon !== '0' ? inmueble.Canon : inmueble.Venta}</p>
        
        <h3 class="card__title">${inmueble.Tipo_Inmueble} en ${inmueble.Ciudad}</h3>
        <p>${inmueble.Alcobas} alcobas · ${inmueble.banios} baños · ${inmueble.AreaConstruida} m²</p>
        
        
        
        <!-- Botón que lleva a la página de detalle del inmueble -->
        <a href="detalle.html?codigo=${inmueble.Codigo_Inmueble}" class="btn btn--primary">Ver más</a>
      </div>
    </div>
  `;
}
