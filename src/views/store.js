// STORE

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";

//Get y llamar al render
export const handleGetProductsToStore = ()=> {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};

// Filtrar y renderizar
export const handleRenderList = (productsIn) => {
    
    //Filtrado de arrays
    const burgers = productsIn.filter((el)=>el.categories==="Hamburguesas");
    const papas = productsIn.filter((el)=>el.categories==="Papas");
    const gaseosas = productsIn.filter((el)=>el.categories==="Gaseosas");

    //Renderiza los elementos de la sección
    const renderProductGroup = (productos, title) => {
        if(productos.length>0){
            const productosHTML = productos.map((producto, index)=> {
                return `
                <div class="containerTargetItem" id="product-${producto.categories}-${index}"> 
                    <div>
                        <img src="${producto.imagen}" />
                    </div>
                    <div>
                        <h2>${producto.nombre}</h2>
                    </div>
                    <div class="targetProps">
                        <p><b>Precio:</b>$${producto.precio}</p>
                    </div>
                </div>`;
            });

            //Retorna la seccion
            return `
                <section class="sectionStore">
                    <div class="containerTitleSection">
                        <h3>${title}</h3>
                    </div>
                    <div class="containerProductStore">
                        ${productosHTML.join("")}
                    </div>
                </section>`;
        }else{
            return "";
        };
    };

    //Renderizar productos dentro de su categoría
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(burgers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}`;

    //Se añaden los eventos de manera dinámica
    const addEvents = (productsIn) => {
        productsIn.forEach((element, index) => { 
            const productContainer = document.getElementById(
                `product-${element.categories}-${index}` 
            );
            if (productContainer) {
                productContainer.addEventListener("click", () => {
                    setProductoActivo(element);
                    openModal();
                });
            } else {
                console.warn(`No se encontró el contenedor con ID: product-${element.categories}-${index}`);
            }
        });
    };
    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};