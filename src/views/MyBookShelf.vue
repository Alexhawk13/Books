<template>
  <div class="about">
    <h1>My Bookshelf</h1>

    <div class="container">
      <div class="popup-container">
        <button class="close" @click="close">x</button>
        <p class="text"></p>
      </div>

      <section class="item-container">
        <div
          class="image-block"
          v-for="(product, index) in products"
          :key="product.volumeInfo.title"
          :id="`block${index}`"
        >
          <a class="more" @click="showInfo(product)">
            <img src="../img/icons/description.svg" height="25px" alt />
          </a>
          <a class="read" :href="read(product)" target="_blank">
            <img src="../img/icons/book.svg" height="25px" alt />
          </a>
          <img
            :src="
            product.volumeInfo.imageLinks
              ? product.volumeInfo.imageLinks.thumbnail
              : replacedImg
          "
            alt
          />
          <p class="title">{{ product.volumeInfo.title }}</p>
          <address>{{ product.volumeInfo.authors ? product.volumeInfo.authors.join() : '' }}</address>
          <button class="remove-btn" @click="del(index)">remove</button>
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
      <paginate
        v-if="this.products.length > 9 || this.page!==1"
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
  </div>
</template>

<script>
import Methods from "../components/Methods.js";

export default {
  data: () => ({
    id: JSON.parse(localStorage.getItem("books")),
    products: [],
    page: 1,
    cart: require("../img/icons/shopping-cart.svg"),
    replacedImg: require("../img/book.png")
  }),
  created() {
    (this.showInfo = Methods.showInfo),
      (this.close = Methods.close),
      (this.read = Methods.read);
  },
  mounted() {
    this.fetching(1);
    console.log(this.products);
  },
  methods: {
    changePages(currentPage) {
      this.fetching(currentPage);
    },
    fetching(currentPage) {
      let startIndex = currentPage * 10 - 10;
      this.products = [];
      for (let i = startIndex; i < startIndex + 10; i++) {
        if (this.id[i]) {
          fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${this.id[i]}+id`
          )
            .then(response => response.json())
            .then(result => this.products.push(result.items[0]));
        }
      }
    },
    del(index) {
      this.id.splice(index, 1);
      localStorage.removeItem("books");
      localStorage.setItem("books", JSON.stringify(this.id));
      document.getElementById(`block${index}`).classList.add("none");
    }
  }
};
</script>

