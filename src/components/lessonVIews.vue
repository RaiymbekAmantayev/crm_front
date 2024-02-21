<template>
  <div>
    <table  class="table" >
      <thead>
      <tr>
        <th>title</th>
        <th>credit_count</th>
        <th>description</th>
        <th>category</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="les in lessons"  :key="les.id">
        <td>{{ les.title }}</td>
        <td>{{ les.credit_count }}</td>
        <td>{{ les.description }}</td>
        <td>{{ les.categories ? les.categories.title : 'No position' }}</td>
        <td><ul class="nav" style="display: flex; justify-content: flex-end;" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
          <li class="nav-item">
            <router-link to=""><button class="btn btn-warning">edit</button></router-link>
          </li>
        </ul></td>
      </tr>
      </tbody>
    </table>
    <ul class="nav" style="display: flex; justify-content: flex-end;" v-if="$store.state.isUserLoggedIn &&  currentUserRole == 1">
      <li class="nav-item">
        <router-link to="/lesson/add"><button class="btn btn-primary">addLesson</button></router-link>
      </li>
    </ul>
  </div>
  <div class="container">
    <button @click="toggleCrn" class="btn btn-sm btn-primary">
      {{ isCrnOpen ? '-' : '+' }}
    </button>
    <div class="row">
      <div class="col-md-6">
        <h2>List CRN</h2>
        <table class="table" v-if="isCrnOpen">
          <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(crn,i) in crns" :key="crn.id">
            <td>{{i + 1}}</td>
            <td>{{ crn.title }}</td>
            <td>
              <ul class="nav" style="display: flex; justify-content: flex-end;">
                <li class="nav-item">
                  <router-link to=""><button class="btn btn-warning">edit</button></router-link>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h2>
          Add CRN
        </h2>
        <div v-if="isCrnOpen">
          <form @submit.prevent="AddCrn">
            <div class="mb-3">
              <label for="title" class="form-label">Title:</label>
              <input type="text" class="form-control" id="title" v-model="crnData.title">
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LessonService from "@/services/LessonService";
import CrnService from "@/services/CrnService";
// import OrganizationService from "@/services/OrganizationService";
export default {
  data() {
    return {
      lessons:{
        categories:[]
      },
      crns:{},
      crnData:{
        title:''
      },
      isCrnOpen:false,
    }
  },
  async mounted(){
    const response = await LessonService.showLesson()
    this.lessons = response.data
    const crn = await CrnService.showCrn()
    this.crns = crn.data
    console.log(this.lessons)
    console.log(this.crns)
  },
  methods:{
    async AddCrn(){
      const response = await CrnService.addCrn({
        title: this.crnData.title
      })
      console.log(response)
      this.refreshCrn()
      this.crnData.title= ''
    },
    async refreshCrn() {
      try {
        // Здесь вызываете ваш сервис или API-метод для получения обновленных данных об организациях
        const response = await CrnService.showCrn(); // Пример запроса на получение данных организаций
        this.crns = response.data; // Обновляем данные об организациях в вашем компоненте

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    toggleCrn() {
      this.isCrnOpen = !this.isCrnOpen;
    },
  },
  computed: {
    currentUserRole() {
      return this.$store.state.user ? this.$store.state.user.roleId : null;
    },
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
//text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #f5f5f5;
}
.table {
  margin: auto;
  width: 80%; /* Установите ширину таблицы по вашему усмотрению */
}
/* Optional: add more styles for better design */
</style>