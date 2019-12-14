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

class SelectionSort {

    static nonRecursive(array) {
        // Fonksiyona gönderilen array'in eleman sayısı kadar çalışır
        for (let i = 0; i < array.length; i++) {
            // i içerisinde tuttuğumuz index değeri aşağıda lazım olacak o yüzden min değişkeni içerisinde tutuyoruz
            let min = i;
            // İlk değerden başlayarak sağa doğru gidileceği için yukarıdan gelen i değerine göre liste sürekli 1 adım sağa kayıyor
            for (let j = i + 1; j < array.length; j++) {
                // Eğer soldaki eleman sağdaki elemandan büyükse aşağıdaki fonksiyon çalışır
                if (array[min] > array[j]) {
                    // min değeri j'ye eşitlenir çünkü küçük olan değerin index'i lazım olacak
                    min = j;
                }
            }
            // Eğer min değeri i değerine eşit değilse yani yukarıdaki koşul sağlanmışsa aşağıdaki işlem yapılır
            if (min !== i) {
                // i index'ine sahip eleman ile min index'ine sahip eleman yer değiştirir
                let temp;
                temp = array[i]
                array[i] = array[min];
                array[min] = temp;
            }
        }
        //Array'in son hali fonksiyonun çağırıldğı yere döner
        return array;
    }

    static recursive(array) {
        let rec, count, length;
        length = 0;
        let i, j;
        i = 0;
        j = 0;
        count = 0

        rec = () => {
            // 
            if ((array.length * (array.length - 1)) / 2 >= length) {
                if (i == array.length - 1) {
                    count++;
                    i = count;
                }
                let min = i;
                if (j >= array.length) {
                }
                else {
                    j = i + 1;
                    if (array[min] > array[j]) {
                        min = j;
                    }
                }
                if (min !== i) {
                    let temp;
                    temp = array[i]
                    array[i] = array[min];
                    array[min] = temp;
                }
                length++; i++;
                rec();
            }
        }
        rec();
        return array;
    }
}

// Selection sort algoritmasına göre array'in toplam eleman sayısına göre aşağıdaki formülden çıkan sonuç kadar fonksiyonun çalışması gerekiyor




let list, inputBox, send, recSort, nonRecSort, output, display;
//LinkedList class'ından list objesi yaratıldı
list = new LinkedList();
// Html üzerindeki gerekli yerler aşağıda yakalandı
inputBox = document.querySelector("#input");
send = document.querySelector("#send");
recSort = document.querySelector("#rec");
nonRecSort = document.querySelector("#non");
output = document.querySelector("#liste");
display = document.querySelector("#display");


send.addEventListener("click", () => {
    let value;
    value = Number(inputBox.value);
    // inputBox kutucuğunun value'si yoksa yani kullancıı değer girmemişse aşağıdaki koşul sağlanır 
    if (value === "") {
        alert("Please enter a number");
    }
    // inputBox kutucuğunun value'si numeric değilse yani kullanıcı girmemişse aşağıdaki koşul sağlanır 
    else if (isNaN(value)) {
        alert("Please enter a number");
    }
    // Yukarıdaki koşullar sağlanmadıysa aşağıdaki kod bloğu çalışır 
    else {
        // Obje üzerindeki add metodu çağırılarak kullanıcının girdiği değer LİnkedList yapısına eklenir
        list.add(value);
        //Değer girildikten sonra mevcut liste yapısı output ile yakalanan kutucuğun value'isene yazılır
        output.value += value + "  ";
    }
    // Yeni değer listeye eklendikten sonra inputBox kutucuğundaki değer 0'lanır(daha güzel bir görüntü ve kullanım elde edilir)
    inputBox.value = "";
});

nonRecSort.addEventListener("click", () => {
    let array, sorted;
    // list üzerindeki stack metodu çağırılarak mevcut liste array haline çevrilir
    array = list.stack();
    // Array class üzerinden çağrılan nonRecursive fonksiyonu ile sıralanır
    sorted = SelectionSort.nonRecursive(array);
    // Array'in sıralanmış hali display kutucuğunun value'sine yazılır
    // Join metodu array'i string bir yapıya çevirirken elemanlar arasındaki virgülü kaldırmak için kullanılmıştır
    display.value = sorted.join("  ");
});

recSort.addEventListener("click", () => {
    let array, sorted;
    // list üzerindeki stack metodu çağırılarak mevcut liste array haline çevrilir
    array = list.stack();
    // Array class üzerinden çağrılan recursive fonksiyonu ile sıralanır
    sorted = SelectionSort.recursive(array);
    // Array'in sıralanmış hali display kutucuğunun value'sine yazılır
    // Join metodu array'i string bir yapıya çevirirken elemanlar arasındaki virgülü kaldırmak için kullanılmıştır
    display.value = sorted.join("  ");
});


