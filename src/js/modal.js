const { app, BrowserWindow } = require('electron');
const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');


// Readfile
let fileTopProduct = path.join(__dirname,'topProduct.txt')
function topProductDataNormal(){
  fs.readFile(fileTopProduct, 'utf-8', (err, data) => {
    let i = 0
      if (err) throw err;
      const line = data.split(',')
      return(line)
  })
}

async function topProductData() {
  try {
    const topProduct = await fsp.readFile(fileTopProduct, 'utf-8');
    const topProductArray = topProduct.split(',');
    return topProductArray
  } catch (err) {
    console.error(err);
    return [];
  }
}

// PopUp Top 5 List
async function showTopProduct(){
  (async () => {
    const result = await topProductData();
    console.log('show')
    let i = 0
    for(const data of result){
      i=i+1
      let index = i-1
      //Create Table Row
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');
      const input = document.createElement('input')
      input.name = index
      input.value = data
      input.setAttribute('disabled','true')
      input.addEventListener('keypress', function(event){
        if(event.key == "Enter"){
          event.preventDefault()
          editTopProduct(index)
        }
      })
      td1.textContent = i;
      td2.appendChild(input)
      const updateBtn = document.createElement('button')
      const deleteBtn = document.createElement('button')
      const divFlex = document.createElement('div')
      divFlex.className = 'flex-center'
      updateBtn.className = 'btn-update'
      deleteBtn.className = 'btn-delete'
      updateBtn.addEventListener('click', function() {
        showEdit(index);
      })
      deleteBtn.addEventListener('click', function() {
        deleteTopProduct(index);
      });

      divFlex.appendChild(updateBtn)
      divFlex.appendChild(deleteBtn)
      td3.appendChild(divFlex)
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3)
      document.querySelector('table#top-product tbody').append(tr)
    }
  })();
}

function clearTopProduct() {
  console.log('clear')
  const table = document.getElementById('top-product').querySelector('table');
  const tbody = table.querySelector('tbody');
  while (tbody.childNodes[1]) {
    tbody.removeChild(tbody.childNodes[1]);
    console.log('del')
  }
}

function update(data){
  fs.writeFile(fileTopProduct,data,(err)=>{
    if(err){
      console.log(err)
    }
  })
  return 'add'
}

// Edit Product
function showEdit(num){
  document.querySelector('input[name="'+num+'"]').removeAttribute('disabled')
}
function hideEdit(num,event){
  if(event.key == 'Enter'){
  document.querySelector('input[name="'+num+'"]').setAttribute('disabled','true')
  }
}

// Add Product
function addTopProduct(addData) {
  const tbody = document.querySelector('table#top-product tbody');
  const num = tbody.childElementCount;

  const newRowHTML = `
    <tr>
      <td>${num}</td>
      <td>
        <input value="${addData}" name="${num - 1}" disabled="true" onkeypress="hideEdit(${num - 1},event)")>
      </td>
      <td>
        <div class="flex-center">
          <button class="btn-update" onclick="showEdit(${num - 1})"></button>
          <button class="btn-delete" onclick="deleteTopProduct(${num - 1})"></button>
        </div>
      </td>
    </tr>
  `;

  tbody.innerHTML += newRowHTML;

  console.log('add');
  modalProductClose();
  modalToggle();
}



function deleteTopProduct(num){
  const tbody = document.querySelector('table#top-product tbody')
  tbody.removeChild(tbody.children[num+1])
}

const btn = document.getElementById('modal-btn');
const modal = document.getElementById('modal');
const main = document.querySelector('div.main');

btn.addEventListener('click', modalToggle)
//modal.addEventListener('click', modalClose)
window.onclick = modalClose()
function modalToggle() {
  modal.classList.add('show')
  main.classList.add('blur')
}
function modalClose(){
  modal.classList.remove('show');
  main.classList.remove('blur')
}

// PopUp Product
const modalProduct = document.getElementById('modal-product');
function modalProductOpen(name,desc,image,link,price) {
  console.log(link)
  modalProduct.classList.add('show')
  main.classList.add('blur')
  document.querySelector('div#top-desc h3#name').textContent = name
  //document.querySelector('div#top-desc h3#price').textContent = price
  document.querySelector('div#body-desc').textContent = desc
  document.querySelector('div#image-container img').src = image
  document.getElementById('add').onclick = function(){
    addTopProduct(name)
  }
  document.getElementById('shop').onclick = function(){
    window.open(link,'_blank')
  } 
}
function modalProductClose(){
  modalProduct.classList.remove('show');
  main.classList.remove('blur')
}

window.onclick = function(event) {
  if(modalProduct.className == 'show'){
    if (event.target === modalProduct) {
      modalProductClose(); 
    }
  }else{
    if (event.target === modal) {
      modalClose(); 
    }
  }
};
