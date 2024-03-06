<template>
  <nav class="navbar navbar-expand-lg bg-primary mt-0">
    <div class="container-fluid">
      <div v-if="!$store.state.isUserLoggedIn">
        <a  class="navbar-brand text-white" href="#">Crm System</a>
      </div>
      <div v-if="$store.state.isUserLoggedIn && currentUserName">
        <li class="navbar-brand text-white" v-if="$store.state.isUserLoggedIn">
          <router-link to="/user/current"><label class="btn btn-outline-light">{{currentUserName}}</label></router-link>
        </li>
      </div>
      <div v-if="$store.state.isUserLoggedIn && !currentUserName">
        <li class="navbar-brand text-white" v-if="$store.state.isUserLoggedIn">
          <router-link to="/user/current"><button class="btn btn-outline-light">{{currentUserEmail}}</button></router-link>
        </li>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!$store.state.isUserLoggedIn">
            <router-link to="/" class="nav-link text-white">Sign In</router-link>
          </li>
          <li class="nav-item" v-if="!$store.state.isUserLoggedIn">
            <router-link to="/register" class="nav-link text-white">Sign Up</router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn">
            <router-link to="/"><button @click="logout" class="btn btn-outline-light">Logout</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
            <router-link to="/users"><button class="btn btn-outline-light">users</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
            <router-link to="/teachers"><button class="btn btn-outline-light">teachers</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
            <router-link to="/lesson"><button class="btn btn-outline-light">Lessons</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
            <router-link to="/grade"><button class="btn btn-outline-light">Grades</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
            <router-link to="/dean/add"><button class="btn btn-outline-light">Departmnet</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
            <router-link to="/shedule/add"><button class="btn btn-outline-light">Shedules</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 4">
            <router-link to="/shedules"><button class="btn btn-outline-light">Shedules</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 4">
            <router-link to="/achievments"><button class="btn btn-outline-light">Achievements</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
            <router-link to="/achievments/all"><button class="btn btn-outline-light">Achievements</button></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
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
    currentUserName() {
      return this.$store.state.user ? this.$store.state.user.first_name : null;
    },
    currentUserEmail() {
      return this.$store.state.user ? this.$store.state.user.email : null;
    }
  }

}
</script>

<style>

</style>