import { json2xml } from 'xml-js';

// Selectores html para manipulación del DOM
const productsContainer = document.querySelector("#products-container")
const btnsNavbar = document.querySelector("#btns-navbar")
const URL_PRODUCTS = "https://crud-db-jet.vercel.app/products"

// Función para pintar todos los productos

async function indexProducts() {
    const response = await fetch(`${URL_PRODUCTS}`)
    const data = await response.json() // Traer el array de productos
    const jsonData = await response.data;
    downloadXml(jsonData)
    console.log(data)
    productsContainer.innerHTML = "" // Limpio el contenedor para que se llene con los productos de la base de datos

    // Por cada producto imprimo un article
    data.forEach(product => {
        // Se imprimen solo los productos que estén disponibles
        if (product.amount > 0) {
            const article = document.createElement("article") // para cada card se crea un article respetando la semántica
            article.classList.add("card", "text-light", "col-2", "card-custom") // agrego las clases para los estilos de bootstrap
            article.innerHTML = `
            <img src="${product.img}" class="card-img h-100 object-fit-cover" alt="${product.name}">
            <div class="card-body bg-light text-dark">
                <h5 class="card-title text-capitalize">${product.name}</h5>
                <p class="card-text m-0 text-capitalize">${product.type}</p>
                <p class="card-text m-0">${product.description}</p>
                <p class="card-text m-0"><span class="fw-bolder">Price: </span>$${product.price}</p>
                <p class="card-text m-0"><span class="fw-bolder">Amount: </span>${product.amount}</p>
            </div>
        `
            // Por cada article, se pone en el contenedor
            productsContainer.appendChild(article)
        }
    })
    
}

// Función que valida si el usuario está registrado y manipula la navbar
function isLogged() {
    const user = localStorage.getItem("user")
    if (user) {
        btnsNavbar.innerHTML = `
        <button id="logout" type="button" class="btn btn-secondary">Logout</button>
        `
        const logout = document.querySelector("#logout")
        logout.addEventListener("click", () => {
            localStorage.removeItem("user")
            window.location.reload()
        })
    }

}

const downloadXml = async (data) => {
    try {
    const jsonData = data
      // Convertir JSON a XML
      const xmlData = json2xml(jsonData, { compact: true, spaces: 4 });
  
      // Crear un Blob con el XML
      const blob = new Blob([xmlData], { type: 'application/xml' });
  
      // Crear un enlace para la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'data.xml'; // Nombre del archivo descargable
      link.click();
  
      // Limpiar el objeto URL
      URL.revokeObjectURL(link.href);
  
    } catch (error) {
      console.error('Error al convertir o descargar el archivo:', error);
    }
  };
  
  export default downloadXml;

// Ejecución de la función que imprime los productos disponibles
indexProducts()

// Ejecución de isLogged para que cambie la barra de navegación cuando el usuario se encuentra logueado
isLogged()



