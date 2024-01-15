import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log( 'InitStore' );
}

const loadStore = () => {
    if( !localStorage.getItem('state') ) return;
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
};

const saveToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify( state ));
};

const getTodos = ( filter = Filters.All ) => {
     switch( filter ) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default :
            throw new Error(`Opcion ${filter} no es valido`);
     }
}

const addTodo = ( description ) => {
    if( !description ) throw new Error('Descripcion requerida');
    state.todos.push(  new Todo( description ) )
    
    saveToLocalStorage();
};

const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }
        return todo; 
    });
    
    saveToLocalStorage();
};

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    
    saveToLocalStorage();
};

const deleteCompleted = ( ) => {
    state.todos = state.todos.filter(todo => !todo.done );
    
    saveToLocalStorage();
};

const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    
    saveToLocalStorage();
};

const getCurrentFilter = () => {
    return state.filter;
};



export default{
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,    
    initStore,
    loadStore,
    saveToLocalStorage,
    setFilter,
    toggleTodo,
}