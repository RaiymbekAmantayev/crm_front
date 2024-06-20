<template>
  <div class="container">
    <div style="margin-left: 90%">
    <p>get info by user </p>
    <select style="border-bottom-color: black" v-model="selectedUser" @change="getUsers">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.email }}
      </option>
    </select>
    </div>
    <h1>Сертификаттар тізімі</h1>
    <table v-if="isAll">
      <thead>
      <tr>
        <th>Sertific Title</th>
        <th>File</th>
        <th>Organization</th>
        <th>User</th>
        <th>Department</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="sert in sertificates"  :key="sert.id">
        <td>{{ sert.title  }}</td>
        <td><a :href="pdfUrl(sert.userId)" target="_blank">Файлды ашу</a></td>
        <td>{{ sert.organization ? sert.organization.title : "no org"}}</td>
        <td>{{ sert.users ? sert.users.email : "no User" }}</td>
        <td>{{ sert.users?.department?.title || "no Department" }}</td>
        <td><ul class="nav" style="display: flex; justify-content: flex-end;">
          <li class="nav-item">
            <router-link to=""><button class="btn btn-warning">show</button></router-link>
          </li>
        </ul></td>
      </tr>
      </tbody>
    </table>
    <h1>Жобалар тізімі</h1>
    <table v-if="isAll">
      <thead>
      <tr>
        <th>Project Title</th>
        <th>Type</th>
        <th>File</th>
        <th>User</th>
        <th>Department</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="proj in projects"  :key="proj.id">
        <td>{{ proj.title  }}</td>
        <td>{{ proj.project_categories ? proj.project_categories.title : "no org"}}</td>
        <td><a :href="ProjectURl(proj.userId)" target="_blank">Файлды ашу</a></td>
        <td>{{ proj.users ? proj.users.email : "no User" }}</td>
        <td>{{ proj.users?.department?.title || "no Department" }}</td>
        <td><ul class="nav" style="display: flex; justify-content: flex-end;">
          <li class="nav-item">
            <router-link to=""><button class="btn btn-warning">show</button></router-link>
          </li>
        </ul></td>
      </tr>
      </tbody>
    </table>
    <h1>Мақалалар тізімі</h1>
    <table v-if="isAll">
      <thead>
      <tr>
        <th>№</th>
        <th>Article Title</th>
        <th>Publishment</th>
        <th>Link</th>
        <th>User</th>
        <th>Department</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(article, i) in articles" :key="article.id">
        <td>{{i + 1}}</td>
        <td>{{ article.title }}</td>
        <td v-if="article.link"><a :href="article.link" target="_blank">{{article.link.split('/').slice(-2).join('/')}}</a> </td>
        <td>{{ article.publications ? article.publications.title : 'No position' }}</td>
        <td>{{ article.users ? article.users.email : "no User" }}</td>
        <td>{{ article.users?.department?.title || "no Department" }}</td>
        <td><ul class="nav" style="display: flex; justify-content: flex-end;">
          <li class="nav-item">
            <router-link to=""><button class="btn btn-warning">show</button></router-link>
          </li>
        </ul></td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import SertificatingService from "@/services/SertificatingService";
import ProjectServices from "@/services/ProjectServices";
import ArticleService from "@/services/ArticleService";
import UserService from "@/services/UserService";
export default {
  data() {
    return {
      sertificates:{
        organization:[],
        users: {
          department: {}
        },
      },
      projects:{
        categories:[],
        users: {
          department: {}
        },
      },
      articles:{
        publications:[],
        users:{
          department:{}
        }
      },
      isAll:true,
      users:{},
      selectedUser: null,
    };
  },
  async mounted(){
    const response = await SertificatingService.getAll()
    this.sertificates = response.data
    console.log(this.sertificates)
    const projects = await ProjectServices.getAll()
    this.projects = projects.data
    console.log(this.projects)
    const articles = await ArticleService.getAll()
    this.articles = articles.data
    console.log(this.articles)
    const user = await UserService.getAllUsers()
    this.users = user.data
    console.log(user)
  },
  methods: {
    async getUsers(){

    }
  },
  computed: {
    pdfUrl() {
      return function(userId) {
        const user = this.sertificates[userId];
        if (user) {
          return `http://localhost:7000/${user.file}`;
        } else {
          return ''; // Handle case where user ID is not found
        }
      };
    },
    ProjectURl() {
      return function(userId) {
        console.log(userId)
        const user = this.projects[userId];
        if (user) {
          return `http://localhost:7000/${user.file}`;
        } else {
          return ''; // Handle case where user ID is not found
        }
      };
    },
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

.container {
  /* max-width: 1000px; */
  margin: auto;
  background-color: #fff;
  padding: 20px 20px 65px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f2f2f2;
}

h1 {
  text-align: center;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 45px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 8px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input[type="text"] {
  width: calc(100% - 24px);
  padding: 10px;
  margin: 6px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"],
#openModalBtn {
  margin-bottom: 10px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

button[type="submit"]:hover,
#openModalBtn:hover {
  background-color: #45a049;
}
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
//margin-left: 30%;
}

.department__content {
  display: flex;
  width: 500px;
  border-radius: 20px;
//margin-left: 50px;
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
