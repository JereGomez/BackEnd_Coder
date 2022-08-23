export const getTime = ()=>{
    return{
        time: new Date().toLocaleString(),
        timestamp: Date.now()
    }
}