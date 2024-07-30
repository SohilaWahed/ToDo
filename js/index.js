let taskInput = document.querySelector('#taskInput');
let todoButton = document.querySelector('#todo-button');
let todosContainer = document.querySelector('#todos-container')
let searchInput = document.querySelector('#searchInput')
let mySelect = document.querySelector('#mySelect')

todoButton.addEventListener('click', function (e) {
    taskInput.value != '' ? addTodo():'' 
})

searchInput.addEventListener('input', function (e) {
    search()
})


mySelect.addEventListener('change' , function (e) {
    filteration(mySelect.options[mySelect.options.selectedIndex].value)
})


let todoList = []
if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'))
    displayTodos(todoList);
}

function addTodo() {
    let todo = {
        id: taskInput.value.trim().toLowerCase(),
        isCompleted:false
    }
    todoList.push(todo)
    localStorage.setItem("todoList", JSON.stringify(todoList))
    clear()
    displayTodos(todoList)
}

function displayTodos(list) {
    let cartona = ''
    for (let i = 0; i < list.length; i++) {
        cartona += `<div class="col-11 todo ${list[i].isCompleted == true ? "completed" : ""}">
              <div class="row bg-dark">
                <div class="col-8  py-3 fs-5 text-capitalize ">${list[i].id}</div>
                <div class="col-2  py-3 bg-success d-flex justify-content-center" id = "completed-mark" onclick="isCompletedOrNot('${list[i].id}')"><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
                <div class="col-2  py-3 bg-danger d-flex justify-content-center" id = "deleted-mark" onclick = "deleteTodo('${list[i].id}')"><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
              </div>
            </div> `
    }
    todosContainer.innerHTML = cartona;
}

function clear() {
    taskInput.value = ''
}

function search() {
    let result = todoList.filter(todo => todo.id.trim().toLowerCase().includes(searchInput.value.trim().toLowerCase()));
    displayTodos(result)
    //result will appear when write the same nameoftodo
    // result = todoList.filter( todo =>( todo.id === searchInput.value.trim()))
}


// m4 hn3rf n3ml addEventListener 3la completed & deleted 34an m4 thabten
function isCompletedOrNot(todoName) {
    // I must sure that todoName is unique
    let todoIndex = todoList.findIndex(todo => todo.id === todoName)
    todoList[todoIndex].isCompleted = todoList[todoIndex].isCompleted == false ? true : false 
    localStorage.setItem("todoList",JSON.stringify(todoList))
    displayTodos(todoList)  
}

function deleteTodo(todoName) {
    let todoIndex = todoList.findIndex(todo => todo.id === todoName)
    todoList.splice(todoIndex, 1);
    localStorage.setItem("todoList",JSON.stringify(todoList))
    displayTodos(todoList)  
}

function filteration(order) {
    console.log(order);
    let result = []
    switch(order){
        case 'all':
            displayTodos(todoList)
            break;
        case 'completed':
            result = todoList.filter(todo =>(todo.isCompleted == true))
            displayTodos(result)
            break;
        case 'uncompleted':
            result = todoList.filter(todo =>(todo.isCompleted == false))
            displayTodos(result)
    }
}