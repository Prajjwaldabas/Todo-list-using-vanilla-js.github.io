

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

// selectors
const taskform = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const Total= document.getElementById("All-tasks");
const Completed= document.getElementById("Completed-tasks");
const Pending= document.getElementById("Pending-tasks");
const showtasks= document.getElementsByClassName("tasklist-container")[0];
const No_of_total = document.getElementById('total')
const No_of_completed=document.getElementById("completed");
const No_of_pending=document.getElementById("pending");
const dark_mode= document.getElementById("dark-mode");
const element = document.getElementById("body");
const clearAll= document.getElementById("clear");
const tasklist=document.getElementsByClassName("task-container");

//event listeners
showtasks.addEventListener("click",removelist);
taskform.addEventListener("submit", handleSubmit);
Total.addEventListener("click",showalltasks);
Completed.addEventListener("click",showalltasks);
Pending.addEventListener("click",showalltasks);
dark_mode.addEventListener("click",darkmode);
clearAll.addEventListener("click",ClearAll);


// function for clear all task
function ClearAll(){
  const list=document.querySelectorAll(".task-container")
  list.forEach((elem) => elem.remove());
  No_of_total.textContent=0;
  No_of_completed.textContent=0;
  No_of_pending.textContent=0;
}



// function to handle submit form
function handleSubmit(e) {
  e.preventDefault();

  if (taskInput.value != "")
    addTodo(taskInput.value);

  taskInput.value = "";
}

//function to add todo item in the list
function addTodo(todo) {
  No_of_total.textContent = +No_of_total.textContent + 1;
  No_of_pending.textContent = +No_of_pending.textContent + 1;
  let ul = document.querySelector("ul");
  let li = document.createElement("li");


 //  creating neccessary elements    ////////////////////////

  //creating li  
  li.classList.add("task-container");
  ul.appendChild(li);


  //creating checkbox
  let checkbox=document.createElement("input");
  checkbox.type="checkbox";
  checkbox.setAttribute("id","checkbox")
  li.appendChild(checkbox);


  //creating text-input
  let input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.type = "text"
  input.value = todo;
  input.classList.add("todo-name")
  li.appendChild(input);


  //creating edit button
  const editbtn = document.createElement("button");
  editbtn.innerHTML = `<i class="fa-regular fa-pen-to-square fa-2x" ></i>`
  editbtn.classList.add("edit");
  li.appendChild(editbtn);
  const save = document.createElement('button');
  li.appendChild(save);


  //creating delete button
  const delbtn = document.createElement("button");
  delbtn.innerHTML = `<i id="delete-Btn" class="delete fa-regular fa-trash-can fa-2x "><i/> `
  delbtn.classList.add("delete");
  li.appendChild(delbtn);


  //handling event for edit the todo task
  editbtn.addEventListener("click", (e) => {
    //     console.log(e.target.parentElement);
    if (e.target.parentElement === editbtn) {
      console.log(e.target.parentElement);
      input.removeAttribute("readonly", "readonly");
      input.focus();
      save.innerHTML = `<h2>Save</h2>`
      editbtn.style.display = "none"
      save.style.display = "block";
    }
  })


  // handling event for re-edit the task and save it again
  save.addEventListener("click", (e) => {
    console.log(e.target.parentElement)
    if (e.target.parentElement === save) {
      input.setAttribute("readonly", "readonly");
      save.style.display = "none";
      editbtn.style.display = "block";
    }
  })


 //handling event for line-through the text
 checkbox.addEventListener('change', function () {
  if (this.checked){
    No_of_completed.textContent = +No_of_completed.textContent + 1;
   No_of_pending.textContent = +No_of_pending.textContent - 1;
  li.style.textDecoration = 'line-through';
  li.style.opacity= 0.5;
  editbtn.style.display="none";
  li.classList.add('transition');
  
  }
  else{
    No_of_completed.textContent = +No_of_completed.textContent - 1;
    No_of_pending.textContent = +No_of_pending.textContent + 1;
  li.style.textDecoration = 'none';
  li.style.opacity= 1;
  li.classList.remove("transition");
  editbtn.style.display="block";
  }

});

}
//addtodo function ends here/////////////////////////




//function to show tasks according to user desire
  function showalltasks(e){

    // getting all the lists of task
const todos=showtasks.childNodes;
todos.forEach(function(todo){
 if(todo.nodeName==="LI"){
  switch(e.target.value){

    case "Total": 

    Total.classList.add('active-day');

    // check if other button is already active and toggle the class
    if(Completed.classList.contains('active-day')){
        
      Completed.classList.remove('active-day');
    }
    if(Pending.classList.contains('active-day')){
    
      Pending.classList.remove('active-day');
    } 

// displaying all tasks
    todo.style.display="flex";

      break;

      case "Completed":

        Completed.classList.add('active-day');

      // check if other button is already active and toggle the class
        if(Total.classList.contains('active-day')){
        
          Total.classList.remove('active-day');
        }
        if(Pending.classList.contains('active-day')){
        
          Pending.classList.remove('active-day');
        } 

// displaying completed tasks
      if(todo.classList.contains('transition')){
        
        todo.style.display="flex";
      }
      else{
        todo.style.display="none";

      }
      break;
      
      case "Pending":
       
        Pending.classList.add('active-day');

        // check if other button is already active and toggle the class
        if(Total.classList.contains('active-day')){
        
          Total.classList.remove('active-day');
        }
        if(Completed.classList.contains('active-day')){
        
          Completed.classList.remove('active-day');
        } 

// displaying pending tasks
        if(!todo.classList.contains('transition')){
          
          todo.style.display="flex"
        }
        else{
          todo.style.display="none";
        }
        break;
  }
  }
})


  }



/// function to delete an specific task
function removelist(e){
  const item= e.target;
  if(item.classList[0]==="delete"){
    const elem=item.parentElement;
    const parent= elem.parentElement;
    const inputcheckbox=parent.childNodes[0];

    // updating tasks count after deletion
    No_of_total.textContent = +No_of_total.textContent - 1;
    if(inputcheckbox.checked){
      No_of_completed.textContent = +No_of_completed.textContent - 1;
    }
    else{
      No_of_pending.textContent = +No_of_pending.textContent - 1;
    }
  
    parent.classList.add("transitionend");
    parent.addEventListener('webkitTransitionEnd',function(e){
      
      parent.remove();
      console.log("elemnt remove");
    })
   
  }
}

// function to enable darkmode
function darkmode(e){
  if(e.target.classList[0]==="material-symbols-outlined"){
    
    if(element.className!="night"){

 e.target.childNodes[1].innerHTML=`<p>Night Mode</p>`
      element.removeAttribute("id");
      element.classList.add("night");
      
      }
else{
  e.target.childNodes[1].innerHTML=`<p>Day Mode</p>`
  element.classList.remove("night");
element.setAttribute("id","body");
  
}
   }
    
  }
});

console.log("script is running");



















