<template>
  <div id="app" class="container mt-5">
    <h1>User Profile</h1>
    <div class="card">
      <div class="card-body">
        <div v-if="user" class="form-group">
          <label for="first_name">First Name:</label>
          <p>{{ user.first_name }}</p>
        </div>
        <div class="form-group">
          <label for="last_name">Last Name:</label>
          <p>{{ user.last_name }}</p>
        </div>
        <div  class="form-group">
          <img :src="'http://localhost:7000/' + user.image" class="avatar-img" alt="Song Cover">
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
        <div class="form-group">
          <label>Belongs to department</label>
          <p>{{ user.department.title }}</p>
        </div>
        <div v-if="user.role.value == 'teacher'"  class="form-group">
          <router-link :to="{ path: 'achievment/' }" class="btn btn-primary">
            Добавить достижения
          </router-link>
        </div>
        <div class="form-group">
          <label for="phone_number">Role:</label>
          <p>{{ user.role.value }}</p>
          <p>{{user.role.description}}</p>
        </div>
      </div>
    </div>
    <button class="btn-btn-primary">
    <router-link to="/user/complete">add info</router-link>
    </button>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import TeacherService from "@/services/TeacherService";
export default {
  data() {
    return {
      user: {
        role:[],
        department:[]
      },
      teacher : {
        grades:[]
      },
      position: {},
      deans: {}
    }
  },
  async mounted(){
    try{
      const response = await UserService.getCurrentUser()
      this.user = response.data
        const responseTeachers = await TeacherService.showTeachersByCurrent();
        this.teacher = responseTeachers.data.teacher;
        this.position = responseTeachers.data.position
        console.log(this.teacher)
      console.log(this.user)
    }catch (e){
      console.log(e)
    }
  },
  methods:{
  },
  computed: {
    pdfUrl() {
      return `http://localhost:7000/${this.user.cv_file}`;
    },
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