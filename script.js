const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");
// list of peoples
const richestPeople = [
  "Jeff Bezos",
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffett",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
  "Mukesh Ambani",
];
// use to store and scramble the list of stored array
const listItems = [];

let dragStartIndex;

createList();
 
function createList(){
  [...richestPeople]
  .map((a)=>({value : a,sort : Math.random()}))
  // sorting the array in random order at each time of refreshing.
  .sort((a,b)=> a.sort - b.sort)
  // for getting the  exact values.
  .map(a => a.value)
  .forEach((person,index)=>{
    // creating the new element 1
  const listItem = document.createElement('li');  
// adding the class
listItem.classList.add("over");



// creating an attribute 2
listItem.setAttribute('data-index',index) // custom arrtibute should start with index.
listItem.innerHTML = `
<span class = "number">${index + 1}</span>
<div class = "draggable" draggable = "true">
 <p class = "person-name">${person}</p>
 <i class="fas fa-grip-lines"></i>
</div>
`;
// pushing all the elements in the empty array
listItems.push(listItem);
// adding to dom the array
draggable_list.appendChild(listItem);
})
addEventListener();

}
function dragStart() {
  // console.log('Event: ', 'dragstart');
  // to attach the closest li tag which is near to draging and dataindex is to fetch the index over which we are calling for name
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  // to making the background darker
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  // to removing the background darker

  this.classList.remove('over');
}
function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
// swapping the items from start to end index.
  swapItems(dragStartIndex, dragEndIndex);
// removing the over
  this.classList.remove('over');

}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
// here the real swapping was happened by swapping by appendchild
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  // to checking the order is right or not
  listItems.forEach((listItem, index) => {
    // here we contain the draggable which contains only the person name
      const personName = listItem.querySelector('.draggable').innerText.trim();
// if the index of orginal list and this is not match...
      if (personName !== richestPeople[index]) {
          listItem.classList.add('wrong');
      }
      else {
          listItem.classList.remove('wrong');
          listItem.classList.add('right');
      }
  })
}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
  })
}


check.addEventListener("click", checkOrder);