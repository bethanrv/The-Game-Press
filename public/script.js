var cart = []
 	
var products = {}

class Product{
	constructor(id, name, price){
		this.id = id
		this.name = name
		this.price = price
	}
}

// On Load
window.addEventListener('load', ()=>{
	console.log('loading')

	addProducts()

	addCartListener()

	addProductListener()

	//check cookie
	if(getCookie('status') && getCookie('status')=='accepted' ){
		document.getElementById('footer').style.display = 'none'
	}
})

function addProducts(){
	products[1] = new Product(1, 'Orc Boss', '24.99')
	products[2] = new Product(2, 'Marine Soldier', '19.99')
	products[3] = new Product(1, 'Marine Commander', '19.99')
	products[4] = new Product(1, 'Mutant Warrior', '39.99')
	products[5] = new Product(1, 'Rat Mage', '29.99')
	products[6] = new Product(1, 'Lunar Gunner', '24.99')
	products[7] = new Product(1, 'Emerald Tank', '34.99')
	products[8] = new Product(1, 'Skull Army', '39.99')
	products[9] = new Product(1, 'Dark Allies', '24.99')
	products[10] = new Product(1, 'Lunar Troopers', '49.99')
	products[11] = new Product(1, 'Lunar Snipers', '24.99')
	products[12] = new Product(1, 'Jar Heads', '29.99')
}
	
function addCartListener(){
	document.getElementById('cart').onmouseover = () => {
		document.getElementById('cartIcon').style.display = 'none';
		document.getElementById('cartTxt').style.display = 'flex';
	}
	document.getElementById('cart').onmouseleave = () => {
		document.getElementById('cartIcon').style.display = 'flex';
		document.getElementById('cartTxt').style.display = 'none';
	}
} 

function acceptCookie(){
	document.getElementById('footer').style.display = 'none'
	setCookie('status', 'accepted', 365)
}

function addProductListener(){
	var products = document.getElementsByTagName('product')
	for(var p in products){
		var product = products[p]
		let id = product.id
		product.onclick = ()=> { addProduct(id) }
	}
}

function addProduct(id){

	var text = document.getElementById(id).childNodes[3]

	var origText = text.innerHTML

	text.innerHTML = ' - Added To Cart - '
	text.style.color ='dodgerblue'


	setTimeout(()=>{
		text.innerHTML = origText
		text.style.color ='black'
	},2000)

	var productID = id.substring(id.indexOf('-')+1)
	cart.push(id)
	if(cart.length > 0) document.getElementById('cart').style.display = 'flex'
	document.getElementById('cartTxt').innerHTML = cart.length

	addCartItemsContainerHTML()
}

function addCartItemsContainerHTML(){
	document.getElementById('cartItemsList').innerHTML = ''
	document.getElementById('cartTxt').innerHTML = cart.length
	var itemsHTML = ''
	var productsAdded = []
	var total = 0
	for(var i in cart){
		console.log(cart[i])
		var productID = cart[i].substring(cart[i].indexOf('-')+1)
		var product = products[productID]
		total += parseFloat(product.price)
		if(!productsAdded.includes(cart[i])){
			productsAdded.push(cart[i])
			var addedCount = instancesOf(cart, cart[i])
			var subtractBtn = "<i id='cartRemover-" + productID + "' onclick='removeCartItem(id)' class='material-icons' style='color:#ff0037; margin-left:2vw; margin-right:2vw; cursor:pointer;'> remove_circle_outline </i>"
			itemsHTML += "<p id='cartItem-" + productID + "' style='display:flex; justify-content:space-between; align-items:center; width: 90%;'>" + addedCount +' - $' + product.price + ' - ' + product.name + subtractBtn + ' </p>'
		}
	}
	total = (Math.trunc(total*100))/100
	itemsHTML += '<p> Total - $'+total+' </p>'
	document.getElementById('cartItemsList').innerHTML = itemsHTML

	if(total > 0){
		document.getElementById('checkoutBtn').style.display = 'block'
	}
	else
		document.getElementById('checkoutBtn').style.display = 'none'

}

function openCart(){
	document.getElementById('cartItemsContainer').style.display = 'flex'
}

function closeCart(){
	document.getElementById('cartItemsContainer').style.display = 'none'
}

function instancesOf(arr, target){
	var count = 0
	for(var i in arr){
		if(arr[i] == target)
			count++
	}
	return count
}

function cartPop(){

	var timeLimit = 3000

	var expandInterval = setInterval(expandCart(), 10)

	setTimeout(()=>{
		clearInterval(expandInterval)
	},3000)
}

function expandCart(){
	var width = document.getElementById('cart').style.offsetWidth
	document.getElementById('cart').style.width = width + 1
	document.getElementById('cart').style.hieght = width + 1

}

function removeCartItem(id){
	var productID = id.substring(id.indexOf('-')+1)
	console.log(productID)
	//get current count...
	var productCount = instancesOf(cart, 'product-' + productID)
	console.log(productCount)
	cart.splice(cart.indexOf('product-'+productID),1)
	addCartItemsContainerHTML() //rerender
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}