class Node {
    // Kullanıcıdan alınan verilere göre katsayi taban ve us verileri yeni objeye eklenir 
    constructor(katsayi, taban, us) {
        this.katsayi = katsayi;
        this.taban = taban;
        this.us = us;
        // node oluşturulduktan sonra  node'un next'i 0'a eşitlendi(liste oluşturulduktan sonra tüm listeye erişebilmek için yararlı).
        this.next = null
    }
}

class LinkedList {
    constructor() {
        // Oluşturulan linkedList objesinin head'i 0'a eşitlendi 
        this.head = null;
        // Oluşturulan linkedList 
        this.size = 0;
    }

    add(k, t, u) {
        // Fonksiyona gönderilen 3 değere göre yeni node oluşturuldu 
        var node = new Node(k, t, u);
        var current;
        // Eğer listenin head'i 0'a eşitse liste boştur ve yeni node'u listenin head'ine ekler 
        if (this.head == null)
            this.head = node;
        // Eğer listenin içinde eleman varsa head 0 değildir ve yukarıdaki koşul sağlanmaz
        // Bu durumda aşağıdaki kod bloğu çalışır 
        else {
            // Mevcut listenin head'i current'a eşitlenir 
            current = this.head;
            //current elemanının next'i 0 olana kadar yani mevcut listenin son elemanına ulaşana kadar while döngüsü çalışır 
            while (current.next) {
                // Listenin son elemanına  ulaşana kadar current mevcut current'ın next'ine eşitlenir 
                current = current.next;
            }
            // Yukarıdaki while çalışmayı bitirdiğinde mevcut current listenin son elemanını gösterir
            // Mevcut current'in next'i ise listnin sonuna eklenecek eleman için uygun pozisyondur artık
            current.next = node;
        }
        // Ekleme işlemi gerçekleştiğinde mevcut listenin size'ı 1 artar 
        // (Gerekli durumlarda kolaylık sağlayabilir)
        this.size++;
    }

    ekleme() {
        let curr, str;
        // curr değişkeni içerisine mevcut listenin head'i atandı
        curr = this.head;
        // str değişkeni boş string olarak tanımlandı
        str = "";
        // curr değişkeni listenin son elemanına ulaşıncaya kadar çalışmaya devam eder
        // Aşağıda liste içerisindeki her elemana ait veriler str değikeni içerisine uygulamada istenildiği gibi eklenir 
        while (curr) {
            str += "(" + curr.katsayi + "*" + curr.taban + "^" + curr.us + ")+";
            curr = curr.next;
        }
        // str değişkeninin son hali fonksiyonun çağrıldığı yere return edilir
        return str;
    }

