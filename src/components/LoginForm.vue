<template>
  <section class="login">
    <div class="login__wrapper">
      <h1>Login</h1>
      <form action="">
        <div class="login__wrapper-form-log">
          <input class="loginForm" type="email" v-model="email" placeholder="Email">
        </div>
        <div class="login__wrapper-form-pass">
          <input class="passForm" type="password" v-model="password" placeholder="Password">
        </div>
      </form>
      <div class="loginBtn">
        <button @click="login">
          Login
        </button>
      </div>
      <div class="signUp">
        Not a member? <a class="signUp__Link" href="/register">Sign up now</a>
      </div>
    </div>
  </section>
</template>

<script>
import AuthenticationService from "@/services/AuthtenticationService";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
      // Ваши данные здесь
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}` // Предполагается, что у вас есть переменная token в Vuex
          }
        });

        this.password = '';
        this.email = '';
        await this.$store.dispatch('setToken', response.data.token)
        await this.$store.dispatch('setUser', response.data.user)
        if(this.$store.state.isUserLoggedIn){
          this.$router.push('/user/current');
        }
        console.log(response.data.token)
        console.log(response.data.user.email)
      } catch (error) {
        this.error = error.response.data;
        this.password = '';
        this.email = '';
      }
    }
  }
}
</script>

<style scoped>

@font-face {
  font-family: "Raleway";
  src: url("../assets/fonts/Raleway-Bold.woff") format("woff");
  font-style: bold;
  font-weight: 800;
}

@font-face {
  font-family: "Raleway-Regular";
  src: url("../assets/fonts/Raleway-Regular.woff") format("woff");
  font-style: regular;
  font-weight: 400;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(to bottom, rgb(242, 72, 239), rgb(67, 45, 232)) no-repeat;;
}

.login {
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  margin: 0 auto;
  padding-top: 40px;
  margin-top: 70px;
  margin-bottom: 103px;
}

.login__wrapper {
  width: 450px;
  padding: 57px 50px 30px 50px;
}

h1 {
  font-family: "Raleway";
  font-weight: 800;
  font-size: 30px;
  color: #333;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 55px;
}

.loginForm {
  font-family: "Raleway";
  font-size: 18px;
  line-height: 1.2;
  color: #7b7b7b;
  display: block;
  width: 100%;
  background: #e6e6e6;
  outline: none;
  border: none;
  height: 62px;
  border-radius: 3px;
  padding: 0 30px 0 20px;
  margin-bottom: 18px;
  transition: all .4s;
}

.loginForm:focus {
  animation: anim-shadow .3s ease-in-out forwards;
  /* box-shadow: 0 0 40px 10px rgba(211, 63, 141, .6); */
  animation-duration: 1s;
  opacity: 0.5;
}

@keyframes anim-shadow {
  70% {box-shadow: 0 0 40px 10px rgba(211, 63, 141, .6)}
}

/* .loginForm:active {
    box-shadow: none;
} */

.passForm {
  font-family: "Raleway";
  font-size: 18px;
  line-height: 1.2;
  color: #686868;
  display: block;
  width: 100%;
  outline: none;
  border: none;
  background: #e6e6e6;
  height: 62px;
  border-radius: 3px;
  padding: 0 30px 0 20px;
  transition: all .4s;
}

.passForm:focus {
  animation: anim-shadow .3s ease-in-out forwards;
  /* box-shadow: 0 0 40px 10px rgba(211, 63, 141, .6); */
  animation-duration: 1s;
  opacity: 0.5;
}

@keyframes anim-shadow {
  70% {box-shadow: 0 0 40px 10px rgba(211, 63, 141, .6)}
}

.loginBtn {
  padding-top: 25px;
}

button {
  font-family: "Raleway";
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;
  width: 100%;
  border: none;
  height: 62px;
  border-radius: 3px;
  background: #d33f8d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  transition: all .4s;
}

button:hover {
  background-color: #333;
  cursor: pointer;
}

.signUp {
  font-family: "Raleway-Regular";
  font-size: 16px;
  color: #999;
  line-height: 1.4;
  padding-top: 100px;
  text-align: center;
}

.signUp>a {
  color: #999;
  transition: all 0.1s;
}

.signUp>a:hover {
  color: #d33f8d;
  text-decoration: none;
  font-weight: 600;
}
</style>