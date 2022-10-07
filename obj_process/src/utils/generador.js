
function generador(cant){

    const random = (max, min) => {
        return Math.ciel(Math.random() * (max - min))
    }
    
    const createArrayRandom = (cantidad, maxNum, minNum) => {
        let arr = []
        for (let i = 0; i <= cantidad; i++) {
            arr.push(random(maxNum, minNum))
        }
        return arr
    }
    
    let newArr = createArrayRandom(cant, 1001, 1)


        
    const comp = (array) => {

        let obj = {}
        for (let i = 0; i < array.length; i++) {
            let key = String(newArr[i])
            if (key in obj) {
                obj[key] += 1
            } else {
                obj[key] = 1
            }
        }
        return obj
    }

    return comp(newArr)
}


process.on('message' , msg=>{
    const respuesta = generador(msg);
    process.send(respuesta);
})
