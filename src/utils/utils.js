export const setRandomCell = (size=1) =>{
    let res = {
        row: +(Math.round(Math.random()*100) % size),
        col: +(Math.round(Math.random()*100) % size),
    }
    return res;
}