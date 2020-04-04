<template>
  <div class="otp-screen">
    <div class="otp-screen__text">
      Verification Code
    </div>
    <div class="otp-screen__sub--text">
      <slot></slot>
    </div>
    <div class="otp-screen__inputs-row">
      <template v-for="(key, index) in inputKeys">
        <input
          type="number"
          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          @paste.prevent
          :key="key"
          :ref="`inputkey${index}`"
          class="otp-screen__input"
          v-on:keyup="userInput(index, $event)"
          v-on:keyup.enter="!isDisable && submitOTPHandler()"
          v-model.number="otp[`inputkey${index}`]"
        />
      </template>
    </div>
    <div class="otp-screen__resend-btn">
      <a href="" @click.prevent="resendHandler">Reset</a>
    </div>
    <div class="otp-screen__btn">
      <button class="otp-screen__submit-btn" @click="submitOTPHandler" :disabled="isDisable">SUBMIT</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      otp: {},
    }
  },
  mounted () {
    this.resetOTP();
  },
  props: {
    keys: {
      type: String,
      required: true
    },
  },
  computed: {
    isDisable () {
      for (const key in this.otp) {
        if (this.otp[key] === '' || isNaN(this.otp[key])) return true
      }
      return false
    },
    inputKeys (){
      if(Number(this.keys)< 1 || Number(this.keys)>6 ){
        return Number(4)
      }
      else{
      return Number(this.keys)
    }
    }
    
  },
  methods: {

    // creating input keys based on inputKeys prop passed and set it to ''
    resetOTP () {
      for (let i = 0; i < this.inputKeys; i++) {
        Vue.set(this.otp, `inputkey${i}`, '')
      }
      this.setFocus(0)
    },

    // geting user input
    userInput (index, event) {
      // check for backspace || arrowleft key enter and move back the focus
      if (event.key === 'Backspace'  || event.key === 'ArrowLeft' || event.key === 'Left') {
        this.setFocus(index - 1)
        return;
      }

      // validate for input key as number 
      if (this.isValidInput(index, event)) {

        // if input number is greater than 1 than shift other keys 
        if (this.otp[`inputkey${index}`].toString().split('').length > 1) {
          this.shiftOtherDigitToForward(index)
        } else {
          this.setFocus(index + 1)
        }
      }
    },

    isValidInput (index, evt) {
      const pattern = /^[0-9]+$/
      return evt.key.match(pattern) ? true : false
    },

    resendHandler () {
      this.resetOTP()
    },

    //  adjusting the input key to next key column
    shiftOtherDigitToForward (index) {
      const inputs = this.otp[`inputkey${index}`].toString().split('')
      let inputIndex = 0
      for (let i = index; i < this.inputKeys; i++) {
        if(!isNaN(Number(inputs[inputIndex]))){
        Vue.set(this.otp, `inputkey${i}`, Number(inputs[inputIndex]))
        inputIndex++
        }
      }
      index + inputs.length > this.inputKeys
        ? this.setFocus(this.inputKeys - 1)
        : this.setFocus(index + inputs.length - 1)
    },

    // setting up the focus
    setFocus (index) {
      index >= 0 && index < this.inputKeys
        ? this.$nextTick(this.$refs['inputkey' + index][0].focus())
        : null
    },

    // creating password from number of inputkeys
    submitOTPHandler () {
      const formattedOtp = [];
      let enteredOtp;
      for (const key in this.otp) {
        formattedOtp.push(this.otp[key])
      }
      enteredOtp = Number(formattedOtp.join(''));

      //validate otp, 
      this.validateOtpFromBackend().then((passkey)=>{
          if(passkey===enteredOtp)
          window.open('https://github.com/Madhur-Parashar/vue-otp')
          else
          console.log('Err')
      })
      
    },
    
    // in place of validateOtpFromBackend method, we can also call API which give correct password
    // here we are creating password from number of inputkeys
    async validateOtpFromBackend(){
        let passkey=[]
        for(let i=1;i<=this.inputKeys;i++){
            passkey.push(i);
        }
      return Promise.resolve(Number(passkey.join('')))

    }
  },

}
</script>
<style scoped>
.otp-screen {
  display: flex;
  flex-direction: column;
 margin-top: 60px;
}
.otp-screen__text{
    font-size: 18px;
    font-weight: 600;
}
.otp-screen__inputs-row {
  display: flex;
  justify-content: center;
}
.otp-screen__sub--text{
    font-size: 16px;
    margin: 32px 0;
    line-height: 1.5;
}
.otp-screen__inputs-row input {
  border: unset;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 2px 2px 0 0;
  font-size: 40px;
  height: 32px;
  width: 56px;
  text-align: center;
  margin: 8px;
  padding: 8px;
}

.otp-screen__btn{
    margin-top: 32px;
}
.otp-screen__submit-btn{
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
.otp-screen__submit-btn:disabled{
    opacity: 0.3;
    cursor: unset;
}
.otp-screen__resend-btn{
    margin: 16px 0;
}
.otp-screen__inputs-row input:focus {
  border-bottom: 2px solid rgba(54, 126, 233, 0.89);
  outline: unset;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
 @media screen and (max-width: 768px) {
    .otp-screen__inputs-row input {
          width: 22px;
          font-size: 32px;
    }
    .otp-screen__btn{
    position: fixed;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg,hsla(0,0%,100%,.3),#fff);
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
    padding-top: 16px;
    }
.otp-screen {
 margin-top: 30px;
}
}
</style>
