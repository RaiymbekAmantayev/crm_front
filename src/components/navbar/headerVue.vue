<template>
  <body>
<header>
<div class="header__navbar container">
  <nav class="header__menu">
    <ul>
      <div v-if="!$store.state.isUserLoggedIn">
        <a  class="navbar-brand text-white" href="#">Crm System</a>
      </div>
      <li><a href="#1">Главное</a></li>
      <li><a href="#2">О компании</a></li>
      <li><a href="#3">Почему мы</a></li>
      <li><a href="#4">Этапы</a></li>
      <!-- <li><a href="">Отделение</a></li>
      <li><a href="">График занятий</a></li> -->
    </ul>
    <div class="header__menu-btn">
      <a href="login.html">
        <button>Вход</button>
      </a>
    </div>
  </nav>
</div>
</header>
  </body>
</template>

  <script>
  export default {
    name: 'headerVue',
    methods:{
      logout(){
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
      }
    },
    // В вашем компоненте Vue
    computed: {
      currentUserRole() {
        return this.$store.state.user ? this.$store.state.user.roleId : null;
      },
    }
  }
  </script>


<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

header {
  background-color: #101820;
  opacity: 100%;
}


.header__menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header__menu>ul {
  display: flex;
  margin-right: 70px;
  list-style-type: none;
}

.header__menu>ul>li {
  margin-right: 20px;
}

.header__menu>ul>li>a {
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  font-family: "OpenSans";
  font-weight: 400;
  font-size: 14px;
  transition: all 500ms ease;
}

.header__menu>ul>li>a:hover {
  color: #d33f8d;
}

.header__menu-btn>a>button {
  padding: 0 40px 0 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 26px;
  color: #FFFFFF;
  border-radius: 20px;
  background-color: #d33f8d;
  box-shadow: 0px 0px 10px rgba(111, 111, 111, 0.25);
  border: none;
  transition: all 500ms ease;
  cursor: pointer;
}

.header__menu-btn>a>button:hover {
  color: #d33f8d;
  background: rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 0 3px #f6f6f6;
}
</style>