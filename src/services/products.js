// Guardar o modificar elementos

import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal} from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";

const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", ()=>{
    handleSaveOrModifyElements();
});

const handleSaveOrModifyElements = ()=> {
    const nombre = document.getElementById("nombre").value,
    imagen = document.getElementById("img").value,
    precio = document.getElementById("precio").value,
    categories = document.getElementById("categoria").value;
    let object = null;
    if(productoActivo){
        object = {
            ... productoActivo,
            nombre,
            imagen,
            precio,
            categories
        }
    }else{
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories
        };
    }
    Swal.fire({
        title: "¡10 Puntos!",
        text: "Producto guardado con éxito",
        icon: "success"
    });
    console.log(object);
    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();
};

//Eliminar Elemento
export const handleDeleteProduct = ()=> {
    Swal.fire({
        title: "¿Seguro?",
        text: "La eliminación será permanente...",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmo"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el)=>el.id!==productoActivo.id);
            //Setear array
            localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            closeModal();
        }
      });
    
}
