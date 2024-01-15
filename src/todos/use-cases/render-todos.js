import { createTodoHtml } from "./create-todo-html";

let element;

export const renderTodos = ( elementId, todos = [] ) => {

    if( !element )
        element = document.querySelector(  elementId );
    
    
    if( !element ) throw new Error(`Element ${ elementId } not found`);

    //Purgar contenido
    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHtml( todo ) );
    })
}