<template>
  <div class="rec__row">
    <button class="rec__filter-btn rec__complete-btn" @click="runMain"><span>Дополнить</span></button>
    <form @submit.prevent="submitSearch">
      <div class="rec__search-form">
        <input class="rec__search" type="text" v-model="searchValue" placeholder="Поиск"/>
        <button class="rec__search-btn" type="submit">
          <img src="@/assets/search.svg">
        </button>
      </div>
    </form>
    <div class="rec__filter-btn" @click="showPopup"><span>Фильры</span></div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "UsersForm",
  data() {
    return {
      searchValue: '',
      result: ''
    };
  },
  methods: {
    submitSearch() {
      this.$emit("search", this.searchValue.toString());
    },
    showPopup() {
      this.$emit('show-popup', true); // передаем данные в родительский компонент
    },
    async runMain() {
      // Сохраняем контекст `this` в переменной `self`
      const self = this

      await fetch('http://localhost:3000/neural').then(function(response) {
        response.text().then(function(text) {
          // Используем переменную `self` вместо `this`
          self.result = text;
        });
      });
      this.searchValue = this.searchValue + " " + self.result;
    }
  }
}
</script>

<style scoped>
.rec__row{
  display: flex;
  gap: 10px;
}

@media (max-width: 750px) {
  .rec__row{
    flex-direction: column;
  }
}

.rec__row form{
  flex: 1 1 75%;
}

.rec__complete-btn{

}

.rec__search-form{
  border: 1px solid #966CEE;
  border-radius: 10px;
  padding-left: 14px;
  padding-right: 5px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.rec__search{
  width: 100%;
}

.rec__search-btn{
  min-width: 64px;
  height: 36px;
  background-color: #966CEE;
  border-radius: 4px;
}
.rec__search-btn img{
  width: 24px;
  height: 24px;
}

.rec__filter-btn{
  flex: 1 0 150px;
  background: #F9F4FF;
  border: 1px solid #E6E0FA;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}

.rec__complete-btn{
  display: block;
}

.rec__filter-btn span{
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #966CEE;
}

.rec__filter-btn::after{
  content: "";
  width: 24px;
  height: 24px;
  background: url("@/assets/filter.svg");
}

.rec__complete-btn::after{
  content: "";
  width: 0px;
  height: 0px;
}

@media (max-width: 750px) {
  .rec__row{
    flex-direction: column;
  }
  .rec__row form{
    flex: none;
  }
  .rec__filter-btn{
    flex: 1 1 45px;
  }
}
</style>