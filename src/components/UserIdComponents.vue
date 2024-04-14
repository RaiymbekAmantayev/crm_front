<template>
  <div id="app">
  <section v-if="user" class="page">
    <div  class="profile">
      <div v-if="user" class="profile__content">
        <img v-if="user.image" :src="'http://localhost:7000/' + user.image">
        <img v-else src="../assets/img/profilePageAvatar.png" alt="">
        <div class="profile__content-wrapper">
          <h1 v-if="user.first_name">{{ user.first_name }}</h1>
          <p v-if="user.roleId == 1">Admin</p>
          <p v-else-if="user.roleId== 4">Teacher</p>
          <p v-else>User</p>
          <p v-if="user.roleId == 4 && user.cv_file"><a :href="pdfUrl" target="_blank">Открыть  резюме</a></p>
        </div>
        <div v-if="getCurrentUser === 6" class="profile__content-wrapper-buttons">
          <div class="department__content-description">
            <p>select dep</p>
            <select v-model="selectedDep">
              <option v-for="d in dep" :key="d.id" :value="d.id">
                {{d.title}}
              </option>
            </select>
          </div>
          <div class="department__content-description">
            <p>select role</p>
            <select  v-model="selectedRole">
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{role.value}}
              </option>
            </select>
          </div>
          <button class="profileDescription-button" @click="changeRole">
              Изменить
          </button>
        </div>
      </div>
    </div>
    <div class="profileDescription">
      <div class="profileDescription-wrapper">
        <div class="header">
          Full Name
        </div>
        <div class="paragraph" v-if="user.first_name || user.last_name">
          {{user.first_name}} {{user.last_name}}
        </div>
        <div class="paragraph" v-else>
        </div>
      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div class="header">
          Email
        </div>
        <div class="paragraph" v-if="user.email">
          {{user.email}}
        </div>
        <div class="paragraph" v-else>
        </div>
      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div class="header">
          Phone
        </div>
        <div class="paragraph" v-if=" user.phone_number">
          {{user.phone_number}}
        </div>
        <div class="paragraph" v-else>
        </div>
      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div v-if="user.roleId === 4 && user.roleId !== 2" class="header">
          User's grade is
        </div>
        <div v-else class="header">
          CV
        </div>
        <div v-if="user.roleId === 4" class="paragraph">
          <p v-if="position === undefined || position === null || position.title === undefined || position.title === null || teacher.grades.title === undefined || teacher.grades.title === null"></p>
          <p v-else-if="position && position.title && teacher.grades.title">{{ (position && position.title) ? position.title : "" }} {{ (teacher && teacher.grades && teacher.grades.title) ? teacher.grades.title : "" }} уровня</p>
        </div>

        <div v-else class="paragraph">
          <a :href="pdfUrl" target="_blank">Открыть  резюме</a>
        </div>

      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div class="header">
          department
        </div>
        <div class="paragraph">
          <p v-if="user.department && user.department.title">{{ user.department.title }}</p>
        </div>
      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div class="header">
          Role
        </div>
        <div class="paragraph">
          <p>{{ user.role.value }}</p>
        </div>
      </div>
      <hr>
      <div v-if="user.roleId === 4" class="profileDescription-button">
        <button @click="routing(user.id)">
            Показать достижения
        </button>
      </div>
    </div>
  </section>
  </div>
</template>

<script>

import UserService from "@/services/UserService";
import RoleServices from "@/services/RoleServices";
import Dep from "@/services/departmentService"
import TeacherService from "@/services/TeacherService";

export default {
  data() {
    return {
      user: {
        role:[],
        department:[]
      },
      roles:{},
      dep:{},
      teacher : {
        grades:[]
      },
      position: {},
      deans: {},
      selectedRole: null,
      selectedDep: null,
    }
  },
  async mounted(){
    try{
      const id = this.$route.params.id;
      const response = await UserService.getUserById(id)
      this.user = response.data
      const roles = await RoleServices.ShowRoles()
      this.roles = roles.data
      const department = await Dep.ShowDep()
      this.dep = department.data
      const responseTeachers = await TeacherService.showTeachersById(id);
      this.teacher = responseTeachers.data.teacher;
      this.position = responseTeachers.data.position
      console.log(this.dep)
      console.log(this.roles)
      console.log(this.user)
    }catch (e){
      console.log(e)
    }
  },
  methods:{
    routing(userId){
      this.$router.push('/achievments/'+ userId)
    },
    async changeRole(){
      try{
        const id = this.$route.params.id;
        const response = await UserService.RoleById(id, {
          roleId: this.selectedRole
        });
        const dep = await UserService.DepById(id, {
          departmentId: this.selectedDep
        })
        console.log(this.selectedDep);
        console.log(dep.data);
        console.log(this.selectedRole);
        console.log(id);
        console.log(response.data);
        this.$router.push('/users');
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    pdfUrl() {
      return `http://localhost:7000/${this.user.cv_file}`;
    },
    getCurrentUser(){
      return this.$store.state.user ? this.$store.state.user.roleId : null;
    }
  }
}
</script>

<style>

.department__content-description {
  font-size: 12px;
  font-family: "OpenSans";
  color: #949494;
  margin-bottom: 10px;
}
body {
background-color: #f8f9fa;
}
.button{
  padding: 10px 121px;
  border-radius: 6px;
  font-family: "OpenSans";
  color: #fff;
  font-size: 14px;
  background-color: #4120fd;
  border: 2px solid #4120fd;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: #fff;
  color: #000;
}
.container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.card {
  margin-top: 20px;
}
.avatar-img {
  max-width: 100px; /* Задайте желаемую ширину */
  height: auto;
  border-radius: 70%; /* Для круглой формы */
}
.form-group {
  margin-bottom: 15px;
}

img {
  max-width: 100%;
  height: auto;
}
</style>