    birlestir() {
        // İki adet boş array ,bir adet curr değişkeni ve a değişkenleri tanımlandı
        let curr, arr, kat, a;
        // curr değişkeni içine mevcut objenin head'i atandı
        curr = this.head;
        // İki boş array tanımlandı
        arr = [];
        kat = [];
        // arraylere eleman eklerken a değişkeni indis olarak işimize yarayacak
        a = 0;
        while (curr) {
            // arr array'i içine mevcut objenin taban ve us değeri a indisine göre string olarak eklenir
            // Yukarıdaki method sayesinde fazladan 1 tane array kullanımından kaçındık
            // kat array'ine mevcut objenin katsayiları a indisine göre eklenir
            arr[a] = curr.taban + "^" + curr.us + "  ";
            kat[a] = curr.katsayi;
            a++;
            // Ekleme işlemi gerçekleştikten sonra curr değişkeni bir sonraki elemana geçmek için curr.next'e eşitlenir 
            curr = curr.next;
        }
        // Taban ve üsleri aynı olan değişkenlerin katsayılarının toplamını katkat array'i içerisine atıyoruz
        let katkat;
        katkat = [];
        // arr Array'i içindeki toplam eleman sayısı kadar çalışır
        for (let i = 0; i < arr.length; i++) {
            // Bu noktada i ile tanımlı indis kat Array'i içerisindeki değerleri count değişkeni içerisinde tutar
            // Eşleşme sağlandığında aynı taban ve üsse sahip değerlerin katsayılarını bu sayede toplayabiliyoruz
            let count;
            count = kat[i];
            for (let j = 0; j < arr.length; j++) {
                // Aşağıdaki koşulun bize sağladığı avantaj array içerisinden alınan herhangi bir değer tüm 
                // elemanlar üzerinde gezdirildiğinde kendisinede denk gelir ve taban ve üs aynı olduğu için 
                // katsayısını toplar ancak bu bizden istenen uygulama için hata oluşturur. Bu hatayı gidermek 
                // için aşağıdaki koşul kullanıldı
                if (i !== j) {
                    // Soldaki i indisine göre sırayla tüm elemanları alır
                    // Sağdaki soldaki her bir eleman için tüm listeyi dolaşır
                    // Eşleşme sağlanırsa koşul sağlanır ve kat array'i içerisindeki katsayı count içerisine 
                    // eklenerek yazılır. Çünkü aynı taban ve üsse sahip farklı 2 veya daha fazla değer varsa bu 
                    // katsayılarının toplamına ihtiyacımız var
                    if (arr[i] === arr[j]) {
                        count += kat[j];
                    }
                }
            }
            // Yukarıdaki katsayıların toplamı işlemi yapıldıktan sonra sayac değişkenine yeni katsayı ve o katsayıya ait taban ve üs string haline getirilerek eklenir 
            let sayac;
            sayac = count + "*" + arr[i];
            // taban ve üssün aynı olduğu iki eleman olduğunu düşün (1,3) 1 ve 3 indis olsun yukarıdaki 
            // kod hem (1,3) hem de(3,1) eşleşmesi için toplama işlemi yapacak bunun önüne geçmek için eğer 
            // katkat array'i sayac içindeki aynı değeri içeriyorsa koşula girmiyor
            if (!katkat.includes(sayac)) {
                katkat[i] = count + "*" + arr[i];
            }
        }
        // katkat array'inin son hali fonksiyonun çağırıldığı yere dönüyor
        return katkat;
    }
    total() {
        // curr değişkeni içerisine obje içerisinde yer alan head'i atadık
        // sum değişkeni içerisine toplam değeri yazacağımız için ilk önce 0'a eşitledik
        let curr, sum;
        curr = this.head;
        sum = 0;
        // Obje üzerindeki tüm elemanları geziyoruz
        while (curr) {
            // Her bir eleman için aşağıdaki formülü yazıyoruz ve sonucu sum değişkenine arttırarak yazıyoruz
            sum += curr.katsayi * Math.pow(curr.taban, curr.us);
            // obje üzerindeki bir sonraki elemana geçiyoruz
            curr = curr.next;
        }
        // sum değişkeninin son hali fonksiyonun çağırıldığı return oluyor
        return sum;
    }
}

let Linkedlist, send, katsayi, taban, us, liste, birlestirme, birlestir, toplam;
// LinkedList classı üzerinden Linkedlist objesi yaratıldı
Linkedlist = new LinkedList();
// html üzerindeki gerekli elemanlar yakalandı
send = document.querySelector("#button");
katsayi = document.querySelector("#katsayi");
taban = document.querySelector("#taban");
us = document.querySelector("#us");
liste = document.querySelector("#liste");
birlestirme = document.querySelector("#birlestirme");
birlestir = document.querySelector("#send");
toplam = document.querySelector("#toplam");

send.addEventListener("click", () => {
    // send değişkenine click olayı gerçekleştiğinde katsayi taban ve us input kutucuklarına girilen 
    // değerler k t u değişkenlkeri içerisine atılır Number kullanılmasının nedeni input type text olduğu 
    // için gelen veri string cinsinde ve bu değeri numeric yapmamız lazım
    let k, t, u, display;
    k = Number(katsayi.value);
    t = Number(taban.value);
    u = Number(us.value);
    // Linkedlist objesi üzerindeki add fonksiyonuna k,t,u değişkenlerini gönderiyoruz
    Linkedlist.add(k, t, u);
    katsayi.value = "";
    taban.value = "";
    us.value = "";
    // yukarıdaki değerler obje üzerine gönderildikten sonra input kutucuklarını temizlemek için yukarıdaki 3 satırdaki işlemi yaptık
    // aşağıdaki satırda elde ettiğimiz ilk listeyi ekrana bastırmak için display değişkenine obje üzerinden ekleme fonksiyonunu çağırıyoruz
    display = Linkedlist.ekleme();
    // liste değişkenine ait html dökümanı üzerindeki text'e display değişkenini gönderiyoruz
    liste.innerText = display;
});

birlestir.addEventListener("click", () => {
    let display, total;
    display = Linkedlist.birlestir();
    birlestirme.innerText = display.join(" ");
    total = Linkedlist.total();
    toplam.innerText = total;
});
