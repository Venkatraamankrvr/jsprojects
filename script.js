'use strict';
console.log('todolist');
// selecting the dom elements...
// const alertMessage = document.querySelector('#message');
const itemForm = document.querySelector('#itemform');
const itemInput = document.querySelector('#iteminput');
// const active = document.querySelector('.active');
const itemsList = document.querySelector('#itemslist');
const filters = document.querySelectorAll('.nav-item');



// creating an empty itemslist.
let todoItems = [];

// to get the itemlist fro localstorage to UI
const getList = (todoItems)=>{
  // at intial stage of loading a page the itemlist must be empty string
  itemsList.innerHTML = '';
  if(todoItems.length > 0){
    // then we fetch the itemlist in localstorage and display it in ui
    todoItems.forEach((item) => {
      let liTag = `
      <li class="list-group-item d-flex         justify-content-between align-items-center">
      <span>${item.name}</span>
        <span>
        <a><i class="bi bi-check-circle green"></i></a>
        <a><i class="bi bi-pencil-square blue"></i></a>
        <a><i class="bi bi-x-circle red"></i></a>
        </span>
      </li>
      `;
      // let element = `${item.name}`
      
      // itemsList.insertAdjacentElement('beforeend',);
      
      //  console.log();
      itemsList.insertAdjacentHTML('beforeend',liTag);
    });
      
    }
    
    
  }
  
  // get items from local storage
  const getLocalStorage = function(){
    const todoStorage = localStorage.getItem('todoItems');
    // if the input is empty..
    if(todoStorage === 'undefined' || todoStorage === null)
    {
      todoItems = [];
    }
    // if the input is added ,then make the todoStorage from string to object by using json.parse and store in todoItems
    
    else{
      todoItems = JSON.parse(todoStorage);
    }
    console.log('items',todoItems);
    getList(todoItems);
  }
  
  // setting the local storage
  const setLocalStorage = (todoItems)=>{
    
    localStorage.setItem('todoItems',  JSON.stringify(todoItems) );
    // console.log(setLocalStorage(todoItems));
  }
  
  
  // addding the addeventlistner to whole doc
  
  document.addEventListener('DOMContentLoaded',()=>{
    itemForm.addEventListener('submit',(e)=> {
      e.preventDefault();
      const itemName = itemInput.value.trim();
      if(itemName.length === 0)
      {
        alert('Please Enter the Task');
      }
      else{
        const itemObj = {
          name : itemName,
          isDone : false,
          addedAt: new Date().getTime() 
        };
        // to add the itemObj to the todoItems empty array
        todoItems.push(itemObj);
        // pushing the itemObj to local storage by calling the function
        setLocalStorage(todoItems);
        
        // console.log(itemObj.addedAt)
      }
    })
    // as soon as dom content loaded the this function is to be called
    
    getLocalStorage();
  })
  // console.log(todoItems);
  