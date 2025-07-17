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
headers.set('Authorization', 'Basic ' + btoa(':' + '6kwdZqPVaOs6IIVwC1VLpgrf72JCKLXB9dvuVSxK-861'));
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(url, { headers });
        const data = yield res.json();
        const contenedor = document.getElementById('destacados');
        for (let key in data) {
            if (!data[key].Codigo_Inmueble)
                continue;
            const inmueble = data[key];
            const card = crearCard(inmueble);
            contenedor.innerHTML += card;
        }
    }
    catch (error) {
        console.error('Error al cargar inmuebles destacados:', error);
    }
}));
/**
 * Función para crear la tarjeta HTML de cada inmueble
 */
function crearCard(inmueble) {
    // ✅ Cortar descripción a 100 caracteres
    const descripcionCorta = inmueble.descripcionlarga.length > 120
        ? inmueble.descripcionlarga.slice(0, 120) + '...'
        : inmueble.descripcionlarga;
    return `
    <div class="card">
      <!-- Imagen principal del inmueble -->
      <img src="${inmueble.foto1}" alt="Foto inmueble" class="card__image" />

      <div class="card__info">
        <p class="card__price">$${inmueble.Canon !== '0' ? inmueble.Canon : inmueble.Venta}</p>
         <!-- ✅ Descripción corta -->
        <p class="card__description">${descripcionCorta}</p>

        <p class="card__icons">
          <img src="assets/icon/hab-icon.svg" class="icon" /> ${inmueble.Alcobas}
          &nbsp;
          <img src="assets/icon/banio-icon.svg" class="icon" /> ${inmueble.banios}
          &nbsp;
          <img src="assets/icon/area-icon.svg" class="icon" /> ${inmueble.AreaConstruida}
        </p>

  

        <a href="detalle.html?codigo=${inmueble.Codigo_Inmueble}" class="btn btn--primary">Contactar</a>
      </div>
    </div>
  `;
}
