import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const elementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( elementIDs.TodoList, todos );
    }

    //Cuando la funcion app se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector( elementIDs.NewTodoInput );
    const TodoListUL = document.querySelector( elementIDs.TodoList );
    const ClearCompletedButton = document.querySelector( elementIDs.ClearCompleted );


    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    })

    TodoListUL.addEventListener( 'click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    TodoListUL.addEventListener( 'click', (event) => {
        const isForDestroy = event.target.className === 'destroy';        
        const element = event.target.closest('[data-id]');
        if( !element || !isForDestroy ) return;
        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
        
    });

    ClearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })
}