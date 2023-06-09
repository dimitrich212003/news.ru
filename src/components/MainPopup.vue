<template>
    <div v-show="show" @click="handleClickOutside" class="popup__wrapper">
      <div class="popup__content">
        <div class="popup__title-row">
          <div class="popup__title">Фильтры</div>
          <button data-close type="button" class="popup__close" @click="closePopup">
            <img src="@/assets/close.svg">
          </button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="popup__column">
            <div class="popup__radio-column">
              <div class="popup__radio-title">Контент 18+</div>
              <div class="popup__radio-row">
                <label class="popup__radio">
                  <input class="popup__input" type="radio" name="adult" value="true" v-model="options.selectedOptionAdult"/>
                  <span class="popup__radio-fake"></span>
                  <span class="popup__radio-name">Вкл</span>
                </label>
                <label class="popup__radio">
                  <input class="popup__input" type="radio" name="adult" value="false" v-model="options.selectedOptionAdult"/>
                  <span class="popup__radio-fake"></span>
                  <span class="popup__radio-name">Выкл</span>
                </label>
              </div>
            </div>
            <div class="popup__radio-column">
              <div class="popup__radio-title">Иностранные</div>
              <div class="popup__radio-row">
                <label class="popup__radio">
                  <input class="popup__input" type="radio" name="filter2" value="true" v-model="options.selectedOptionFilter2"/>
                  <span class="popup__radio-fake"></span>
                  <span class="popup__radio-name">Вкл</span>
                </label>
                <label class="popup__radio">
                  <input class="popup__input" type="radio" name="filter2" value="false" v-model="options.selectedOptionFilter2"/>
                  <span class="popup__radio-fake"></span>
                  <span class="popup__radio-name">Выкл</span>
                </label>
              </div>
            </div>
            <div class="popup__radio-column">
              <div class="popup__radio-title">Политические</div>
              <div class="popup__radio-row">
                <label class="popup__radio">
                  <input class="popup__input" type="radio" name="filter3" value="true" v-model="options.selectedOptionFilter3"/>
                  <span class="popup__radio-fake"></span>
                  <span class="popup__radio-name">Вкл</span>
                </label>
                <label class="popup__radio">
                  <input class="popup__input" type="radio" name="filter3" value="false" v-model="options.selectedOptionFilter3"/>
                  <span class="popup__radio-fake"></span>
                  <span class="popup__radio-name">Выкл</span>
                </label>
              </div>
            </div>
            <button class="popup__btn" type="submit">Применить</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: "MainPopup",
  props: {
    show: Boolean // принимаем свойство show из родительского компонента
  },
  data() {
    return {
      options: {
        selectedOptionAdult: true,
        selectedOptionFilter2: true,
        selectedOptionFilter3: true,
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    handleClickOutside(event) {
      // Проверяем, был ли клик на контент popup
      if (!event.target.closest(".popup__content")) {
        this.closePopup();
      }
    },
    handleSubmit() {
      // вызываем метод родительского компонента для передачи изменений
      this.$emit('filters-changed', this.options);
      this.$emit("close");
    },
    // handleSubmit() {
    //   // Здесь можно отправить запрос на сервер, используя значение selectedOption
    //   console.log('Выбрана опция 1:', this.options.selectedOptionAdult);
    //   console.log('Выбрана опция 2:', this.options.selectedOptionFilter2);
    //   console.log('Выбрана опция 3:', this.options.selectedOptionFilter3);
    //   this.$emit("close");
    // },
  },
}
</script>

<style scoped>
.popup{

}
.popup__wrapper{
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 149;
}
.popup__content{
  transition: transform 0.3s ease 0s;
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  border-radius: 20px;
  position: relative;
  z-index: 150;
}

.popup__title-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.popup__title{
  font-weight: 700;
  font-size: 26px;
  line-height: 22px;
  color: #966CEE;
}
.popup__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.popup__radio-column {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.popup__radio-title{
  color: #A897BD;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}
.popup__radio-row {
  display: flex;
  gap: 10px;
}
.popup__radio {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #F9F4FF;
  border: 1px solid #966CEE;
  border-radius: 8px;
  width: 79px;
  height: 34px;
  justify-content: center;
}
.popup__input {
  display: none;
}
.popup__input:checked + .popup__radio-fake::before {
   opacity: 1;
}

.popup__radio-fake {
  display: inline-block;
  cursor: pointer;
  width: 16px;
  height: 16px;
  border: 1px solid #966CEE;
  border-radius: 4px;
  background: #ffffff;
  position: relative;
}
.popup__radio-fake::before {
  content: "";
  position: absolute;
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #966CEE;
  border-radius: 4px;
  background: #966CEE;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: 0.4s;
}

.popup__radio-name {
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
}

.popup__btn {
  background: #966CEE;
  border-radius: 8px;
  width: 168px;
  height: 34px;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  color: #ffffff;
}
</style>