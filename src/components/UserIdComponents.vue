<template>
  <div id="app" class="container mt-5">
    <h1>User Profile</h1>
    <div class="card">
      <div class="card-body">
        <div v-if="user.first_name" class="form-group">
          <label for="first_name">First Name:</label>
          <p>{{ user.first_name }}</p>
        </div>
        <div v-if="user.last_name" class="form-group">
          <label for="last_name">Last Name:</label>
          <p>{{ user.last_name }}</p>
        </div>
        <div class="form-group">
          <label for="last_name">Email:</label>
          <p>{{ user.email }}</p>
        </div>
        <div v-if="user.image"  class="form-group">
          <img :src="'http://localhost:7000/' + user.image" class="avatar-img" alt="...">
        </div>
        <div v-if="user.cv_file" class="form-group">
          <label for="cv_file">CV:</label>
          <a :href="pdfUrl" target="_blank">Открыть  резюме</a>
        </div>
        <div class="form-group">
          <label for="phone_number">Phone Number:</label>
          <p>{{ user.phone_number }}</p>
        </div>
        <div v-if="teacher.salary" class="form-group">
          <label for="phone_number">Salary:</label>
          <p>{{ teacher.salary }}</p>
        </div>
        <div v-if="teacher && teacher.grades && position.title">
          <label>Your grade is:</label>
          <p>{{ position && position.title }} {{ teacher.grades.title }}</p>
        </div>
        <div v-if="user.phone_number" class="form-group">
          <label for="phone_number">Phone Number:</label>
          <p>{{ user.phone_number }}</p>
        </div>
        <div class="form-group">
          <label for="phone_number">Role:</label>
          <p>{{ user.role.value }}</p>
          <p>{{user.role.description}}</p>
        </div>

        <div v-if="user.department" class="form-group">
          <label>Принадлежить к департаменту:</label>
          <p>{{ user.department.title }}</p>
        </div>
        <div v-if="$store.state.isUserLoggedIn && getCurrentUser == 1">
        <p>change role</p>
        <select  v-model="selectedRole">
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{role.value}}
          </option>
        </select>
          <p>add to dep</p>
          <select v-model="selectedDep">
            <option v-for="d in dep" :key="d.id" :value="d.id">
              {{d.title}}
            </option>
          </select>
      </div>
      </div>
    </div>
    <button @click="changeRole" class="btn-btn-primary">change</button>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import RoleServices from "@/services/RoleServices";
import Dep from "@/services/departmentService"
import TeacherService from "@/services/TeacherService";
// import {th} from "vuetify/locale";
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
body {
  background-color: #f8f9fa;
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