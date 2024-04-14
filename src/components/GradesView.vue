<template>
  <div>
    <h2 v-if="currentUserRole == 1">List of requirments to grade</h2>
    <h2 v-if="currentUserRole == 6">Settings of detail</h2>
    <table v-if="currentUserRole == 1"  class="table" >
      <thead>
      <tr>
        <th>title</th>
        <th>hasPhd</th>
        <th>experience</th>
        <th>min_count_article</th>
        <th>min_count_projects</th>
        <th>min_count_sertificates</th>
        <th>min_count_seminar</th>
        <th>min_count_monoprahy</th>
        <th>points</th>
        <th>position</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="grade in grades"  :key="grade.id">
        <td>{{ grade.title }}</td>
        <td>{{ grade.hasPhd }}</td>
        <td>{{ grade.experience }}</td>
        <td>{{ grade.min_count_article }}</td>
        <td>{{ grade.min_count_projects }}</td>
        <td>{{ grade.min_count_sertificates }}</td>
        <td>{{ grade.min_count_seminar }}</td>
        <td>{{ grade.min_count_monography }}</td>
        <td>{{ grade.points }}</td>
        <td>{{ grade.position ? grade.position.title : 'No position' }}</td>
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
        <router-link to="/grade/add"><button class="btn btn-primary">addGrade</button></router-link>
      </li>
    </ul>
  </div>

  <div class="container">
    <button @click="togglePositionForm" class="btn btn-sm btn-primary">
      {{ isPositionFormOpen ? '-' : '+' }}
    </button>
    <div class="row">
      <div class="col-md-6">
        <h2>List of positions</h2>
        <table v-if="isPositionFormOpen" class="table">
          <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th v-if="currentUserRole== 6">action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pos, i) in positions" :key="pos.id">
            <td>{{i + 1}}</td>
            <td>{{ pos.title }}</td>
            <td>
              <ul class="nav" style="display: flex; justify-content: flex-end;"
                  v-if="$store.state.isUserLoggedIn &&  currentUserRole == 6">
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
        <!-- В этой колонке будет форма добавления -->
        <div v-if="currentUserRole == 6">
          <h2>Add Position</h2>
          <form v-if="isPositionFormOpen" @submit.prevent="addPosition">
            <div class="mb-3">
              <label for="title" class="form-label">Title:</label>
              <input type="text" class="form-control" id="title" v-model="formData.title">
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <button @click="toggleAddCategoryForm" class="btn btn-sm btn-primary">
      {{ isAddCategoryFormOpen ? '-' : '+' }}
    </button>
    <div class="row">
      <div class="col-md-6">
        <h2>List category of projects</h2>
        <table class="table" v-if="isAddCategoryFormOpen">
          <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>points</th>
            <th v-if="currentUserRole == 6">action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(cat,i) in categories" :key="cat.id">
            <td>{{i + 1}}</td>
            <td>{{ cat.title }}</td>
            <td>{{ cat.points }}</td>
            <td>
              <ul class="nav" style="display: flex; justify-content: flex-end;"
                  v-if="$store.state.isUserLoggedIn &&  currentUserRole == 6">
                <li class="nav-item">
                  <router-link to=""><button class="btn btn-warning">edit</button></router-link>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6" v-if="currentUserRole == 6">
        <h2>
          Add Category
        </h2>
        <div v-if="isAddCategoryFormOpen">
          <form @submit.prevent="AddCategory">
            <div class="mb-3">
              <label for="title" class="form-label">Title:</label>
              <input type="text" class="form-control" id="title" v-model="Data.title">
            </div>
            <div class="mb-3">
              <label for="points" class="form-label">Points:</label>
              <input type="number" class="form-control" id="points" v-model="Data.points">
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <button @click="togglePublicationForm" class="btn btn-sm btn-primary">
      {{ isPublicationFormOpen ? '-' : '+' }}
    </button>
    <div class="row">
      <div class="col-md-6">
        <h2>List publication of articles</h2>
        <table class="table" v-if="isPublicationFormOpen">
          <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>points</th>
            <th v-if="currentUserRole == 6">action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pub, i) in publications" :key="pub.id">
            <td>{{i + 1}}</td>
            <td>{{ pub.title }}</td>
            <td>{{ pub.points }}</td>
            <td>
              <ul class="nav" style="display: flex; justify-content: flex-end;"
                  v-if="$store.state.isUserLoggedIn &&  currentUserRole == 6">
                <li class="nav-item">
                  <router-link to=""><button class="btn btn-warning">edit</button></router-link>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6" v-if="currentUserRole == 6">
        <h2>
          Add Publication
        </h2>
        <div v-if="isPublicationFormOpen">
          <form @submit.prevent="AddPublication">
            <div class="mb-3">
              <label for="title" class="form-label">Title:</label>
              <input type="text" class="form-control" id="title" v-model="publicData.title">
            </div>
            <div class="mb-3">
              <label for="points" class="form-label">Points:</label>
              <input type="number" class="form-control" id="points" v-model="publicData.points">
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <button @click="toggleSerticiationForm" class="btn btn-sm btn-primary">
      {{ isSertificateOpen ? '-' : '+' }}
    </button>
    <div class="row">
      <div class="col-md-6">
        <h2>List organizations of sertificates</h2>
        <table class="table" v-if="isSertificateOpen">
          <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>points</th>
            <th v-if="currentUserRole == 6">action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(org, index) in organizations" :key="org.id">
            <td>{{index + 1}}</td>
            <td>{{ org.title }}</td>
            <td>{{ org.points }}</td>
            <td>
              <ul class="nav" style="display: flex; justify-content: flex-end;"
                  v-if="$store.state.isUserLoggedIn &&  currentUserRole == 6">
                <li class="nav-item">
                  <router-link to=""><button class="btn btn-warning">edit</button></router-link>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6" v-if="currentUserRole == 6">
        <h2>
          Add Organizations
        </h2>
        <div v-if="isSertificateOpen">
          <form @submit.prevent="AddOrganize">
            <div class="mb-3">
              <label for="title" class="form-label">Title:</label>
              <input type="text" class="form-control" id="title" v-model="organizeData.title">
            </div>
            <div class="mb-3">
              <label for="points" class="form-label">Points:</label>
              <input type="number" class="form-control" id="points" v-model="organizeData.points">
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GradeService from "@/services/GradeService";
import PositionService from "@/services/PositionService";
import Project_categories from "@/services/Project_categories";
import PublicationService from "@/services/PublicationService";
import OrganizationService from "@/services/OrganizationService";
// import {th} from "vuetify/locale";
export default {
  data() {
    return {
      grades:{
        position:[]
      },
      positions: {},
      formData:{
        title: '',
      },
      Data: {
        category_title: '',
        points: null
      },
      categories:{},

      publications:{},
      publicData:{
        title: '',
        points: null
      },
      organizations:{},
      organizeData:{
        title: '',
        points: ''
      },
      isPositionFormOpen: false,
      isAddCategoryFormOpen: false,
      isPublicationFormOpen: false,
      isSertificateOpen: false
    }
    },
  async mounted(){
    const response = await GradeService.showGrades()
    this.grades = response.data
    console.log(this.grades)
    const positions = await PositionService.showPosition()
    this.positions = positions.data
    const project_category = await Project_categories.showProjectCategory()
    this.categories = project_category.data
    const publication = await PublicationService.showPublications()
    this.publications = publication.data
    const organize = await OrganizationService.showOrganzition()
    this.organizations = organize.data
    console.log(this.organizations)
    console.log(this.publications)
    console.log(this.categories)
    console.log(this.grades)
    console.log(this.positions)
  },
  methods: {
    async addPosition() {
      try {
        const response = await PositionService.addPosition(this.formData);
        console.log(response.data);
        this.refreshPositions()
        this.formData.title = '';
      } catch (error) {
        console.error('Error adding position:', error);
      }
    },
    async AddCategory() {
      try {
        const response = await Project_categories.addProjectCategory(this.Data)
        console.log(response)
        this.refreshCategory()
        this.Data.title = '';
        this.Data.points = '';
      } catch (error) {
        console.error('Error adding category:', error);
      }
    },
    async AddPublication() {
      try {
        const response = await PublicationService.addPublic({
          title: this.publicData.title,
          points: this.publicData.points
        })
        console.log(response)
        this.refreshPublications(); // Например, вызываем метод, который обновляет список организаций

        // Очищаем данные формы
        this.publicData.title = '';
        this.publicData.points = '';
      } catch (error) {
        console.error('Error adding public:', error);
      }
    },
    async AddOrganize() {
      try {
        const response = await OrganizationService.addOrganzition({
          title: this.organizeData.title,
          points: this.organizeData.points
        });
        console.log(response); // Выводим ответ от сервера в консоль

        // Обновляем данные в вашем компоненте, вызывая метод или функцию, который обновляет список организаций или необходимые данные
        this.refreshOrganizations(); // Например, вызываем метод, который обновляет список организаций

        // Очищаем данные формы
        this.organizeData.title = '';
        this.organizeData.points = '';

      } catch (error) {
        console.error('Error adding organization:', error);
      }
    },
    async refreshPositions() {
      try {
        const response = await PositionService.showPosition();
        this.positions = response.data;

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    async refreshCategory() {
      try {
        const response = await Project_categories.showProjectCategory();
        this.categories = response.data;

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    async refreshPublications() {
      try {
        // Здесь вызываете ваш сервис или API-метод для получения обновленных данных об организациях
        const response = await PublicationService.showPublications(); // Пример запроса на получение данных организаций
        this.publications = response.data; // Обновляем данные об организациях в вашем компоненте

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    async refreshOrganizations() {
      try {
        // Здесь вызываете ваш сервис или API-метод для получения обновленных данных об организациях
        const response = await OrganizationService.showOrganzition(); // Пример запроса на получение данных организаций
        this.organizations = response.data; // Обновляем данные об организациях в вашем компоненте

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    toggleAddCategoryForm() {
      this.isAddCategoryFormOpen = !this.isAddCategoryFormOpen;
    },
    togglePositionForm() {
      this.isPositionFormOpen = !this.isPositionFormOpen;
    },
    togglePublicationForm() {
      this.isPublicationFormOpen= !this.isPublicationFormOpen;
    },
    toggleSerticiationForm() {
      this.isSertificateOpen= !this.isSertificateOpen;
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
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.grade-row:hover {
  background-color: #f5f5f5;
}

.table {
  margin-bottom: 20px; /* Уменьшает интервал между таблицей и последующим списком */
}

.nav {
  margin-top: 10px; /* Уменьшает интервал между таблицей и предыдущим списком */
}


/* Опционально: добавьте больше стилей для лучшего дизайна */
</style>