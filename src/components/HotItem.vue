<template>
  <li class="hotItem__cart">
    <img class="hotItem__img" :src="item?.imgLink">
    <div class="hotItem__info">
      <div class="hotItem__title">{{ item?.title }}</div>
      <a :href="item?.myLink" class="recItem__btn" target="_blank"><span>Подробнее</span></a>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

.hotItem__cart{
  border: 3px solid #EFE8F8;
  border-radius: 10px;
  display: flex;
}

.hotItem__img{
  max-width: 141px;
  object-fit: cover;
  border-radius: 7px 0 0 7px;
}

.hotItem__info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  flex: 1 1 auto;
}

.hotItem__title{
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #966CEE;
}

@media (max-width: 890px) {
  .hotItem__img{
    max-width: 111px;
  }
  .hotItem__title{
    font-size: 14px;
    line-height: 16px;
  }
  .hotItem__info {
    padding: 7px;
  }
}
</style>