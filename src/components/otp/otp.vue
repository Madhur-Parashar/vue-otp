<template>
  <div class="otp-screen">
    <div class="otp-screen__text">
      Verification Code
    </div>
    <div class="otp-screen__sub--text">
      Please enter the verification code send to {{ userEmail }}
    </div>
    <div class="otp-screen__inputs-row">
      <template v-for="(key, index) in inputColumn">
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
      <button @click="resendHandler">Resend</button>
    </div>
    <div class="otp-screen__submit-btn">
      <button @click="submitOTPHandler" :disabled="isDisable">SUBMIT</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      otp: {}
    }
  },
  mounted () {
    console.log(this.inputColumn)
    this.resetOTP()
  },
  props: {
    inputColumn: {
      type: Number,
      required: true
    },
    userEmail: {
      type: String,
      default: ' '
    }
  },
  computed: {
    isDisable () {
      for (const key in this.otp) {
        if (this.otp[key] === '' || isNaN(this.otp[key])) return true
      }
      return false
    }
  },
  methods: {
    userInput (index, event) {
      //  --host 192.168.31.83 --port 8080
      console.log(event)
      if (
        event.key === 'Backspace' ||
        event.key === 'ArrowLeft' ||
        event.key === 'Left'
      ) {
        this.setFocus(index - 1)
        return
      }
      if (this.isValidInput(index, event)) {
        if (this.otp[`inputkey${index}`].toString().split('').length > 1) {
          this.shiftOtherDigitToForward(index)
        } else {
          this.setFocus(index + 1)
        }
      }
    },
    isValidInput (index, evt) {
      const pattern = /^[0-9]+$/
      // eslint-disable-next-line no-unneeded-ternary
      return evt.key.match(pattern) ? true : false
    },
    shiftOtherDigitToForward (index) {
      const inputs = this.otp[`inputkey${index}`].toString().split('')
      let inputIndex = 0
      for (let i = index; i < this.inputColumn; i++) {
        Vue.set(this.otp, `inputkey${i}`, Number(inputs[inputIndex]))
        inputIndex++
      }
      index + inputs.length > this.inputColumn
        ? this.setFocus(this.inputColumn - 1)
        : this.setFocus(index + inputs.length - 1)
    },

    setFocus (index) {
      // eslint-disable-next-line no-unused-expressions
      index >= 0 && index < this.inputColumn
        ? this.$nextTick(this.$refs['inputkey' + index][0].focus())
        : null
    },
    submitOTPHandler () {
      const otp = []
      for (const key in this.otp) {
        otp.push(this.otp[key])
      }
      console.log(Number(otp.join('')))
    },
    resendHandler () {
      this.resetOTP()
    },
    resetOTP () {
      for (let i = 0; i < this.inputColumn; i++) {
        Vue.set(this.otp, `inputkey${i}`, '')
      }
      this.setFocus(0)
    }
  }
}
</script>
<style scoped>
.otp-screen {
  display: flex;
  flex-direction: column;
}
.otp-screen__text{
    font-size: 18px;
    font-weight: 600;
}
.otp-screen__inputs-row {
  display: flex;
  justify-content: center;
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
</style>
