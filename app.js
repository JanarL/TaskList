const form = document.querySelector('#book-form');
const bookInput = document.querySelector('#title');
const bookInput2 = document.querySelector('#author');
const bookList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-books')
//console.log(filter);

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addBook);
    bookList.addEventListener('click', removeBook);

}

function addBook(event){
    if(bookInput.value === '' || bookInput2.value === '' ){
        alert('Add a book title and author!');
    }
    //create an li element
    const li = document.createElement('li');
    //assign a class name to the html element
    li.className = 'collection-item';
    //add text content to the li element
    li.appendChild(document.createTextNode((bookInput.value) + " - " + bookInput2.value));
    //create an anchor tag 
    const removeLink = document.createElement('a');
    //ad a class name to the removeLink element
    removeLink.className = 'delete-item secondary-content';
    removeLink.innerHTML = 'X';
    li.appendChild(removeLink);

    //add li element to the ul collection
    bookList.appendChild(li);
    
    //store the book in local storage
    storeInLocalStorage(bookInput.value + bookInput2.value);
    event.preventDefault();
}

function storeInLocalStorage(title, author){
    //declare an array to read from local storage
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    //add the user's book to the books array
    books.push(title, author);
    localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(event){
    //check if the area clicked contains a .delete-item element

    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the book?')){
            //remove the entire li element
            event.target.parentElement.remove();
        }
    }
}

