<template>
  <div class="rec__wrapper">
    <ul class="rec__list">
      <div v-if="errored" class="alert" role="alert">
        По вашему запросу ничего не найдено
      </div>
      <RecItem v-for="item in filterData" :key="item.id" :item="item"/>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import RecItem from "@/components/RecItem";

export default {
  name: "RecomendList",
  components: {
    RecItem
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    searchValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      items: [],
      tempItems: [],
      errored: false,
    };
  },
  computed: {
    filterData() {
      let data = []
      if (this.options.selectedOptionAdult === null || this.options.selectedOptionAdult === "true" || this.options.selectedOptionAdult === true) {
        data = this.items
      } else if (this.options.selectedOptionAdult === "false") {
        data = this.items.filter(x => !x.adult)
      }
      // Добавляем фильтрацию по новому свойству
      if (this.options.selectedOptionFilter2 === "false") {
        data = data.filter(x => !x.foreign)
      }
      // if (this.options.selectedOptionFilter3 === "false") {
      //   data = data.filter(x => !x.politic)
      // }

      if (this.searchValue !== '') {
        data = data.filter(item => item.title.toUpperCase().includes(this.searchValue.toUpperCase()));
      }

      return data
    },
  },
  mounted() {
    this.runMain().then((e) => console.log(e))

    axios
        .get('http://localhost:8000/redirecter/news')
        .then(response => {
          this.tempItems = response.data
          this.showMore();

        })
        .catch(error => {
          if (this.tempItems.length === 0) {
            this.errored = true;
          }
          alert(error.message);
        })
  },
  methods: {
    async runMain() {
      // Сохраняем контекст `this` в переменной `self`
      const self = this

      await fetch('http://localhost:3000/lenta').then(function(response) {
        response.text().then(function(text) {
          // Используем переменную `self` вместо `this`
          self.result = text;
        });
      });
    },

    showMore() {
      for (let i = 0; i < this.tempItems.length; i++) {
        const newId = this.items.length + 1;
        this.items.push({
          id: newId,
          title: this.tempItems[this.tempItems.length - newId].title,
          text: this.tempItems[this.tempItems.length - newId].description,
          myLink: this.tempItems[this.tempItems.length - newId].link,
          imgLink: this.tempItems[this.tempItems.length - newId].imgLink,
          adult: this.tempItems[this.tempItems.length - newId].isForAdults,
          foreign: this.tempItems[this.tempItems.length - newId].isForeignNews,
          politic: this.tempItems[this.tempItems.length - newId].isPoliticalNews,
        });
      }
    },
  }
}
</script>

<style scoped>

.rec__list{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alert{
  background: #EFE8F8;
  border: 1px solid #966CEE;
  border-radius: 10px;
  padding: 15px;
}
</style>