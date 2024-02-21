<template>
  <div class="file-upload-container container mt-5">
    <h1>add Teacher</h1>
    <div>
      <p>select User</p>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.email }}
        </option>
      </select>
      <div class="form-group">
        <label>enter salary</label> <br>
        <input type="number" class="form-control" v-model="salary"  />
      </div>
      <div class="form-group">
        <label>enter survey of students</label> <br>
        <input type="number" class="form-control" v-model="student_survey"  />
      </div>
      <button @click="addTeacher" class="btn btn-primary btn-block">Add Info</button>
    </div>
  </div>
</template>


<script>

import RoleServices from "@/services/RoleServices";
import TeacherService from "@/services/TeacherService";


export default {
  data() {
    return {
      users: [], // Initialize as an empty array
      selectedUser: null,
      salary: '',
      student_survey: null
  };

  },
  async mounted() {
    try {
      const response = await RoleServices.getTeachers();
      this.users = response.data;
      if (this.users.length > 0) {
        this.selectedUser = this.users[0].id;
      }
      console.log(this.users);
    } catch (e) {
      console.log(e);
    }
  },
  methods:{
    async addTeacher(){
      try{
        const response = await TeacherService.addTeacher( {
          userId: this.selectedUser,
          salary: this.salary,
          student_survey: this.student_survey
        });
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
  },
  }
</script>

<style scoped>
template {
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
}

.file-upload-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  border-radius: 5px;
}

h1 {
  text-align: center;
}
</style>