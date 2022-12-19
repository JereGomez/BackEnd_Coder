function prodsCarrito(){
        let url = 'http://localhost:8080/api/carrito/productos'
        fetch(url).then((resp)=>{
            console.log(resp)
            completar(resp);
        })
       

}

function completar(json){
    let content = ``;
        const div = document.getElementById('prodsCarrito');
            json.productos.forEach(element => {
                content +=
                `<div class="ui card">
              <div class="content">
                <a class="header">
                    <div class="image">
                        <img src=${element.thumbnail}>
                    </div>
                </a>
                    <h3>${element.title}</h3>
                <div class="meta">
                  <a>${element.price}</a>
                </div>
                <div class="meta">
                  <a>${element.descripcion}</a>
                </div>
                <button onclick="agregarAlCarrito('${element._id}')"> + </button>
                <button onclick="eliminarDeCarrito('${element._id}')"> + </button>
              </div>
            </div>`    
            });
                
        div.innerHTML = content;
}

prodsCarrito()
console.log('asdsadsad')