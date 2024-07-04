<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TO DO</title>
    <style>
        .btn{
    cursor: pointer;
}
.todo-item{
    max-width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 9px;
}
    </style>
</head>
<body>
    <h1>TO DO LIST</h1>
    <form action="">
        <div>
            <input type="text" value="" class="todoValue">
            <button class="btn">Add Todo</button>
        </div>
        <div class="todoLists">
            <!-- List will be populated dynamically by JavaScript -->
        </div>
    </form>
    <script>
        let temp = [];

        const todoLists = document.querySelector(".todoLists");
        const listvalue = document.querySelector('.todoValue');

        const addTODOListLocalStorage = function(list) {
            localStorage.setItem('internship', JSON.stringify(list));
        }

        const getToDOListLocalStorage = function() {
            return JSON.parse(localStorage.getItem("internship")) || [];
        }

        const addTodoList = function() {
            let todolistvalue = getToDOListLocalStorage();
            let newTodo = listvalue.value.trim();
            listvalue.value = "";
            if (!todolistvalue.includes(newTodo) && newTodo.length !== 0) {
                temp.push(newTodo);
                addTODOListLocalStorage(temp);
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo-item');

                const lielement = document.createElement('li');
                lielement.textContent = newTodo;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');

                todoDiv.appendChild(lielement);
                todoDiv.appendChild(deleteBtn);

                todoLists.appendChild(todoDiv);
            }
        }

        function showtodolist() {
            let data = getToDOListLocalStorage();
            temp = [...data];
            if (data.length !== 0) {
                data.forEach(function(current_todo) {
                    const todoDiv = document.createElement('div');
                    todoDiv.classList.add('todo-item');

                    const lielement = document.createElement('li');
                    lielement.textContent = current_todo;
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.classList.add('delete-btn');

                    todoDiv.appendChild(lielement);
                    todoDiv.appendChild(deleteBtn);

                    todoLists.appendChild(todoDiv);
                });
            }
        }

        // Event listener for adding TODO item
        document.querySelector('.btn').addEventListener('click', function(e) {
            e.preventDefault();
            addTodoList();
        });

        // Event delegation for delete button
        todoLists.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-btn')) {
                const todoItem = e.target.parentElement;
                const todoText = todoItem.querySelector('li').textContent;
                const index = temp.indexOf(todoText);
                if (index !== -1) {
                    temp.splice(index, 1);
                    addTODOListLocalStorage(temp);
                }
                todoItem.remove();
            }
        });

        showtodolist();
    </script>
</body>
</html>
