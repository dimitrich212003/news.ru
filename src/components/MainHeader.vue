<template>
  <header class="header">
    <div class="header__container">
      <div class="header__row">
        <div class="header__logo">
          <img src="@/assets/logo.svg">
          <span>NEWS</span>
        </div>
        <ul class="header__links">
          <li>
            <a class="header__link" href="" target="_blank">
              <img src="@/assets/vk.svg">
            </a>
          </li>
          <li>
            <a class="header__link" href="" target="_blank">
              <img src="@/assets/telega.svg">
            </a>
          </li>
          <li>
            <a class="header__link" href="" target="_blank">
              <img src="@/assets/whats.svg">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="header__bottom-bar"></div>
  </header>
</template>

<script>
export default {
  name: "MainHeader"
}
</script>

<style scoped>
.header__bottom-bar{
  width: 100%;
  background-color: #EFE8F8;
  height: 3px;
}

.header__row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.header__logo{
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__logo img{
  width: 71px;
  height: 71px;
}

.header__logo span{
  font-weight: 700;
  font-size: 36px;
  line-height: 33px;
}

.header__links{
 display: flex;
  align-items: center;
  gap: 20px;
}

.header__link img{
  width: 30px;
  height: 30px;
}

@media (max-width: 768px) {
  .header__row{
    height: 60px;
  }
  .header__logo{
    gap: 10px;
  }
  .header__logo img{
    width: 41px;
    height: 41px;
  }
  .header__logo span{
    font-size: 22px;
    line-height: 22px;
  }
  .header__link img{
    width: 25px;
    height: 25px;
  }
}
</style>