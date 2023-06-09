<template>
  <div class="hot__wrapper">
    <ul class="hot__list">
      <HotItem v-for="item in items" :key="item.id" :item="item"/>
    </ul>
    <button @click="addItem" v-if="showMore" class="hot__show-more"><span>Показать больше</span></button>
  </div>
</template>

<script>
import HotItem from "@/components/HotItem";
import axios from "axios";
export default {
  name: "HotNews",
  components: {HotItem},
  data() {
    return {
      items: [],
      tempItems: [],
      quantity: 3,
      showMore: true
    };
  },
  mounted() {
    axios
        .get("http://127.0.0.1:8000/redirecter/news")
        .then(response => {
          this.tempItems = response.data;
          this.addItem();
        })
  },
  methods: {
    addItem() {
      for(let i = 0; i < this.quantity; i++){
        const newId = this.items.length + 1;
        this.items.push({
          id: newId,
          title: this.tempItems[newId - 1].title,
          myLink: this.tempItems[newId - 1].link,
          imgLink: this.tempItems[newId - 1].imgLink
        });
      }
      if (this.quantity > this.tempItems.length - this.items.length) {
        this.quantity = this.tempItems.length - this.items.length;
      }
      this.showMore = !(this.tempItems.length === this.items.length);
    },
  },
}
</script>

<style scoped>
.hot__list{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hot__show-more{
  align-self: center;
  background: #966CEE;
  border: 1px solid #E6E0FA;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  font-weight: 700;
}
</style>