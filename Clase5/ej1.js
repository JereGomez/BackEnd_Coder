//--------1 NUMEROS ALEATORIOS------
const random = (max, min) => {//funcion crea numero al azar entre dos numeros
    return Math.ceil(Math.random() * (max - min)) //math.ceil para que no agarre el 0 
}

const nums = [];//numeros al azar
for(let i=0 ; i<1000 ; i++){
    let aux = random(21 , 1);//generamos numero al azar
    nums.push(aux);
}
console.log(nums);

const objNums = new Object();

for(let i=0 ; i<nums.length;  i++){
    let aux = nums[i];
    objNums[aux] == undefined?  objNums[aux]=1 : objNums[aux]++;
}

console.log(objNums);


