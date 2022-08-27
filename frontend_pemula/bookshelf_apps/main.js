// AUTHOR: DWI WALUYO PUTRANTO
// Bookshelf Apps for IDCAMP x Dicoding (React Developer)

const books = [];
const RENDER_EVENT = "render-book";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  // load data from local storage if exist
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function addBook() {
  let bookObject;
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  const generateID = generateId();
  isComplete
    ? (bookObject = generateBookObject(generateID, title, author, year, true))
    : (bookObject = generateBookObject(generateID, title, author, year, false));

  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
}

function addBookToUncompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
}

function searchBooks(event) {
  event.preventDefault();
  const textSearch = document.getElementById("searchBookTitle").value;
  const searchAllItems = document.getElementsByClassName("card-title");

  if (textSearch.replace(/\s+/g, "") !== "") {
    // remove space in text
    const textSearchRE = new RegExp(textSearch, "gi");

    for (let searchAllItem of searchAllItems) {
      if (searchAllItem.textContent.match(textSearchRE) == null) {
        searchAllItem.parentElement.parentElement.style.display = "none";
      } else {
        searchAllItem.parentElement.parentElement.style.display = "block";
      }
    }
  } else {
    // if searh text is null then show all items
    // console.log(searchAllItems);
    for (let searchAllItem of searchAllItems) {
      searchAllItem.parentElement.parentElement.style.display = "block";
    }
  }
}

function makeBook(bookObject) {
  const textTitle = document.createElement("h5");
  textTitle.classList.add("card-title");
  textTitle.innerText = bookObject.title;

  const textAuthor = document.createElement("p");
  textAuthor.classList.add("card-text");
  textAuthor.innerText = "Penulis: " + bookObject.author;

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun: " + bookObject.year;

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "mb-3");
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("card-body");
  cardContainer.appendChild(itemContainer);
  itemContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(cardContainer);
  container.setAttribute("id", `book-${bookObject.id}`);

  if (bookObject.isCompleted) {
    const undoneButton = document.createElement("button");
    undoneButton.classList.add("btn", "btn-success", "me-2");
    undoneButton.innerHTML =
      "<i class='bi bi-arrow-counterclockwise'></i>&nbsp;Belum selesai dibaca";
    undoneButton.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("btn", "btn-danger");
    trashButton.innerHTML = "<i class='bi bi-x-circle'></i>&nbsp;Hapus buku";
    trashButton.addEventListener("click", function () {
      if (confirm("Yakin ingin menghapus?")) {
        removeBook(bookObject.id);
        alert("Buku Terhapus");
      } else alert("Dibatalkan");
    });

    itemContainer.append(undoneButton, trashButton);
  } else {
    const doneButton = document.createElement("button");
    doneButton.classList.add("btn", "btn-success", "me-2");
    doneButton.innerHTML =
      "<i class='bi bi-check2-circle'></i>&nbsp;Selesai dibaca";
    doneButton.addEventListener("click", function () {
      addBookToUncompleted(bookObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("btn", "btn-danger");
    trashButton.innerHTML = "<i class='bi bi-x-circle'></i>&nbsp;Hapus buku";
    trashButton.addEventListener("click", function () {
      if (confirm("Yakin ingin menghapus?")) {
        removeBook(bookObject.id);
        alert("Buku Terhapus");
      } else alert("Dibatalkan");
    });

    itemContainer.append(doneButton, trashButton);
  }

  return container;
}

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  incompleteBookshelfList.innerHTML = "";

  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  completeBookshelfList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) incompleteBookshelfList.append(bookElement);
    else completeBookshelfList.append(bookElement);
  }
});
