export default {
  showInfo(product) {
    let text = document.getElementsByClassName("text")[0];
    if (product.volumeInfo.description) {
      text.innerText = product.volumeInfo.description;
    } else {
      text.innerText = "There is no description for this book";
    }

    let container = document.getElementsByClassName("popup-container")[0];
    container.style.transform = `translateX(${pageXOffset}px)`;
    container.style.transform = `translateY(${pageYOffset}px)`;
    container.style.opacity = 1;
  },
  close() {
    let container = document.getElementsByClassName("popup-container")[0];
    container.style.transform = "translateX(-100vw)";
    container.style.opacity = 0;
  },
  read(product) {
    return product.accessInfo.webReaderLink;
  }
}