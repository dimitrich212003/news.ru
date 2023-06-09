<template>
  <div class="wrapper">
    <MainHeader/>
    <main class="page">
      <div class="page__container">
        <div v-if="isMobile" class="page__mob-btn-row">
          <span :class="{ active: isActive[0] }" v-on:click="changeIsRec(0)">Поиск</span>
          <span class="active">/</span>
          <span :class="{ active: isActive[1] }" v-on:click="changeIsRec(1)">HotNews</span>
        </div>
        <div class="page__main-row">
          <div class="page__rec-column" v-show="!isMobile || isRec">
            <UsersForm @show-popup="showPopup" @search="submitSearch"/>
            <RecomendList class="page__recomend-list" :options="options" :searchValue="searchValue" @filters-changed="handleFiltersChanged"/>
          </div>
          <div class="page__bar" v-if="!isMobile"></div>
          <div class="page__hot-column" v-show="!isMobile || !isRec">
            <div class="hot__title">HOT NEWS</div>
            <HotNews class="page__hot-news"/>
          </div>
        </div>
      </div>
    </main>
  </div>
  <MainPopup :show="show" @close="closePopup" @filters-changed="handleFiltersChanged"/>
</template>

<script>

import MainHeader from "@/components/MainHeader"
import MainPopup from "@/components/MainPopup";
import RecomendList from "@/components/RecomendList";
import HotNews from "@/components/HotNews";
import UsersForm from "@/components/UsersForm";



export default {
  name: 'App',
  components: {
    UsersForm,
    HotNews,
    RecomendList,
    MainHeader,
    MainPopup,
  },
  data() {
    return {
      parentMessage: 'Hello from parent component',
      isMobile: false,
      isRec: true,
      isActive: [true, false],
      show: false,
      options: {
        selectedOptionAdult: true,
        selectedOptionFilter2: true,
        selectedOptionFilter3: true,
      },
      searchValue: '',
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile) {
        this.isRec = true
      }
    },
    changeIsRec(name) {
      if (name === 0) {
        this.isRec = true
      }
      else {
        this.isRec = false
      }
      if (!this.isActive[name]) {
        this.isActive[name] = true;
        const otherIndex = name === 0 ? 1 : 0;
        this.isActive[otherIndex] = false;
      }
    },
    showPopup(value) {
      this.show = value; // изменяем свойство show при получении данных из дочернего компонента
    },
    closePopup() {
      this.show = false;
    },
    handleFiltersChanged(options) {
      // обновляем состояние фильтров только после нажатия кнопки "Отправить"
      this.options.selectedOptionAdult = options.selectedOptionAdult;
      this.options.selectedOptionFilter2 = options.selectedOptionFilter2;
      this.options.selectedOptionFilter3 = options.selectedOptionFilter3;
    },
    submitSearch(searchValue) {
      // Выполнение логики поиска с переданным значением
      this.searchValue = searchValue;
      console.log(this.searchValue);
    },
  },
}
</script>

<style>
.page__mob-btn-row{
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  color: #E6E0FA;
  display: flex;
  gap: 10px;
  margin: 25px 0;
  justify-content: center;
  cursor: pointer;
}

.active{
  color: #966CEE;
  font-weight: 700;
}

.recItem__btn{
  background: #F9F4FF;
  border: 1px solid #E6E0FA;
  float: right;
  border-radius: 8px;
  width: 162.44px;
  height: 39.62px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
}
.recItem__btn span{
  color: #966CEE;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}

@media (max-width: 890px) {
  .recItem__btn span{
    font-size: 12px;
  }
  .recItem__btn{
    width: 94px;
    height: 28px;
  }
}

.page__main-row{
  display: flex;
}

.page__rec-column{
  flex: 1 1 60%;
  padding: 15px 15px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.page__recomend-list{
  height: calc(100vh - 158px);
  overflow: auto;
}

.page__bar{
  width: 3px;
  height: calc(100vh - 83px);
  background-color: #EFE8F8;
  overflow: auto;
}

.page__hot-column{
  flex: 1 1 40%;
  padding: 20px 0px 0px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page__hot-news{
  height: calc(100vh - 158px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hot__title{
  font-weight: 700;
  font-size: 36px;
  line-height: 33px;
}

@media (max-width: 768px) {
  .page__recomend-list{
    height: calc(100vh - 250px);
  }
  .page__hot-news{
    height: calc(100vh - 188px);
  }
  .page__hot-column,
  .page__rec-column{
    padding: 0px;
  }
}

* {
  padding: 0px;
  margin: 0px;
  border: 0px;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
:focus,
:active {
  outline: none;
}
a:focus,
a:active {
  outline: none;
}
html,
body {
  height: 100%;
  min-width: 320px;
}
body {
  color: #000;
  line-height: 1;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
input,
button,
textarea {
  font-family: 'Montserrat', sans-serif;
  font-size: inherit;
}
button {
  cursor: pointer;
  color: inherit;
  background-color: inherit;
}
a {
  color: inherit;
}
a:link,
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
ul li {
  list-style: none;
}
img {
  vertical-align: top;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: inherit;
  font-size: inherit;
}


[class*="__container"] {
  max-width: 1170px;
  box-sizing: content-box;
  margin: 0 auto;
  padding: 0 15px;
}

@media (max-width: 1200px) {
  [class*="__container"] {
    max-width: 100%;
    padding: 0 0.9375rem;
  }
}

.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.wrapper > main {
  flex: 1 1 auto;
}

.wrapper > * {
  min-width: 0;
}

/*body::after {*/
/*  content: "";*/
/*  background-color: rgba(0, 0, 0, 0.5);*/
/*  position: fixed;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  top: 0;*/
/*  left: 0;*/
/*  opacity: 0;*/
/*  transition: opacity 0.8s ease 0s;*/
/*  pointer-events: none;*/
/*  z-index: 149;*/
/*}*/

/*.popup-show body::after {*/
/*  opacity: 1;*/
/*}*/

/*.popup {*/
/*  position: fixed;*/
/*  top: 0;*/
/*  left: 0;*/
/*  bottom: 0;*/
/*  right: 0;*/
/*  padding: 30px 10px;*/
/*  transition: visibility 0.8s ease 0s;*/
/*  visibility: hidden;*/
/*  pointer-events: none;*/
/*}*/
/*.popup_show {*/
/*  z-index: 150;*/
/*  visibility: visible;*/
/*  overflow: auto;*/
/*  pointer-events: auto;*/
/*}*/
/*.popup_show .popup__content {*/
/*  visibility: visible;*/
/*  transform: scale(1);*/
/*}*/
/*.popup__wrapper {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*  min-height: 100%;*/
/*  flex: 1 1 auto;*/
/*  width: 100%;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*}*/
/*.popup__content {*/
/*  visibility: hidden;*/
/*  transform: scale(0);*/
/*  transition: transform 0.3s ease 0s;*/
/*  background-color: #eee;*/
/*  padding: 20px;*/
/*  width: 100%;*/
/*  max-width: 900px;*/
/*  border-radius: 20px;*/
/*}*/
/*.lock .popup__content {*/
/*  visibility: visible;*/
/*}*/
</style>
