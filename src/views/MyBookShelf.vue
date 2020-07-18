<template>
  <div class="about">
    <h1>My Bookshelf</h1>

    <div class="container">
      <div id="popup-container">
        <button id="close" @click="close">x</button>
        <p id="text"></p>
      </div>

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
              : immg
          "
          alt
        />
        <p>{{ product.volumeInfo.title }}</p>
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
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: JSON.parse(localStorage.getItem("books")),
    products: [],
    cart: require("../img/icons/shopping-cart.svg"),
    immg: require("../img/book.png")
  }),
  mounted() {
    // console.log(this.id);
    for (let iterator of this.id) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${iterator}+id`)
        .then(response => response.json())
        .then(result => this.products.push(result.items[0]));
    }
  },
  methods: {
    del(index) {
      this.id.splice(index, 1);
      localStorage.removeItem("books");
      localStorage.setItem("books", JSON.stringify(this.id));
      document.getElementById(`block${index}`).classList.add("none");
    },
    showInfo(product) {
      let text = document.getElementById("text");
      if (product.volumeInfo.description) {
        text.innerText = product.volumeInfo.description;
      } else {
        text.innerText = "There is no description for this book";
      }

      let container = document.getElementById("popup-container");
      container.style.transform = `translateX(${pageXOffset}px)`;
      container.style.transform = `translateY(${pageYOffset}px)`;
    },
    close() {
      let container = document.getElementById("popup-container");
      container.style.transform = "translateX(-100vw)";
    },
    read(product) {
      return product.accessInfo.webReaderLink;
    }
  }
};
</script>

<style src="../styles/bookshelf.scss" lang="scss" scoped>
</style>
