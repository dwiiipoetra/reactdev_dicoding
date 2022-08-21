// before callback
// const orderCoffee = () => {
//     let coffee = null;
//     console.log("Sedang membuat kopi, silakan tunggu...");
//     setTimeout(() => {
//         coffee = "Kopi sudah jadi!";
//     }, 3000);
//     return coffee;
// }
 
// const coffee = orderCoffee();
// console.log(coffee);


// after callback
// const orderCoffee = callback => {
//     let coffee = null;
//     console.log("Sedang membuat kopi, silakan tunggu...");
//     setTimeout(() => {
//         coffee = "Kopi sudah jadi!";
//         callback(coffee);
//     }, 3000);
// }
 
// orderCoffee(coffee => console.log(coffee));


// promise
const stock = {
    coffeBeans: 250,
    water: 1000
}

const checkStock = () =>{
    return new Promise((resolve, reject) => {
        if(stock.coffeBeans >= 100) resolve("Stok cukup, LANJUT BOS")
        else reject("Stok kurang")
    });
}

// const handleSuccess = resolvedValue => {console.log(resolvedValue);}
// const handleFailure = rejectedReason => {console.log(rejectedReason);}
// checkStock().then(handleSuccess, handleFailure)

checkStock()
    .then(handleSuccess)
    .catch(handleFailure)