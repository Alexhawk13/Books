(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"1aaf":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"about"},[s("h1",[t._v("My Bookshelf")]),s("div",{staticClass:"container"},[s("div",{staticClass:"description"},[s("button",{staticClass:"description__close",on:{click:t.close}},[t._v("x")]),s("p",{staticClass:"description__text"})]),s("section",{staticClass:"books-container"},t._l(t.products,(function(e,a){return s("div",{key:e.volumeInfo.title,staticClass:"book",attrs:{id:"block"+a}},[s("a",{staticClass:"show-info",on:{click:function(o){return t.showInfo(e)}}},[s("img",{attrs:{src:o("5d5f"),height:"25px",alt:""}})]),s("a",{staticClass:"read",attrs:{href:t.read(e),target:"_blank"}},[s("img",{attrs:{src:o("1e16"),height:"25px",alt:""}})]),s("img",{staticClass:"book__image",attrs:{src:e.volumeInfo.imageLinks?e.volumeInfo.imageLinks.thumbnail:t.replacedImg,alt:""}}),s("p",{staticClass:"book__title"},[t._v(t._s(e.volumeInfo.title))]),s("p",[t._v(t._s(e.volumeInfo.authors?e.volumeInfo.authors.join():""))]),s("button",{staticClass:"remove-btn",on:{click:function(e){return t.del(a)}}},[s("span",[t._v("remove")])]),e.saleInfo.buyLink?s("a",{class:{book__buy:e.saleInfo.buyLink},attrs:{href:e.saleInfo.buyLink,target:"_blank"}},[s("img",{staticClass:"shop-cart",attrs:{src:e.saleInfo.buyLink?t.cart:""}})]):t._e()])})),0),s("paginate",{attrs:{"page-count":10,"prev-text":"Prev","next-text":"Next","click-handler":t.changePages,"no-li-surround":"","container-class":"pagination","page-link-class":"pagination_link","active-class":"active"},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)])},a=[],n=(o("a434"),o("d3b7"),o("e133")),i={data:function(){return{id:JSON.parse(localStorage.getItem("books")),products:[],page:1,cart:o("445c"),replacedImg:o("89a7")}},created:function(){this.showInfo=n["a"].showInfo,this.close=n["a"].close,this.read=n["a"].read},mounted:function(){this.fetching(1)},methods:{changePages:function(t){this.fetching(t)},fetching:function(t){var e=this,o=10*t-10;this.products=[];for(var s=o;s<=o+10;s++)this.id[s]&&fetch("https://www.googleapis.com/books/v1/volumes?q=".concat(this.id[s],"+id")).then((function(t){return t.json()})).then((function(t){return t.items?e.products.push(t.items[0]):null}))},del:function(t){this.id.splice(t,1),localStorage.removeItem("books"),localStorage.setItem("books",JSON.stringify(this.id)),document.getElementById("block".concat(t)).classList.add("none"),console.log("products = "+this.products.length),console.log("localStorageBooks = "+JSON.parse(localStorage.books).length)}}},c=i,l=o("2877"),r=Object(l["a"])(c,s,a,!1,null,null,null);e["default"]=r.exports},a434:function(t,e,o){"use strict";var s=o("23e7"),a=o("23cb"),n=o("a691"),i=o("50c4"),c=o("7b0b"),l=o("65f0"),r=o("8418"),u=o("1dde"),d=o("ae40"),f=u("splice"),h=d("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,p=Math.min,m=9007199254740991,b="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!f||!h},{splice:function(t,e){var o,s,u,d,f,h,k=c(this),v=i(k.length),_=a(t,v),I=arguments.length;if(0===I?o=s=0:1===I?(o=0,s=v-_):(o=I-2,s=p(g(n(e),0),v-_)),v+o-s>m)throw TypeError(b);for(u=l(k,s),d=0;d<s;d++)f=_+d,f in k&&r(u,d,k[f]);if(u.length=s,o<s){for(d=_;d<v-s;d++)f=d+s,h=d+o,f in k?k[h]=k[f]:delete k[h];for(d=v;d>v-s+o;d--)delete k[d-1]}else if(o>s)for(d=v-s;d>_;d--)f=d+s-1,h=d+o-1,f in k?k[h]=k[f]:delete k[h];for(d=0;d<o;d++)k[d+_]=arguments[d+2];return k.length=v-s+o,u}})}}]);
//# sourceMappingURL=about.93c38745.js.map