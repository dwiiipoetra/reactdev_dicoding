/**
 * Ini adalah program untuk mendapatkan nama user dari internet.
 * Terdapat dua fungsi yang sudah dibuat, berikut penjelasanya:
 *   - fetchingUserFromInternet:
 *     - fungsi ini digunakan untuk mendapatkan data user seolah-olah dari internet.
 *     - fungsi ini menerima dua argumen yakni callback, dan isOffline.
 *     - Argumen callback membawa dua nilai yakni error dan user:
 *       - error: NetworkError akan dibawa oleh callback bila isOffline bernilai true.
 *       - user: data user akan dibawa oleh callback bila isOffline bernilai false.
 *   - gettingUserName:
 *      - fungsi ini memanggil fungsi fetchingUserFromInternet dengan nilai isOffline: false untuk mendapatkan data user name dari internet.
 *      - fungsi ini harus mengembalikan nilai user.name, namun sulit karena menggunakan pola callback.
 *      - Maka dari itu, ubahlah fetchingUserFromInternet dari callback menjadi promise
 *      - Dengan begitu, Anda bisa memanfaatkan .then atau async/await untuk mendapatkan user.name.
 *
 * TODO: 1
 * - Ubahlah fungsi fetchingUserFromInternet dengan memanfaatkan Promise. Anda bisa menghapus implementasi callback.
 *
 * TODO: 2
 * - Ubahlah cara mengonsumsi fungsi fetchingUserFromInternet dari callback ke Promise.
 * - Tips:
 *   - Agar penulisan kode lebih bersih dan mudah dibaca, coba manfaatkan async/await
 *
 *
 * Notes:
 * - Jangan ubah struktur atau nilai dari objek user yang dibawa oleh callback sebelumnya.
 * - Tetap gunakan NetworkError untuk membawa nilai error pada Promise
 */

 class NetworkError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NetworkError';
    }
  }
  
  // TODO: 1
  const fetchingUserFromInternet = isOffline => {
      return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isOffline) {
          reject(new NetworkError('Gagal mendapatkan data dari internet'));
        }
        resolve({ name: 'John', age: 18 });
      }, 500);
    });
  }
  // TODO: 2
  const gettingUserName = async () => {
        try {
          const result = await fetchingUserFromInternet(false);
          return result.name;
      } catch (error) {
          return error.message;
      }
  }
  gettingUserName()
  .then ((result) => console.log(result));

    // QUIZ 1  
  function fetchUsername() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('JSUser');
        }, 3000);
    })
}

console.log("Fetching username...");
fetchUsername().then((value) => {
    console.log(`You are logged in as ${value}`);
})
.finally(() => {
    console.log("Welcome!");
})

// QUIZ 2
function fetchUsername() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('JSUser');
        }, 3000);
    })
}

console.log("Fetching username...");
const username = fetchUsername();
console.log(`You are logged in as ${username}`);
console.log("Welcome!");

// Async Await
const getCoffee = () => {
    return new Promise((resolve, reject) => {
        const seeds = 100;
        setTimeout(() => {
            if (seeds >= 10) {
                resolve("Kopi didapatkan!");
            } else {
                reject("Biji kopi habis!");
            }
        }, 1000);
    })
}

// fungsi synchronous biasa
function makeCoffee() {
    const coffee = getCoffee();
    console.log(coffee);
}
makeCoffee();

// tanpa async await
function makeCoffee() {
    getCoffee().then(coffee => {
        console.log(coffee);
    });
}
makeCoffee();

// menggunakan async await
// Async-await memungkinkan kita menuliskan proses asynchronous layaknya proses synchronous. Kira-kira kode program kita akan seperti berikut:
// Untuk menunggu fungsi getCoffee() yang berjalan secara asynchronous, tambahkan keyword await sebelum pemanggilan fungsi getCoffee().
// Kemudian, karena fungsi makeCoffee() sekarang menangani proses asynchronous, maka fungsi  tersebut juga menjadi fungsi asynchronous. Tambahkan async sebelum deklarasi fungsi untuk membuatnya menjadi asynchronous.
async function makeCoffee() {
    const coffee = await getCoffee();
    console.log(coffee);
}
makeCoffee();

//----- Handle onRejected using async-await
// Perlu jadi catatan bahwa await hanya akan mengembalikan nilai jika promise berhasil dilakukan (onFulfilled).
// Lantas bagaimana jika promise gagal dilakukan (onRejected)? Caranya cukup sederhana. Kembali lagi kepada prinsip synchronous code.
// Kita dapat menangani sebuah eror atau tolakan dengan menggunakan try...catch.

// Ketika menggunakan async/await, biasakan ketika mendapat resolved value dari sebuah promise, untuk menempatkannya di dalam blok try seperti:
async function makeCoffee(){
    try {
        const coffee = await getCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}
makeCoffee();

// Chaining Promise using async-await
async function makeEspresso() {
    try {
        await checkAvailability();
        await checkStock();
        const coffee = await brewCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}
makeEspresso();
/* output
Membuatkan kopi Anda...
Kopi sudah siap!
*/

// Terakhir untuk menjalankan beberapa promise sekaligus secara bersamaan dengan Promise.all, kita bisa menuliskannya seperti ini:
async function makeEspresso() {
    try {
        await checkAvailability();
        await checkStock();
        await Promise.all([boilWater(), grindCoffeeBeans()]);
        const coffee = await brewCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}