var isApplied =0
var cart = JSON.parse(localStorage.getItem("cartproducts")) || [];
console.log(cart)
if (cart.length > 0) {
    displaycart(cart);
    countlen(cart);
    calcart(cart);
} else {
    document.getElementById("cartList").textContent = "NO ITEMS ADDED";;
}


function applypromo() {
  var promocodeinput = document.getElementById("applypromo").value;
  calcart(cart,promocodeinput);
}


function displaycart(cart) {

    document.getElementById("cartList").textContent = "";

    cart.map(function (elem, index) {
        let div = document.createElement("div")
        let imgDiv = document.createElement("div")
        let image = document.createElement("img")
        image.src = elem.img_url
        image.alt = elem.name
        imgDiv.append(image)

        let contentDiv = document.createElement("div")

        let nameDelDiv = document.createElement("div")
        nameDelDiv.setAttribute("id", "nameDel")


        let name = document.createElement("h3")
        name.textContent = elem.name

        let qtyDiv = document.createElement("div")
         qtyDiv.style.display = 'flex'
         qtyDiv.style.gap="10px"

        let plus = document.createElement("button")
        plus.innerText = "+"
        plus.addEventListener('click',()=>{
            add(elem)
        })
        qtyDiv.append(plus)

        let qty = document.createElement('p')
        qty.innerText = elem.quantity ||1
        qtyDiv.append(qty)

        let minus = document.createElement("button")
        minus.innerText = '-'
        minus.addEventListener('click',()=>{
            decrease(elem)
        })
        qtyDiv.append(minus)

        

        let del = document.createElement("p");
        del.textContent = "Delete";

        del.addEventListener("click", function () {
            deletetask(index);
        });

        nameDelDiv.append(name,qtyDiv, del, )

        let priceBox = document.createElement("div")
        priceBox.className = "pBox"

        let strickPrice = document.createElement("p")
        strickPrice.textContent = "MRP: " + elem.price

        let price = document.createElement("p")
        price.textContent = "Rs: " + elem.finalPrice

        priceBox.append(strickPrice, price)

        let dilv = document.createElement("p")
        dilv.textContent = "Delivery by Tomorrow, before 10:00 pm"

        contentDiv.append(nameDelDiv, priceBox, dilv)

        div.append(imgDiv, contentDiv)
        document.getElementById("cartList").append(div)
    })
}

function calcart(cart,coupon) {
    
    if(isApplied == 1){
        alert(" coupon already applied")
        return
    }
    var sum = cart.reduce(function (acc, curel) {
        return parseInt(acc) + parseInt(curel.total)
    }, 0);

    var mrpSum = cart.reduce(function (acc, curel) {
        return parseInt(acc) + parseInt(curel.price)
    }, 0);

    let total = document.getElementById("totalprice")
    total.textContent = sum;

    localStorage.setItem('carttm', sum);
    if(coupon =='masai30' && isApplied == 0){
        isApplied++
        sum = sum -(sum*0.3)
        localStorage.setItem('coupvalm', sum);
        alert("coupon applied successfully.")
    }else if(coupon?.length>0){
        alert("enter a valid coupon")
    }
    console.log(coupon)
    document.getElementById("totalV").textContent = sum
  
    document.getElementById("totalA").textContent = sum

    let mrpTotal = document.getElementById("mrpTotal").textContent = mrpSum
    console.log(sum/0.3)
}

function countlen(array) {
    document.getElementById("count").textContent = array.length;
}

function deletetask(index) {
    var rem = cart.splice(index, 1);
    localStorage.setItem("cartproducts", JSON.stringify(cart));
    location.reload();
    displaycart(cart);
    countlen(cart);
}

const add = (el) =>{
    //debugger
    let qty = el.quantity || 1
    let obj = cart.find((x)=>x.id == el.id)
    qty+=1
    obj['quantity'] = qty;
    obj['total'] =  +qty*+obj?.finalPrice
    console.log(cart,qty)
    localStorage.setItem("cartproducts", JSON.stringify(cart));
    // location.reload();
    displaycart(cart);
    calcart(cart)
    countlen(cart);

}

const decrease= (el)=>{
     let qty = el.quantity || 1
    let obj = cart.find((x)=>x.id == el.id)
    qty > 1 ? qty-=1 : qty=qty
    obj['quantity'] = qty;
    obj['total'] =  +qty*+obj?.finalPrice
    console.log(cart,qty)
    localStorage.setItem("cartproducts", JSON.stringify(cart));
    displaycart(cart);
    calcart(cart)
    countlen(cart);
    
}

