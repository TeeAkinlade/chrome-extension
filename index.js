let myLeads = [];
const inputEl = document.querySelector('.input-el');
const saveButtonEl = document.querySelector('.jsSaveBtn');
const tabButtonEl = document.querySelector('.tab-btn');
let ulEl = document.querySelector('.ul-el');
const deleteBtn =document.querySelector('.delete-btn')
const leadStorage = JSON.parse(localStorage.getItem('myLeads'))

/* storing the data into local storage */
if (leadStorage) {
  myLeads = leadStorage;
  render(myLeads);
}

tabButtonEl.addEventListener('click', function() {
  // chrome API that fetch the current url using of the active page
  chrome.tabs.query({ currentWindow:true, active: true}, function(tabs){
    const newUrl = tabs[0].url
      myLeads.push(newUrl)
      // console.log(myLeads.push(newUrl))

  localStorage.setItem('myLeads', JSON.stringify(myLeads))
  render(myLeads);
    }
  )
  
})

deleteBtn.addEventListener('dblclick', function(){
  localStorage.clear();
  myLeads = [];
  ulEl.innerHTML = ''; //clears the DOM
})

saveButtonEl.addEventListener('click', function () {
  myLeads.push(inputEl.value);
  inputEl.value = ''
  localStorage.setItem('myLeads',
    JSON.stringify(myLeads))
  render(myLeads);
})

function render(leads) {
  let itemList = ''
for (let i = 0; i < leads.length; i++){
  itemList += `<li><a href="${leads[i]}" target="_blank">
                ${leads[i]}</a></li>`
  //alternative way of creating a li items 
  // const li = document.createElement('li');
  // li.textContent = myLeads[i];
  // ulEl.append(li)
  ulEl.innerHTML = itemList;
}
}

