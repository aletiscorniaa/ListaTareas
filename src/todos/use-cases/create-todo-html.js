


export const createTodoHtml = ( todo ) => {
    if( !todo ) throw new Error('Un objeto TODO es necesario');
    
    const html = `<h1>${ todo.description }</h1>`;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;

    return liElement;
}