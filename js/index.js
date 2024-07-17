var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDes = document.getElementById("productDes");
var productCat = document.getElementById("productCat");
var productImg = document.getElementById("productImg");
var productSearch = document.getElementById("productSearch");
var productContainer = [];
if (localStorage.getItem("product") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("product"));
  displayData(productContainer);
}
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    des: productDes.value,
    cat: productCat.value,
    img: `images/${productImg.files[0].name}`,
  };
  productContainer.push(product);
  localStorage.setItem("product", JSON.stringify(productContainer));
  clear();
  displayData(productContainer);
}
function clear() {
  productName.value = null;
  productPrice.value = null;
  productDes.value = null;
  productCat.value = null;
  productImg.value = null;
}
function displayData(arr) {
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    container += `<div class="col-md-3">
                <div class="card w-100 h-100 border-3 border-light border rounded-3 p-1" >
                    <img src="${arr[i].img}" class="card-img-top img-thumbnail h-100" alt="...">
                    <div class="card-body">
                        <h4>Name: <span>${arr[i].name}</span></h4>
                        <h4>Price: <span>${arr[i].price}</span></h4>
                        <h4>Description: <span>${arr[i].des}</span></h4>
                        <h4>Category: <span>${arr[i].cat}</span></h4>
                        <button onclick="deleteProduct (${i})" type="button" class="btn btn-danger">Delete</button>
                        <button onclick="updateProduct (${i})" type="button" class="btn btn-info">Update</button>
                    </div>
                  </div>
            </div>`;
  }
  document.getElementById("demo").innerHTML = container;
}
function deleteProduct(index) {
  productContainer.splice(index, 1);
  displayData(productContainer);
  localStorage.setItem("product", JSON.stringify(productContainer));
}
// function updateProduct(index) {}
function search(term) {
  var term = productSearch.value;
  var searchContainer = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchContainer.push(productContainer[i]);
      displayData(searchContainer);
    }
  }
}
function validation(element) {
  var regex = {
    productName: /^[A-Z]\w{2,}/,
    productPrice: /^[1-9]\d{2,5}$/,
    productDes: /^[A-Z][a-z]{2,5}$/,
    productCat: /^(Laptop|Mobile|Screen)$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
