<template>
  <div class="container">
    <div class="popup-container">
      <button class="close" @click="close">x</button>
      <p class="text"></p>
    </div>
    <form class="form" v-on:submit.prevent="search()" @click="returnFirst()">
      <input type="text" v-model="newBook" placeholder="Search for a book" />
      <button>Search</button>
    </form>
    <p
      class="quote"
      v-if="`${!products}`"
    >“Think before you speak. Read before you think.” – Fran Lebowitz</p>

    <section class="item-container" v-if="products">
      <div class="image-block" v-for="product in products" :key="product.title">
        <a class="more" @click="showInfo(product)">
          <img src="../img/icons/description.svg" height="20px" alt />
        </a>

        <a class="read" :href="read(product)" target="_blank">
          <img v-if="read(product)" src="../img/icons/book.svg" height="25px" alt />
        </a>

        <img
          :src="
            product.volumeInfo.imageLinks
              ? product.volumeInfo.imageLinks.thumbnail
              : replaceImg
          "
          alt
        />
        <p class="title">{{ product.volumeInfo.title }}</p>
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
    <p v-else>Sorry there is no such book</p>
    <paginate
      v-if="this.products.length > 9"
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
    replaceImg: require("../img/book.png")
  }),
  created() {
    (this.showInfo = Methods.showInfo),
      (this.close = Methods.close),
      (this.read = Methods.read);
  },
  methods: {
    search() {
      this.products = [];
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.newBook}+title&startIndex=${this.pages}`
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
    returnFirst() {
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
