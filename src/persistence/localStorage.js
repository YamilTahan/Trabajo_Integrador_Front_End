// Local Storage

export const handleGetProductLocalStorage = ()=> {
    const products = JSON.parse(localStorage.getItem("products"));
    if(products){
        return products;
    }else{
        return [];
    };
};


//Guardar en Local Storage
export const setInLocalStorage = (productIn)=> {
    //Get productos
    let productsInLocal = handleGetProductLocalStorage();
    const existingIndex = productsInLocal.findIndex(
        (productsLocal)=> productsLocal.id === productIn.id);
    
    //If exists
    if(existingIndex !== -1){
        //Reemplazar
        productsInLocal[existingIndex] = productIn;
    }else{
        //Agregar
        productsInLocal.push(productIn);
    };
    //Setear array
    localStorage.setItem("products", JSON.stringify(productsInLocal));


};