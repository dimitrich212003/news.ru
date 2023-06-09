<template>
  <li class="recItem__cart">
    <img class="recItem__img" :src="item?.imgLink">
    <div class="recItem__info">
      <div class="recItem__title">{{ item?.title }}</div>
      <div class="recItem__text">{{ item?.text }}...</div>
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
    },
  },
};
</script>

<style scoped>
  .recItem__cart{
    border: 3px solid #EFE8F8;
    border-radius: 10px;
    display: flex;
  }
  .recItem__img{
    max-width: 220px;
    object-fit: cover;
    border-radius: 7px 0 0 7px;
  }
  @media (max-width: 1000px) {
    .recItem__img{
      max-width: 180px;
    }
  }
  .recItem__info{
    padding: 15px;
    border-left: 3px solid #EFE8F8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
  .recItem__title{
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #966CEE;
  }
  .recItem__text{
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
  }

  @media (max-width: 890px) {
    .recItem__img{
      max-width: 150px;
    }
    .recItem__title{
      font-size: 16px;
      line-height: 20px;
    }
    .recItem__text{
      font-size: 14px;
      line-height: 16px;
    }
    .recItem__info {
      padding: 10px;
    }
  }
</style>