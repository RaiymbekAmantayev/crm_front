<template>
  <div class="department">
    <div class="department__content">
      <h1>Add Teacher</h1>
      <div class="department__content-description">
        <p>select user</p>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.email }}
          </option>
        </select>
      </div>
      <form action="">
        <input type="number" placeholder="salary"  class="form-control" v-model="salary"  />
      </form>
      <form action="">
        <input type="number" placeholder="students survey" class="form-control" v-model="student_survey"  />
      </form>
      <div class="department__content-button">
          <button @click="addTeacher">
            Добавить
          </button>
      </div>
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


.form-control {
  border-radius: 5px;
}

h1 {
  text-align: center;
}
</style>

<style scoped>
@font-face {
  font-family: "OpenSans";
  src: url("../assets/fonts/OpenSans-Regular.woff") format("woff");
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: "OpenSans";
  src: url("../assets/fonts/OpenSans-Light.woff") format("woff");
  font-style: normal;
  font-weight: 100;
}

@font-face {
  font-family: "Raleway";
  src: url("../assets/fonts/Raleway-Bold.woff") format("woff");
  font-style: bold;
  font-weight: 800;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}



.department{
  align-items: center;
  margin-left: 30%;
}

.department__content {
  display: flex;
  width: 500px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

h1 {
  font-size: 24px;
  font-family: "OpenSans";
  margin-bottom: 10px;
  padding-top: 25px;
}

.department__content-description {
  font-size: 12px;
  font-family: "OpenSans";
  color: #949494;
  margin-bottom: 10px;
}

.department__content-descriptionTwo {
  font-size: 12px;
  font-family: "OpenSans";
  color: #949494;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}

form>input {
  width: 300px;
  height: 30px;
  border: 0;
  font-family: "OpenSans";
  font-size: 16px;
  padding-left: 10px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
}

form>input:focus {
  border-color: red;
}

.department__content-button {
  padding-top: 10px;
  margin-bottom: 15px;
  padding-bottom: 25px;
}

.department__content-button>a>button {
  padding: 10px 121px;
  border-radius: 6px;
  font-family: "OpenSans";
  color: #fff;
  font-size: 14px;
  background-color: #4120fd;
  border: 2px solid #4120fd;
  transition-duration: 0.4s;
  cursor: pointer;
}

.department__content-button>a>button:hover {
  background-color: #fff;
  color: #000;
}
</style>