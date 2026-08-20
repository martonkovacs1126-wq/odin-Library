const myLibrary = [];
let globalId = 0;

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  return newBook;
}
const form = document.querySelector("#addbook");

function addNewBook(title, author, pages, read) {
    const newBook = addBookToLibrary(title, author, pages, read);
    const data = document.createElement("div");
    data.className = `card ${globalId}`;
    data.dataset.id = newBook.id;
    data.innerHTML = `<p class="id">${newBook.id}</p>
        <p class="title">Title:</p>
        <p id="title">${newBook.title}</p>
        <p class="author">Author:</p>
        <p id="author">${newBook.author}</p>
        <p class="pages">Number of pages:</p>
        <p id="pages">${newBook.pages}</p>
        <label class="switch" for="read-status">Have you read it?</label>
        <input type="checkbox" id="read-status" ${newBook.read ? "checked" : ""}>
        <button class="deletebtn">Delete</button>`;
        const toggleInput = data.querySelector("#read-status");
        toggleInput.addEventListener("change", () => {
          newBook.toggleRead(); // Meghívja a prototípuson lévő metódust
          console.log("Frissített könyvtár:", myLibrary);
        });
    document.querySelector(".cardcontainer").appendChild(data);
    globalId++;
}

addNewBook("My first book", "I have no idea", 502, true);
addNewBook("My second book", "I have no idea", 404, false);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readCheck = document.getElementById("read").value;
    let read = true;
    if (readCheck === "true") read = true;
    else read = false;
    let isRead = false;
    if (read === "true") isRead = true;
    else isRead = false;
    addNewBook(author, title, pages, isRead);
    form.reset();
});

// ESEMÉNYDELEGÁLÁS (Most már tökéletesen működik!)
const cardContainer = document.querySelector(".cardcontainer");

cardContainer.addEventListener("click", (e) => {
  // Most már megtalálja, mert class="deletebtn"-t kapott a gomb!
  if (e.target.classList.contains("deletebtn")) {
    const card = e.target.parentElement;
    
    // Törlés a myLibrary tömbből az elmentett dataset.id alapján
    const bookId = card.dataset.id;
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }

    // Törlés a képernyőről (DOM)
    card.remove();
    console.log("Könyv törölve! Maradék könyvtár:", myLibrary);
  }
});