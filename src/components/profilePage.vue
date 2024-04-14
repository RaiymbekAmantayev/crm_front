<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../styles/profilePage.css">
  </head>
  <section class="page">
    <div  class="profile">
      <div v-if="user" class="profile__content">
        <img v-if="user.image" :src="'http://localhost:7000/' + user.image">
        <img v-else src="../assets/img/profilePageAvatar.png" alt="">
        <div class="profile__content-wrapper">
          <h1>{{ user.first_name }}</h1>
          <p v-if="currentUserRole == 1">Admin</p>
          <p v-else-if="currentUserRole == 4">Teacher</p>
          <p v-else-if="currentUserRole == 6">Main_admin</p>
          <p v-else>User</p>
          <p v-if="currentUserRole == 4"><a :href="pdfUrl" target="_blank">Открыть  резюме</a></p>
          <div class="profile__content-wrapper-buttons">
            <button class="profile__content-wrapper-btnOne">
                <router-link to="/user/complete">add info</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="profileDescription">
      <div class="profileDescription-wrapper">
        <div class="header">
          Full Name
        </div>
        <div class="paragraph">
          {{user.first_name}} {{user.last_name}}
        </div>
      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div class="header">
          Email
        </div>
        <div class="paragraph">
          {{user.email}}
        </div>
      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div class="header">
          Phone
        </div>
        <div class="paragraph">
          {{user.phone_number}}
        </div>
      </div>
      <hr>
      <div class="profileDescription-wrapper">
        <div v-if="currentUserRole == 4"  class="header">
          Your grade is
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
      <div v-if="currentUserRole == 4" class="profileDescription-button">
        <button>
          <router-link :to="{ path: 'achievment/' }" >
            Добавить достижения
          </router-link>
        </button>
      </div>
    </div>
  </section>
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
    currentUserRole() {
      return this.$store.state.user ? this.$store.state.user.roleId : null;
    },
  }
}
</script>

<!--<style>-->
<!--body {-->
<!--  background-color: #f8f9fa;-->
<!--}-->

<!--.container {-->
<!--  background-color: #ffffff;-->
<!--  padding: 20px;-->
<!--  border-radius: 10px;-->
<!--}-->

<!--.card {-->
<!--  margin-top: 20px;-->
<!--}-->
<!--.avatar-img {-->
<!--  max-width: 100px; /* Задайте желаемую ширину */-->
<!--  height: auto;-->
<!--  border-radius: 70%; /* Для круглой формы */-->
<!--}-->
<!--.form-group {-->
<!--  margin-bottom: 15px;-->
<!--}-->

<!--img {-->
<!--  max-width: 100%;-->
<!--  height: auto;-->
<!--}-->
<!--</style>-->

<style>
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

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  background-color: #e2e8f0;
  padding-top: 208px;
  padding-bottom: 208px;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
}

.profile {
  width: 320px;
  background-color: #fff;
  margin-left: 100px;
  margin-right: 16px;
  border-radius: 8px;
}

.profile__content {
  height: 376px;
  display: flex;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .1), 1px 1px 20px 7px rgba(0, 0, 0, .06);
  flex-direction: column;
  align-items: center;
  padding: 10px 0px 10px;
}

.profile__content>img {
  width: 150px;
  border-radius: 50%;
}

.profile__content-wrapper {
  text-align: center;
  margin-top: 16px;
}

.profile__content-wrapper>h1 {
  font-size: 24px;
  font-weight: 500;
  font-family: "OpenSans";
  margin-bottom: 8px;
  line-height: 1.2;
}

.profile__content-wrapper>p {
  font-family: "OpenSans";
  color: #6c757d;
  margin-bottom: 4px;
}

.profile__content-wrapper-buttons {
  margin-top: 16px;
}

.profile__content-wrapper-btnOne {
  cursor: pointer;
  background-color: #007bff;
  border-color: #007bff;
  font-weight: 400;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  padding: 6px 12px;
}

.profile__content-wrapper-btnOne:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.profile__content-wrapper-btnOne>a {
  text-decoration: none;
  color: #fff;
}

.profile__content-wrapper-btnTwo {
  cursor: pointer;
  border-color: #007bff;
  font-weight: 400;
  background-color: #007bff;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  padding: 6px 12px;
}

.profile__content-wrapper-btnTwo:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.profile__content-wrapper-btnTwo>a {
  text-decoration: none;
  color: #fff;
}

.profileDescription {
  display: flex;
  padding: 10px;
  background-color: #fff;
  width: 685px;
  border-radius: 8px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .1), 1px 1px 20px 7px rgba(0, 0, 0, .06);
  flex-direction: column;
}

.profileDescription-wrapper {
  display: flex;
  justify-content: space-between;
}

.header {
  font-size: 16px;
  font-weight: 800;
  line-height: 1.2;
  /* margin-right: 125px; */
  font-family: "OpenSans";
  color: #000;
  padding-left: 15px;
}

.paragraph {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  font-family: "OpenSans";
  color: #6c757d;
  padding-right: 15px;
}

hr {
  margin-bottom: 16px;
  margin-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, .1);
}

.profileDescription-button {
  max-width: 192px;
}

.profileDescription-button>button {
  cursor: pointer;
  background-color: #17a2b8;
  border-color: #17a2b8;
  font-weight: 400;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  padding: 6px 12px;
}

.profileDescription-button:hover {
  background-color: #138496;
  border-color: #138496;
  border-radius: 4px;
}

.profileDescription-button>button>a {
  text-decoration: none;
  color: #fff;
}

</style>