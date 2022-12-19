
function toCarrito(){
  console.log('tocarr')
  fetch(`http://localhost:8080/api/carrito/`);
}

function eliminarProd(id){
    const url = `http://localhost:8080/api/productos`;
    fetch(`${url}/${id}`, {method: "DELETE" });
};

function editarProd(id){
  console.log('edito')
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const stock = document.getElementById("stock").value;
    const descripcion = document.getElementById("descripcion").value;
    const obj = {title: title, price: price, thumbnail:thumbnail, stock: stock, descipcion: descripcion};
    console.log(obj)
    fetch(`http://localhost:8080/api/productos/${id}` ,
      {method: "PUT" ,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)});
}

function sacarProd(id){
    console.log(id);
}

function tarjetas(){
    let url='http://localhost:8080/api/productos'
      fetch(url).then((resp)=>{
          return resp.json()
      }).then((json)=>{
          completar(json);
      });
}

function completar(json){
        let content = ``;
        const div = document.getElementById('cards');
        if(json.admin){

            json.productos.forEach(element => {
                content +=
                `
            <div class="ui card">
              <div class="image">
                <img src=${element.thumbnail}>
              </div>
              <div class="content">
                <a class="header">${element.title}</a>
                <div class="meta">
                  <a>${element.price}</a>
                </div>
                <div class="description">${element.descripcion}</div>
                <button class="ui basic green button" onclick="agregarAlCarrito('${element._id}')"> + </button>
                <button class="ui basic red button" onclick="eliminarDeCarrito('${element._id}')"> - </button>
              </div>
              
              <div class="extra content">
                <div class="ui two buttons">
                    <div class="ui basic red button" onclick="eliminarProd('${element._id}')">Eliminar</div>
                </div>
                </div>
                <div class="extra content">
                    <h2 class="ui header">Actualizar Producto</h2>
                    <div class="ui field">
                      <div  class="ui input"> <input type="text" name="title" placeholder="Nombre" id="title"> </div>
                    </div>
                    <div class="field">
                      <div  class="ui input"> <input type="number" name="price" placeholder="Precio" id="price"> </div>
                    </div>
                    <div class="field">
                     <div  class="ui input"> <input type="text" name="thumbnail" placeholder="URL" id="thumbnail"> </div>
                    </div>
                    <div class="field">
                     <div  class="ui input"> <input type="number" name="stock" placeholder="Stock" id="stock"> </div>
                    </div>
                    <div class="ui label">Descripcion</div>
                    <div class="field">
                      <textarea rows="1" name="descripcion" placeholder="Descripcion" id="descripcion"> </textarea>
                    </div>
                  <button class="ui basic blue button" onclick="editarProd('${element._id}')">
                    Actualizar
                  </button>

              </div>
              
            </div>
            `
            });
                

        }
        else{
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
                <button class="ui basic green button" onclick="agregarAlCarrito('${element._id}')"> + </button>
                <button class="ui basic red button" onclick="eliminarDeCarrito('${element._id}')"> - </button>
              </div>
            </div>`    
            });
        }
        div.innerHTML = content;
}

function agregarAlCarrito(prodId){
    
    const url=`http://localhost:8080/api/carrito/productos/${prodId}`;
    fetch(url, {method: "POST"});
}

function eliminarDeCarrito(prodId){
  const url=`http://localhost:8080/api/carrito/productos/${prodId}`;
  fetch(url, {method: "DELETE"});
}

tarjetas();