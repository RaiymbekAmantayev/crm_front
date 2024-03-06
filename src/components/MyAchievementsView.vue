<template>
  <div>
    <h2>List of achievement</h2>
    <table class="table">
      <thead>
      <tr>
        <th>academic degree</th>
        <th>experience</th>
        <th>count_projects</th>
        <th>count_monopraphy</th>
        <th>count_seminar</th>
        <th>count_article</th>
        <th>count_sertificates</th>
        <th>points</th>
        <th>grade</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr >
        <td>{{ achievments.academic_degree }}</td>
        <td>{{  achievments.experience }}</td>
        <td>{{ achievments.count_of_projects }}</td>
        <td>{{ achievments.count_of_monography }}</td>
        <td>{{ achievments.count_of_seminar }}</td>
        <td>{{ achievments.count_of_articles }}</td>
        <td>{{ achievments.count_of_sertific }}</td>
        <td>{{ achievments.points }}</td>
        <td>{{ achievments.possible_grade  }}</td>
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

  <div class="container">
    <button @click="toggleAddCategoryForm" class="btn btn-sm btn-primary">
      {{ isAddCategoryFormOpen ? '-' : '+' }}
    </button>
    <div class="row">
      <div class="col-md-6">
        <h2>List projects of user</h2>
        <table class="table" v-if="isAddCategoryFormOpen">
          <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>file</th>
            <th>category</th>
            <th>points</th>
            <th>action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pro,i) in projects" :key="pro.id">
            <td>{{i + 1}}</td>
            <td>{{ pro.title }}</td>
            <td>
              <label for="cv_file">File:</label>
              <a :href="pdfUrl" target="_blank">Открыть  файл</a></td>
            <td>{{ pro.project_categories ? pro.project_categories.title : 'No position' }}</td>
            <td>{{ pro.points }}</td>
            <td>
                <button @click="deleteProject(pro.id)" class="btn btn-danger">delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h2>
          Add Project
        </h2>
        <div v-if="isAddCategoryFormOpen">
          <form @submit.prevent="AddProject">
            <div class="mb-3">
              <label for="title" class="form-label">Title:</label>
              <input type="text" class="form-control" id="title" v-model="project_Data.title">
            </div>
            <div class="form-group">
              <label for="image">File:</label>
              <input type="file" class="form-control-file" @change="handleProject" required>
            </div>
            <div class="form-group">
              <p>Select Category:</p>
              <select v-model="project_Data.categoryId" class="form-control">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
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
        <h2>List articles of user</h2>
        <table class="table" v-if="isPublicationFormOpen">
          <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>file/link</th>
            <th>publication</th>
            <th>points</th>
            <th>action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(article, i) in articles" :key="article.id">
            <td>{{i + 1}}</td>
            <td>{{ article.title }}</td>
            <td v-if="article.file">
              <label for="cv_file">File:</label>
              <a :href="FileUrl" target="_blank">Открыть файл</a></td>
            <td v-if="article.link">{{article.link}}</td>
            <td>{{ article.publications ? article.publications.title : 'No position' }}</td>
            <td>{{ article.points }}</td>
            <td>
                  <button @click="deleteArticle(article.id)" class="btn btn-danger">delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h2>
          Add Article
        </h2>
        <div v-if="isPublicationFormOpen">
          <form @submit.prevent="AddArticle">
            <div class="form-group">
              <label for="project_title">Title:</label>
              <input type="text" class="form-control" v-model="article_Data.title" />
            </div>
            <div class="form-group">
              <label>Choose:</label><br>
              <input type="radio" v-model="selectedOption" value="link"> Link
              <input type="radio" v-model="selectedOption" value="file"> File
              <div v-show="selectedOption === 'link'">
                <label for="project_title">Link:</label>
                <input type="text" class="form-control" v-model="articles.link" />
              </div>
              <div v-show="selectedOption === 'file'">
                  <label for="image">File:</label>
                  <input type="file" class="form-control-file" @change="handleArticle" required>
              </div>
            </div>
            <div class="form-group">
              <p>Select Publication:</p>
              <select v-model="article_Data.publicationId" class="form-control">
                <option v-for="pub in publications" :key="pub.id" :value="pub.id">
                  {{ pub.title }}
                </option>
              </select>
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
            <th>file</th>
            <th>organization</th>
            <th>points</th>
            <th>action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(sertific, index) in sertificates" :key="sertific.id">
            <td>{{index + 1}}</td>
            <td>{{ sertific.title }}</td>
            <td><a :href="FileUrlSertific" target="_blank">Открыть файл</a></td>
            <td>{{ sertific.organization ? sertific.organization.title : 'No position' }}</td>
            <td>{{ sertific.points }}</td>
            <td>
                  <button @click="deleteSertific(sertific.id)" class="btn btn-danger">delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h2>
          Add Sertificates
        </h2>
        <div v-if="isSertificateOpen">
          <form @submit.prevent="AddSertificates">
            <div class="form-group">
              <label for="project_title">Title:</label>
              <input type="text" class="form-control" v-model="sertific_Data.title" />
            </div>
            <div class="form-group">
              <label for="image">File:</label>
              <input type="file" class="form-control-file" @change="handleSertific" required>
            </div>
            <div class="form-group">
              <p>Select Organization:</p>
              <select v-model="sertific_Data.OrganizationId" class="form-control">
                <option v-for="org in organizations" :key="org.id" :value="org.id">
                  {{ org.title }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Achievments from "@/services/Achievments";
import ProjectServices from "@/services/ProjectServices";
import Project_categories from "@/services/Project_categories";
import PublicationService from "@/services/PublicationService";
import ArticleService from "@/services/ArticleService";
import OrganizationService from "@/services/OrganizationService";
import SertificatingService from "@/services/SertificatingService";


export default {
  data() {
    return {
      achievments:{
        grade:[]
      },
      project_Data: {
        title: '',
        file: null,
        categoryId:null
      },
      categories:{},
      projects:{
        project_categories:[]
      },
      selectedOption: '',
      publications:{},
      articles:{
        publications:[]
      },
      article_Data:{
        title: '',
        file: null,
        link: '',
        publicationId: null
      },
      organizations:{},
      sertificates:{
        organization:[]
      },
      sertific_Data:{
        title: '',
        file:null,
        OrganizationId: null
      },
      isPositionFormOpen: false,
      isAddCategoryFormOpen: false,
      isPublicationFormOpen: false,
      isSertificateOpen: false
    }
  },
  async mounted(){
    const id = this.currentUserId()
    console.log(id)
    try{
      const response = await Achievments.getTeacherByUserId(id)
      this.achievments = response.data
      console.log(this.achievments)
    }catch (e){
      console.log(e)
    }
    const project_category= await Project_categories.showProjectCategory()
    this.categories = project_category.data
    const projects= await ProjectServices.showProject(id)
    this.projects = projects.data
    const publication = await PublicationService.showPublications()
    this.publications = publication.data
    const article = await ArticleService.showArticle(id)
    this.articles = article.data
    const organize = await OrganizationService.showOrganzition()
    this.organizations = organize.data
    const sertific = await SertificatingService.showSertific(id)
    this.sertificates = sertific.data
    console.log(this.sertificates)
    console.log(this.organizations)
    console.log(this.publications)
    console.log(this.categories)
    console.log(this.achievments)
    console.log(this.projects)
    console.log(this.articles)
  },
  methods: {
    async deleteProject(id){
      try{
        console.log(id)
          const response = await ProjectServices.DeleteProject(id)
          console.log(response)
        this.refreshProjects()
        this.refreshAchievment()
      }catch(e){
        console.log(e)
      }
    },
    async deleteArticle(id){
      try{
        console.log(id)
        const response = await ArticleService.DeleteArticle(id)
        console.log(response)
        this.refreshArticle()
        this.refreshAchievment()
      }catch(e){
        console.log(e)
      }
    },
    async deleteSertific(id){
      try{
        console.log(id)
        const response = await SertificatingService.deleteService(id)
        console.log(response)
        this.refreshSertific()
        this.refreshAchievment()
      }catch(e){
        console.log(e)
      }
    },
    currentUserId() {
      return this.$store.state.user ? this.$store.state.user.id : null;
    },
    handleProject(event) {
      this.project_Data.file = event.target.files[0];
    },
    handleArticle(event) {
      this.article_Data.file = event.target.files[0];
    },
    handleSertific(event) {
      this.sertific_Data.file = event.target.files[0];
    },
    async AddProject(){
      try{
        const response = await ProjectServices.addProject(this.project_Data);
        console.log(response.data);
        this.refreshProjects()
        this.refreshAchievment()
        this.project_Data.title= '';
        this.project_Data.file= null;
        this.project_Data.categoryId= ''
      }catch (e){
        console.log(e)
      }
    },
    async AddArticle(){
      try{
        const articleData = {
          title:this.article_Data.title,
          publicationId: this.article_Data.publicationId
        };
        console.log(articleData.publicationId)
        console.log(this.article_Data.publicationId)
        if (this.article_Data.file) {
          articleData.file = this.article_Data.file;
        } else if (articleData.link) {
          articleData.link = this.article_Data.link;
        }
        console.log(articleData)
        const response = await ArticleService.addArticle(articleData);
        console.log(response.data);
        this.refreshArticle()
        this.refreshAchievment()
        this.article_Data.title= '';
        this.article_Data.link = '';
        this.article_Data.file= null;
        this.article_Data.publicationId= ''
      }catch (e){
        console.log(e)
      }
    },
    async AddSertificates(){
      try{
        const response = SertificatingService.addSertific(this.sertific_Data)
        console.log(response)
        this.refreshSertific()
        this.refreshAchievment()
        this.sertific_Data.title= '';
        this.sertific_Data.file= null;
        this.sertific_Data.OrganizationId= ''
      }catch (e){
        console.log(e)
      }
    },
    async refreshProjects() {
      const id = this.currentUserId()
      try {
        const response = await ProjectServices.showProject(id);
        this.projects = response.data;

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    async refreshArticle() {
      try {
        const response = await ArticleService.showArticle();
        this.articles = response.data;

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    async refreshSertific() {
      const id = this.currentUserId()
      try {
        const response = await SertificatingService.showSertific(id);
        this.sertificates = response.data;

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    async refreshAchievment() {
      const id = this.currentUserId()
      try {
        const response = await Achievments.getTeacherByUserId(id);
        this.achievments = response.data;
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
    pdfUrl() {
      return `http://localhost:7000/${this.projects.file}`;
    },
    FileUrl() {
      return `http://localhost:7000/${this.articles.file}`;
    },
    FileUrlSertific() {
      return `http://localhost:7000/${this.sertificates.file}`;
    },
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

.nav
{
  margin-top: 10px; /* Уменьшает интервал между таблицей и предыдущим списком */
}

</style>