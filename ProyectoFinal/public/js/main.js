
function eliminarProd(id){
    const url = `http://localhost:8080/api/productos`;
    fetch(`${url}/${id}`, {method: "DELETE" });
};