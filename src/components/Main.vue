<template>
  <div class="container">
    <div class="popup-container">
      <button class="close" @click="close">x</button>
      <p class="text"></p>
    </div>
    <form class="form" v-on:submit.prevent="search()" @click="returnFirst()">
      <input type="text" v-model="newBook" />
      <button>Search</button>
    </form>

    <paginate
      v-model="page"
      :page-count="10"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :click-handler="click"
      no-li-surround
      :container-class="'pagination'"
      :page-link-class="'pagination_link'"
    ></paginate>
    <section class="item-container">
      <div class="image-block" v-for="product in products" :key="product.title">
        <a class="more" @click="showInfo(product)">
          <img src="../img/icons/description.svg" height="20px" alt />
        </a>

        <a class="read" :href="read(product)" target="_blank">
          <img src="../img/icons/book.svg" height="25px" alt />
        </a>

        <img
          :src="
            product.volumeInfo.imageLinks
              ? product.volumeInfo.imageLinks.thumbnail
              : immg
          "
          alt
        />
        <p>{{ product.volumeInfo.title }}</p>
        <address>{{ product.volumeInfo.authors ? product.volumeInfo.authors.join() : '' }}</address>
        <button id="addBtn" @click="addBook(product.id)">Add</button>
        <a class="buy" :href="product.saleInfo.buyLink" target="_blank">
          <img
            :src="product.saleInfo.buyLink 
              ? cart 
              :  ''"
            height="20px"
          />
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    book: require("../img/icons/book.svg"),
    cart: require("../img/icons/shopping-cart.svg"),
    page: 1,
    pages: 0,
    products: [],
    newBook: null,
    books: [],
    immg: require("../img/book.png")
  }),

  methods: {
    search() {
      this.products = [];
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.newBook}+title&startIndex=${this.pages}&maxResults=10`
      )
        .then(response => response.json())
        .then(result =>
          result.items.forEach(x => {
            this.products.push(x);
          })
        );
    },
    addBook(id) {
      if (!this.books.includes(id)) {
        this.books.push(id);
        this.saveBooks();
      } else {
        console.error("Sorry You already have this book in your BookShelf");
        document.getElementById("addBtn").disabled = true;
      }
    },
    removeBook(x) {
      this.books.splice(x, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsedBook = JSON.stringify(this.books);

      localStorage.setItem("books", parsedBook);
    },
    showInfo(product) {
      let text = document.getElementsByClassName("text")[0];
      if (product.volumeInfo.description) {
        text.innerText = product.volumeInfo.description;
      } else {
        text.innerText = "There is no description for this book";
      }
      let container = document.getElementsByClassName("popup-container")[0];

      container.style.transform = `translateY(${pageYOffset}px)`;
    },
    close() {
      let container = document.getElementsByClassName("popup-container")[0];
      container.style.transform = "translateX(-100vw)";
    },
    click(pageNumber) {
      this.pages = pageNumber * 10;
      console.log(this.pages);
      this.search();
      this.products.forEach(product =>
        console.log(product.volumeInfo.imageLinks.thumbnail)
      );
    },
    returnFirst() {
      this.page = 1;
    },
    read(product) {
      return product.accessInfo.webReaderLink;
    }
  },
  mounted() {
    if (localStorage.getItem("books")) {
      try {
        this.books = JSON.parse(localStorage.getItem("books"));
      } catch (e) {
        localStorage.removeItem("books");
      }
    }
  }
};
</script>

<style src="../styles/main.scss" lang="scss">
</style>
