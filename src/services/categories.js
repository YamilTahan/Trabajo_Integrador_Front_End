
// Categoría

import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

const handleFilterProductsByCategory = (categoryIn)=> {
    const products = handleGetProductLocalStorage();

    switch (categoryIn){
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el)=>el.categories === categoryIn);
            handleRenderList(result);
            break;
        default:
            break;
        case "mayorPrecio": 
            const resultMayor = products.sort((a,b)=>b.precio - a.precio);
            handleRenderList(resultMayor);
            break;
        case "menorPrecio":
            const resultMenor = products.sort((a,b)=>a.precio - b.precio);
            handleRenderList(resultMenor);
            break;
    };
}

// Render de categorías

export const renderCategories = ()=> {
    const ulList = document.getElementById("listFilter");
    ulList.innerHTML = `
    <li id="Todo">Todos los Productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Gaseosas">Gaseosas</li>
    <li id="mayorPrecio">Mayor Precio</li>
    <li id="menorPrecio">Menor Precio</li>
    `;
    const liELements = ulList.querySelectorAll("li");
    liELements.forEach((liElement)=>{
        liElement.addEventListener("click",()=>{
            console.log("Click en "+liElement.id);
            handleClick(liElement);
        })
    })
    const handleClick = (elemento)=>{
        handleFilterProductsByCategory(elemento.id);
        liELements.forEach((el)=>{
            if(el.classList.contains("liActive")){
                el.classList.remove("liActive");
            }else{
                if(elemento===el){
                    el.classList.add("liActive");
                }
            }
        })
    }
};