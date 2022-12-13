const min = 100;
const max = 2000;

export const numberFormat  = (number:number, position: number) => {
    return (Math.round(number * 100) / 100).toFixed(position);
}

export const randomNumberGenerator = () => {
    return min + Math.floor(Math.random()*(max - min + 1));
}

export const initialLabel = () => {
    let initArray = [];
    for(let i = 0;i < 600; i++) initArray.push(i);
    return initArray
}