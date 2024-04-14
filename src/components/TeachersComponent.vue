<template>
  <h1>Все преподователи</h1>
  <div class="container" v-if="currentUserRole == 6">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>name</th>
        <th>salary</th>
        <th>email</th>
        <th>phone</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="teacher in AllTeachers"  :key="teacher.id" >
        <td><img v-if="teacher.user.image" class="avatar" :src="'http://localhost:7000/' + teacher.user.image" alt="Avatar">
        <img v-else class="avatar"  src="../assets/istockphoto-1300845620-612x612.jpg"></td>
        <td>{{teacher.user.first_name}} {{teacher.user.last_name}}</td>
        <td>{{teacher.salary}}</td>
        <td>{{teacher.user.email}}</td>
        <td>{{teacher.user.phone_number}}</td>
        <td><router-link :to="{ path: 'users/' +  teacher.user.id  }" class="btn btn-primary">
          Посмотреть пользователя
        </router-link></td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="container" v-if="currentUserRole == 1">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>name</th>
        <th>salary</th>
        <th>email</th>
        <th>phone</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="teacher in teachers"  :key="teacher.id" >
        <td><img v-if="teacher.user.image" class="avatar" :src="'http://localhost:7000/' + teacher.user.image" alt="Avatar">
          <img v-else class="avatar"  src="../assets/istockphoto-1300845620-612x612.jpg"></td>
        <td>{{teacher.user.first_name}} {{teacher.user.last_name}}</td>
        <td>{{teacher.salary}}</td>
        <td>{{teacher.user.email}}</td>
        <td>{{teacher.user.phone_number}}</td>
        <td><router-link :to="{ path: 'users/' +  teacher.user.id  }" class="btn btn-primary">
          Посмотреть пользователя
        </router-link></td>
      </tr>
      </tbody>
    </table>
    <router-link :to="{ path: 'teachers/add'  }" class="btn btn-primary">
      Добавить
    </router-link>
  </div>
</template>

<script>

import TeacherService from "@/services/TeacherService";

export default {
  data() {
    return {
      teachers:[],
      AllTeachers : []
    }
  },
  async mounted(){
    try{
        const response = await TeacherService.showTeachers()
        this.teachers = response.data
        const AllTeachers = await TeacherService.showAllTeachers()
        this.AllTeachers = AllTeachers.data
        console.log(this.teachers)
    }catch (e){
      console.log(e)
    }
  },
  methods:{
  },
  computed: {
    currentUserRole() {
      return this.$store.state.user ? this.$store.state.user.roleId : null;
    },
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: auto;
  margin-bottom: 15%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

h1 {
  text-align: center;
  color: #333;
  margin: 0;
  padding: 20px 0;
  margin-bottom: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

td {
  color: #555;
}
/* Стиль для изображений аватаров */

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>