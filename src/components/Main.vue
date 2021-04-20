<template>
  <div class="container">
    <div class="description">
      <button class="description__close" @click="close">x</button>
      <p class="description__text"></p>
    </div>
    <form class="search-form" v-on:submit.prevent="search()" @click="goFirstPage()">
      <input class="search" type="text" v-model="newBook" placeholder="Search for a book" />
      <button>Search</button>
    </form>
    <p
      class="quote"
      v-if="`${!products}`"
    >“Think before you speak. Read before you think.” – Fran Lebowitz</p>

    <section class="books-container" v-if="products">
      <div class="book" v-for="product in products" :key="product.title">
        <a class="show-info" @click="showInfo(product)">
          <img src="../img/icons/description.svg" height="20px" alt />
        </a>

        <a class="read" :href="read(product)" target="_blank">
          <img v-if="read(product)" src="../img/icons/book.svg" height="25px" alt />
        </a>

        <img
          class="book__image"
          :src="
            product.volumeInfo.imageLinks
              ? product.volumeInfo.imageLinks.thumbnail
              : replaceImg
          "
          alt
        />
        <p class="book__title">{{ product.volumeInfo.title }}</p>
        <p>{{ product.volumeInfo.authors ? product.volumeInfo.authors.join() : '' }}</p>
        <button id="addToShelf" @click="addBook(product.id)">Add</button>
        <a v-if="product.saleInfo.buyLink" :class="{book__buy : product.saleInfo.buyLink}" :href="product.saleInfo.buyLink" target="_blank">
          <img class="shop-cart"
            :src="product.saleInfo.buyLink 
              ? cart 
              :  ''"
          />
        </a>
      </div>
    </section>
    <p v-else>Sorry there is no such book</p>
    <paginate
      v-if="this.products.length"
      v-model="page"
      :page-count="10"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :click-handler="changePages"
      no-li-surround
      :container-class="'pagination'"
      :page-link-class="'pagination_link'"
      :active-class="'active'"
    ></paginate>
  </div>
</template>

<script>
import Methods from "../components/Methods.js";

export default {
  data: () => ({
    book: require("../img/icons/book.svg"),
    cart: require("../img/icons/shopping-cart.svg"),
    page: 1,
    pages: 0,
    products: [],
    newBook: null,
    books: [],
    replaceImg: require("../img/book.png"),
    maxResults: 10,
  }),
  created() {
    (this.showInfo = Methods.showInfo),
    (this.close = Methods.close),
    (this.read = Methods.read);
  },
  methods: {
    search() {
      this.products = [];
      // mobile adaptive
      this.maxResults = 10;
      if(window.innerWidth <= 515) {
        this.maxResults = 10
      }
        else if(window.innerWidth <= 880) {
        this.maxResults = 9;
      } else if (window.innerWidth <= 980) {
        this.maxResults = 8
      }
      // end mobile adaptive
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.newBook}+intitle&startIndex=${this.pages}&maxResults=${this.maxResults}`
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
      }
    },
    saveBooks() {
      const parsedBook = JSON.stringify(this.books);
      localStorage.setItem("books", parsedBook);
    },
    changePages(pageNumber) {
      this.pages = pageNumber * 10;
      this.search();
    },
    goFirstPage() {
      this.page = 1;
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
