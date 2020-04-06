<template>
  <div class="user-input">
    <div class="app-header">
      <span v-if="!next" @click="next=true" class="user-input__back-container">
        <img class="user-input__back-arrow" src="../../assets/backarrow.png">
        <span class="user-input__back--text">back</span>
      </span>    
      <span :class="['header-text',{headerTextPadding:!next}]">Vue OTP Screen</span>
    </div>
    <div v-if="next">
      <h3>Please enter number of input keys</h3>
      <input
        type="number"
        v-model="inputkey"
        @input="handleInputChange"
        v-on:keyup.enter="showError=='' && handleNext()"
        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
      >
      <div class="error-msg">{{showError}}</div>
      <div class="user-input__btn">
        <button @click="handleNext" :disabled="showError!==''" class="user-input__submit-btn">NEXT</button>
      </div>
      <div v-if="!showError" class="user-password">Your password is {{password}}</div>
    </div>
    <div v-else>
      <OTP :keys="inputkey">Please enter the verification code</OTP>
    </div>
  </div>
</template>

<script>
import OTP from "./otp.vue";
export default {
  data() {
    return {
      inputkey: "4",
      showError: "",
      next: true
    };
  },
  components: {
    OTP
  },
  methods: {
    handleInputChange() {
      if (this.inputkey < 1 || this.inputkey > 6) {
        this.showError = "Please enter value greater than 0 and less than 7";
      } else {
        this.showError = "";
      }
    },
    handleNext() {
      this.next = false;
    }
  },
  computed: {
    password() {
      let password = [];
      if (!isNaN(Number(this.inputkey))) {
        for (let i = 0; i < Number(this.inputkey); i++) {
          password.push(i + 1);
        }
        return Number(password.join(""));
      }
    }
  }
};
</script>

<style scoped>
.app-header {
  background-color: #2874f0;
  height: 48px;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  box-sizing: border-box;
  display: flex;
}
.user-input__back-container{
  display: flex;
}
.user-input__back-arrow {
    height: 24px;
    width: 24px;
    padding-left: 8px;
    align-self: center;
    cursor: pointer;
}
.user-input__back--text{
    align-self: center;
    cursor: pointer;
}
.header-text {
  align-self: center;
  width: 100%;
}
.headerTextPadding {
  padding-right: 72px
}
.error-msg {
  color: red;
  font-size: 14px;
  margin-top: 16px;
  height: 18px;
}
.user-input input {
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 2px 2px 0 0;
  font-size: 40px;
  height: 32px;
  width: 102px;
  text-align: center;
  margin: 8px;
  padding: 8px;
}
.user-input input:focus {
  outline: unset;
}
.user-input__btn {
  margin-top: 16px;
}
.user-password {
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
}
.user-input__submit-btn {
  border: 1px solid rgba(36, 13, 231, 0.5);
  border-radius: 16px;
  font-size: 18px;
  font-weight: 500;
  background-color: #2874f0;
  color: #fff;
  padding: 8px;
  box-shadow: 2px 4px 7px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 1;
}
.user-input__submit-btn:disabled {
  opacity: 0.3;
  cursor: unset;
}
@media screen and (max-width: 768px) {
  .user-input__btn {
    position: fixed;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.3), #fff);
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
    padding-top: 16px;
  }
}
</style>
