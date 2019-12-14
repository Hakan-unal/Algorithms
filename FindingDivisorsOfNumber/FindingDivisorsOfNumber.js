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

    display() {
        let curr, array, count;
        curr = this.head;
        array = [];
        count = 0;
        // Listenin son elemanının next'ine ulaşıncaya kadar while çalışır
        while (curr) {
            // Listenin sonuna ulaşıncaya kadar her elemanının datasını arrayin içine atar(bubblesort için gerekli)
            array[count] = curr.data;
            curr = curr.next;
            count++;
        }
        // Array'in son hali fonksiyonun çaığılrığı yere retrun edilir
        return array;
    }

    search(data) {
        // Fonksiyon içine girilen değer liste üzerinde aranır 
        let curr, recursive;
        // Listenin head elemanı curr içine tanımlanır
        curr = this.head;
        recursive = (item) => {
            // Soldaki data kullanıcının girdiği aradığı değer sağdaki değer listedeki elemanları gösterir
            if (data == item.data) {
                // Eğer aranan değer ile listenin herhangi bir elemanı eşleşmişse aşağıdaki işlemler yapılır
                count = Number(input.value);
                // Kullnaıcı kaç adet sayı girmek istediyse döngü o kadar çalışır ve sayfa üzerindeki yaratılan html itemleri bu sayede yakalnır
                for (let i = 1; i <= count; i++) {
                    // Left listeye eklenen değerin olduğu kutucuk
                    // Right sayıların bölenlerinin yazılacağı kutucuk
                    let left, right;
                    left = Number(document.querySelector(`#i${i}`).value);
                    right = document.querySelector(`#o${i}`);
                    // döngü 1'den başlayarak girilen sayı kadar çalışır
                    for (let i = 1; i <= left; i++) {
                        // Eğer döngüden gelen sayı girilen sayısı tam bölüyorsa.Döngüden gelen sayı tam bölen bir sayıdır ve right ile ifade edilen html üzerindeki alana eklenerek yazılır çünkü 1'den fazla tam bölen olabilir ve hepsinin gösterilmesi gerekli
                        if (left % i == 0) {
                            right.value += i + "  ";
                        }
                    }
                }
            }
            // Fonkisyon recursive olduğu için aranan sayı liste üzerindeki tüm elemanlar üzerinde kontrol edildiyse ve bulunamadıysa size 1 eşitlenmiştir  ve aşağıdaki koşul sağlanır
            else if (this.size == 1) {
                alert("sorgulanan sayi listede bulunmamaktadir!");
            }
            // Aranan sayı listede bulunmadıysa ve size 1'e eşitlenmediyse aşağıdaki kod bloğu otomatik olarak çalışır
            else {
                // Listenin bir sonraki elemanına geçiş yapar ve size'ı 1 azaltır
                item = item.next;
                this.size--;
                // Listenin bir saonraki elemanıyla fonksiyon kendisini tekrar çağırır 
                recursive(item);
            }
        }
        // Fonksiyonun ilk çağırıldığı yer burası sonra kendi içerisinde kendisini çağırıyor
        recursive(curr);
    }
}

let send, input, table, display, list;
// LinkedList class'ı üzerinden list objesi yaratıldı
list = new LinkedList();
// Html üzerindeki gerekli yerler aşağıda yakalandı
table = document.querySelector("#table");
send = document.querySelector("#send");
input = document.querySelector("#input");

// kulanıcı kaç adet sayı girmek istediğini girip send butonuna bastığında aşağıdaki fonksiyon çalışır ve tablı oluşturur
display = () => {
    let displaySend, searchBox;
    displaySend = document.querySelector("#display");
    searchBox = document.querySelector("#search");

    displaySend.addEventListener("click", () => {
        let search;
        for (let i = 1; i <= input.value; i++) {
            let item, id;
            id = `i${i}`;
            item = Number(document.querySelector(`#${id}`).value);
            list.add(item);
        }
        search = document.querySelector("#search").value;
        list.search(search);
    });
}

send.addEventListener("click", () => {
    count = Number(input.value);
    for (let i = 1; i <= count; i++) {
        table.innerHTML += `
       <tr>
       <th>${i}:</th> 
       <th><input class="inputBox" id="i${i}" type="text" ></input></th>
       <th><input class="outputBox" id="o${i}" type="text" ></input></th>
       </tr>
    `;
    }
    table.innerHTML += `
    <tr>
    <th>Aramak istediğiniz sayıyı giriniz:</th>
    <th><input id="search" type="text"><input id="display" type="submit" value="Send"></th>
    </tr>
    `;
    display();
});