class Kmp {
    static createString(count, choice) {
        for (let i = 0; i < count; i++) {
            let val;
            val = Math.round(Math.random());
            if (choice === "a") {
                aDisplay.innerText += val;
                arrayA[i] = val;
            }
            else if (choice === "b") {
                bDisplay.innerText += val;
                arrayB[i] = val;
            }
        }
    }
    static searchString(bigArray, lowArray) {
        let arr, sayac;
        sayac = 0;
        arr = [];
        // Büyük array'in eleman sayısı kadar çalışır
        for (let i = 0; i < bigArray.length; i++) {
            // // bigArrayin i indexli elemanı küçük array'in ilk elemanıyla eşleşirse aşağıdaki koşul sağlanmış olur
            if (bigArray[i] === lowArray[0]) {
                let count;
                count = 0;
                // lowArray'in eleman sayısı kadar çalışır
                for (let j = 0; j < lowArray.length; j++) {
                    // bigArray'in içerisinde yukarıdaki koşulların sağlandığı indexten başlayarak lowArray kadar sağa giderek eşleşme var mı kontrol ediyorsun
                    if (bigArray[i + j] == lowArray[j]) {
                        // lowArray'in 0. indisinden başlayarak her eşleşmede count bir artar
                        count++;
                    }
                }
                // Eğer count low.Array'in length'ine eşit olursa lowArray bigArray'in i. indisinden başlayarak içerisinde yer alıyor demektir ve aşağıdaki koşul sağlanır
                if (count == lowArray.length) {
                    // Boş array'e eşleşmenin ilk sağlandığı index'in değeri aktarılır  
                    arr[sayac] = i;
                    // sayac bir artar birden fazla eşleşme olması durumunda array'e tüm elemanları alabilmek için
                    sayac++;
                }
            }
        }
        // İndislerin tutulduğu arr array'i fonksiyonun çağırıldığı yere return edilir
        return arr;
    }
}
let a, b, send, aDisplay, bDisplay, result, arrayA, arrayB;
// Html üzerindeki gerekli yerler yakalanır
a = document.querySelector("#a");
b = document.querySelector("#b");
send = document.querySelector("#send");
aDisplay = document.querySelector("#aDisplay");
bDisplay = document.querySelector("#bDisplay");
result = document.querySelector("#result");
arrayA = [];
arrayB = [];

send.addEventListener("click", () => {
    let vala, valb, display;
    vala = Number(a.value);
    valb = Number(b.value);
    Kmp.createString(vala, "a");
    Kmp.createString(valb, "b");
    display = Kmp.searchString(arrayA, arrayB);
    result.value = display;
});

