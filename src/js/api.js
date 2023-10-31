function removeAllPagination() {
    // Get the parent element with the ID "pagination"
var paginationDiv = document.getElementById("pagination");

// Get all the 'a' elements within the parent element
var aElements = paginationDiv.getElementsByTagName("a");

// Loop through the 'a' elements and remove them one by one
while (aElements.length > 0) {
    paginationDiv.removeChild(aElements[0]);
}

}
function removeProduct(){
    // Get all the elements with the class "product-list"
var productElements = document.getElementsByClassName("product-list");

// Loop through the elements and remove them one by one
while (productElements.length > 0) {
    var element = productElements[0];
    element.parentNode.removeChild(element);
}

}

function fetchDataFromAPI(apiUrl) {
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        return data; // Return the data from the API
      })
      .catch(error => {
        throw new Error('Fetch error: ' + error.message);
      });
  }
  

document.getElementById('search-btn').onclick = function(){updateContent(0)}
function updateContent(page){
    product = document.getElementById('search').value
    type = document.getElementById('type').value
    categoryName = document.getElementById('category').value
    tag = document.getElementById('tag').value
    minPrice = document.getElementById('minPrice').value
    maxPrice = document.getElementById('maxPrice').value
    minRating = document.getElementById('minRating').value
    maxRating = document.getElementById('maxRating').value
    

    // API Link:
    const API_URL = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${product}&product_type=${type}&product_category=${categoryName}&product_tags=${tag}&price_greater_than=${minPrice}&price_less_than=${maxPrice}&rating_greater_than=${minRating}&rating_less_than=${maxRating}`;
    console.log(API_URL)
    // Call the fetchDataFromAPI function
    fetchDataFromAPI(API_URL)
      .then(data => {
        // Handle the data from the API
        console.log(data.length)
        if(data.length > 0){
            removeAllPagination()
            removeProduct()

            paginationCount = Math.ceil(data.length / 12)
            console.log(paginationCount)

            if(paginationCount > 10){
                if(page===1){
                var anchor = document.createElement("a");
                anchor.setAttribute("onclick", `updateContent(${page-1})`);
                anchor.textContent = "<";
                document.getElementById('pagination').appendChild(anchor);
                }

                for (let i = 0; i < paginationCount; i++) {
                    if(i>page-4 && i<page+4){
                        var anchor = document.createElement("a");
                        anchor.setAttribute("onclick", `updateContent(${i})`);
                        anchor.textContent = i+1;
                        if(page == i){
                            anchor.classList.add('active')
                        }
                        document.getElementById('pagination').appendChild(anchor);
                    }
                }

                var anchor = document.createElement("a");
                anchor.setAttribute("onclick", `updateContent(${page+1})`);
                anchor.textContent = ">";
                document.getElementById('pagination').appendChild(anchor);

                var anchor = document.createElement("a");
                anchor.setAttribute("onclick", `updateContent(${paginationCount-1})`);
                anchor.textContent = "Last";
                document.getElementById('pagination').appendChild(anchor);

            }else{
                for (let i = 0; i < paginationCount; i++) {
                    var anchor = document.createElement("a");
                    anchor.setAttribute("onclick", `updateContent(${i})`);
                    anchor.textContent = i+1;
                    if(page == i){
                        anchor.classList.add('active')
                    }
                    document.getElementById('pagination').appendChild(anchor);
                }
            }
            for (let z=(page*12);z<(page*12)+12;z++) {
                
                // Create the product list container
                var productContainer = document.createElement("div");
                productContainer.className = "product-list";

                // Create the product image container
                var imageContainer = document.createElement("div");
                imageContainer.addEventListener('click',function(){
                    modalProductOpen(data[z]['name'],data[z]['description'],data[z]['image_link'],data[z]['product_link'],data[z]['price']);
                })
                imageContainer.className = "prod-image";
                var image = document.createElement("img");
                image.setAttribute('onerror', "this.src='image/404.png';");
                image.src = data[z]['image_link'];
                image.alt = "";
                imageContainer.appendChild(image);

                // Create the product detail container
                var detailContainer = document.createElement("div");
                detailContainer.className = "prod-detail";

                // Create the product name
                var productName = document.createElement("div");
                productName.className = "prod-name";
                var productNameLink = document.createElement("a");
                productNameLink.id = "prodName";
                productNameLink.textContent = data[z]['name'];
                productName.appendChild(productNameLink);

                var productBrand = document.createElement("div");
                productBrand.className = "prod-brand";
                var productBrandName = document.createElement("a");
                productBrandName.id = "prodBrand";
                productBrandName.textContent = data[z]['brand'];
                productBrandName.textContent
                productBrand.appendChild(productBrandName);

                // Create the price and rate container
                var priceRateContainer = document.createElement("div");
                priceRateContainer.className = "price-rate";

                // Create the price
                var price = document.createElement("div");
                price.id = "price";
                var priceLink = document.createElement("a");
                priceLink.id = "price";
                priceLink.textContent = "RM "+data[z]['price'];
                price.appendChild(priceLink);
                price.appendChild(document.createElement("br"));

                // Create the rate
                var rate = document.createElement("div");
                rate.id = "rate";
                ratingFloor = Math.floor(data[z]['rating'])
                for (var i = 0; i < ratingFloor; i++) {
                    var starImage = document.createElement("img");
                    starImage.src = "image/star.png";
                    starImage.alt = "";
                    rate.appendChild(starImage);
                }
                rate.appendChild(document.createTextNode(data[z]['rating']));

                // Create the button container
                var buttonContainer = document.createElement("div");
                buttonContainer.className = "btn";

                // Create the "Order" button
                var orderButton = document.createElement("a");
                orderButton.onclick = function(){
                    window.open(data[z]['product_link'],'_blank')
                } 
                orderButton.className = "btn-product flex-center";
                orderButton.textContent = "Order";

                // Create the website button
                var webButton = document.createElement("a");
                webButton.onclick = function(){
                    window.open(data[z]['website_link'],'_blank')
                } 
                webButton.className = "btn-web flex-center";
                var webImage = document.createElement("img");
                webImage.src = "image/website.png";
                webImage.alt = "";
                webButton.appendChild(webImage);

                // Append all elements to their respective containers
                priceRateContainer.appendChild(price);
                priceRateContainer.appendChild(rate);
                buttonContainer.appendChild(orderButton);
                buttonContainer.appendChild(webButton);
                detailContainer.appendChild(productName);
                detailContainer.append(productBrand)
                detailContainer.appendChild(priceRateContainer);
                detailContainer.appendChild(buttonContainer);

                productContainer.appendChild(imageContainer);
                productContainer.appendChild(detailContainer);

                // Append the product container to the document's body or another desired location
                document.getElementById('product').appendChild(productContainer);

            }

        }else{
            removeAllPagination()
            removeProduct()
            document.getElementById('search').value = 'No Product Found'
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('reload') == 'true') {
    modalToggle()
}

updateContent(0)