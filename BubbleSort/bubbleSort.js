class Node {
    // yeni node burada yaratılıyor,data kullanıcının girdiği değer next ise bir değer o da 0 olmak zorunda
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {

    constructor() {
        // Nesne tanımlandığında head 0 olmalı,size toplam eleman sayısı lazım olabilir diye yazıldı
        this.head = null;
        this.size = 0;
    }

    add(element) {
        //Kullanıcı sayı girip send butonuna bastıktan sonra bu fonksiyon aktif hale gelir ve input kutucuğunun içindeki değeri alıp bu fonksiyona gönderir.
        let current, node;
        // Node class'ından kullanıcıcın girdiği değere göre obje yaratıldı
        node = new Node(element);
        // Eğer listede daha önce eleman yoksa head 0'dır ve girilen ilk eleman head'e eklenir 
        if (this.head == null)
            this.head = node;
        //Eğer listede daha önceden eklenen elemen varsa else çalışır çünkü head 0 değildir
        else {
            current = this.head;
            // Current.next 0 olana kadar çalışması lazım çünkü listede kaç eleman olduğunu bilmiyoruz ve yeni elemanı listenin sonuna eklemek istiyoruz eğer listede daha önceden eklenen 1000 eleman varsa while 1000 defa döner son elemana ulaşır yeni eleman 1000. elemanın next'ine eklenir.
            while (current.next) {
                current = current.next;
            }
            //Listenin son elemanı artık currenttır yukarıdaki while sayesinde.Yeni node listenin son elamının next'ine eklenir
            current.next = node;
        }
        //Eleman eklendiği için listenin size'ı 1 artar
        this.size++;
    }
    stack() {
        let count, current, arr;
        arr = [];
        count = 0;
        current = this.head;
        // Listenin son elemanının next'ine ulaşıncaya kadar while çalışır
        while (current) {
            // Listenin sonuna ulaşıncaya kadar her elemanının datasını arrayin içine atar(bubblesort için gerekli)
            arr[count] = current.data;
            current = current.next;
            count++;
        }
        // Array'in son hali fonksiyonun çaığılrığı yere retrun edilir
        return arr;
    }
}


class BubbleSort {
    static nonRecursive(array) {
        // Fonksiyona gönderilen array'in eleman sayısı kadar çalışır
        for (let i = array.length - 1; i > 0; i--) {
            // Fonksiyona gönderilen array'in eleman sayısı kadar çalışır
            for (let j = array.length - i; j > 0; j--) {
                // array'in sonundan başlayarak karşılaştırmaları yapar
                // koşul sağlandığında if bloğu içerisine girip swap işlemini yapar
                if (array[j] < array[j - 1]) {
                    let tmp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = tmp;
                }
            }
        }
        // Array'in son hali fonksiyonun çağırıldığı yere döner 
        return array;

    }
    static recursive(array) {
        let rec;
        let a, b;
        a = 0;
        b = 0;
        rec = (i, j) => {
            // Recursive olduğu için döngü kullanamayız o yüzden toplam kaç defa işlem yapılacağını bu şekilde tanımladık.Eğer elimizde 5 elemanlı bir array varsa bubblesort için 25 defa işlem yapmak gerekli 
            if (array.length * array.length > i) {
                // Recursive olduğu için döngü kullanamayız o yüzden toplam kaç defa işlem yapılacağını bu şekilde tanımladık.Eğer elimizde 5 elemanlı bir array varsa bubblesort için 25 defa işlem yapmak gerekli 
                if (array.length * array.length > j) {
                    // Eğer  aşağıdaki koşul sağlanmışsa array'in tüm elemanları üzerinde  gezilmiş demektir 
                    if (array.length - 1 <= j) {
                        // Eğer array'in tüm elemanları gezildiyse b tekrar 0'a eşitlenir
                        b = 0;
                    }
                    // Soldaki eleman sağdaki elemandan büyükse aşağıdaki koşul sağlanır ve işlem yapılır.
                    if (array[j] > array[j + 1]) {
                        let temp;
                        temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
                // Fonkisyon buraya geldiğinde kendisini tekrar çağırır ve if koşulu sağlanamayıncaya kadar çalışır
                rec(a++, b++);

            }
        }
        // Yazılan fonksiyon ilk burada çağırılıyor sonra kendi içinde recursive
        rec(a++, b++);
        // Son olarak yukarıdaki işlemlerden elde edilen array fonksiyonun çağırıldığı yere return ediliyor
        return array;
    }
}

let list, inputBox, send, recSort, nonRecSort, output, display;
// Class üzerinden yeni obje yaratıldı
list = new LinkedList();
// Sayfa üzerindeki gerekli yerlerin tanımlaması aşağıda yapıldı
inputBox = document.querySelector("#input");
send = document.querySelector("#send");
recSort = document.querySelector("#rec");
nonRecSort = document.querySelector("#non");
output = document.querySelector("#liste");
display = document.querySelector("#display");

// Send butonuna mouse ile click yapıldığında aşağıdaki işlemler yapılıyor
send.addEventListener("click", () => {
    let value;
    value = Number(inputBox.value);
    // Eğer kullanıcı değer girmediyse aşağıdaki koşul sağlanır
    if (value === "") {
        alert("Please enter a number");
    }
    // Eğer kullanıcı numeric bir değer girmezse aşağıdakli koşul çalışır 
    else if (isNaN(value)) {
        alert("Please enter a number");
    }
    // Eğer yukarıdaki koşullar sağlanmadıysa aşağıdaki else bloğu çalışır 
    else {
        list.add(value);
        output.value += value + "  ";
    }
    inputBox.value = "";
});

// nonRecSort butonuna basıldığına aşağıdaki işlemler yapılır
nonRecSort.addEventListener("click", () => {
    let array, sorted;
    array = list.stack();
    sorted = BubbleSort.nonRecursive(array);
    display.value = sorted.join("  ");
});

// recSort butonuna basıldığına aşağıdaki işlemler yapılır
recSort.addEventListener("click", () => {
    let array, sorted;
    array = list.stack();
    sorted = BubbleSort.recursive(array);
    display.value = sorted.join("  ");
});


