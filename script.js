const inputElement = document.getElementById('input');
const ulElement = document.getElementById('list');

let todoList = []
//upgradeView()



inputElement.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        todoList.unshift({
            content: inputElement.value,
            done: false,
            selected: false
        })
        inputElement.value = '';

        upgradeView();
    }
    
})


function upgradeView () {
    ulElement.innerHTML = '';

    for (let index = 0; index < todoList.length; index++) {
        const todoItem = todoList[index];
        
        const liElement = document.createElement('li');
        liElement.className = 'list-group-item';
        ulElement.append(liElement);

        const divElement = document.createElement('div');
        divElement.className = 'form-group form-check';
        liElement.append(divElement);

        const checkboxElement = document.createElement('input');
        divElement.append(checkboxElement);
        checkboxElement.type = 'checkbox';
        checkboxElement.className = 'form-check-input';
        checkboxElement.id = 'todoItem' + index;
        checkboxElement.checked = todoItem.selected;

        const labelElement = document.createElement('label');
        divElement.append(labelElement)
        labelElement.className = 'form-check-label';
        if (todoItem.done) {
            labelElement.className += ' todoDone';
        }
        labelElement.setAttribute ('for', 'todoItem' + index);
        labelElement.innerText = todoItem.content;

        const buttonDoneElement = document.createElement('button');
        divElement.append(buttonDoneElement);
        buttonDoneElement.type = 'button';
        buttonDoneElement.className = 'btn btn-outline-primary';
        buttonDoneElement.innerText = 'Done';

        const buttonRemoveElement = document.createElement('button');
        divElement.append(buttonRemoveElement);
        buttonRemoveElement.type = 'button';
        buttonRemoveElement.className = 'btn btn-outline-danger';
        buttonRemoveElement.innerText = 'Remove';

        buttonDoneElement.addEventListener('click', () => {
            todoItem.done=!todoItem.done;
            upgradeView();
        });

        checkboxElement.addEventListener('change', () => {
            todoItem.selected = checkboxElement.checked;
        })

        buttonRemoveElement.addEventListener('click', () => {
            todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem)
            upgradeView();
        })
    }
}
 document.getElementById('doneAction').addEventListener('click', () => {
    for (const todoItem of todoList) {
        if (todoItem.selected) {
            todoItem.done = true;
            todoItem.selected = false;
        }
    }

    upgradeView();
})

document.getElementById('restoreAction').addEventListener('click', () => {
        for (const todoItem of todoList) {
            if (todoItem.selected) {
                todoItem.done = false;
                todoItem.selected = false;
            }
        }
    upgradeView();
})

document.getElementById('removeAction').addEventListener('click', () => {
    todoList = todoList.filter(todoItem => !todoItem.selected);
    upgradeView();
})

document.getElementById('test').addEventListener('click', () => {
    for (const todoItem of todoList) {
        todoItem.selected = true;
    }
    upgradeView();
});
