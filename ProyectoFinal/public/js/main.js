
function eliminarProd(id){
    const url = `http://localhost:8080/api/productos`;
    fetch(`${url}/${id}`, {method: "DELETE" });
};

function editarProd(id){
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const stock = document.getElementById("stock").value;
    const descripcion = document.getElementById("descripcion").value;
    const obj = {title: title, price: price, thumbnail:thumbnail, stock: stock, descipcion: descripcion};
    fetch(`http://localhost:8080/api/productos/${id}` , {method: "PUT" , body: JSON.stringify(obj)});
}

function sacarProd(id){
    console.log(id);
}