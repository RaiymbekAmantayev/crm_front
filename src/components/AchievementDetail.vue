<template>
  <div>
    <h2>List of achievement</h2>
    <table class="table">
      <thead>
      <tr>
        <th>user email</th>
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
      <tr v-if="achievments" >
        <td>{{ achievments.user ? achievments.user.email : 'No user email' }}</td>
        <td>{{ achievments.academic_degree }}</td>
        <td>{{  achievments.experience }}</td>
        <td>{{ achievments.count_of_projects }}</td>
        <td>{{ achievments.count_of_monography }}</td>
        <td>{{ achievments.count_of_seminar }}</td>
        <td>{{ achievments.count_of_articles }}</td>
        <td>{{ achievments.count_of_sertific }}</td>
        <td>{{ achievments.points }}</td>

        <td>
          {{
            achievments.possible_grades && achievments.possible_grades.position
                ? achievments.possible_grades.position.title
                : "error"
          }} {{
            achievments.possible_grades
                ? achievments.possible_grades.title
                : "No position"
          }}
        </td>


        <td>
          <button class="btn btn-warning" @click="UpdateTeacherGrade">Принимать</button>
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
            <th>status</th>
            <th>comment</th>
<!--            <th>action</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pro, i) in projects" :key="pro.id">
            <td>{{ i + 1 }}</td>
            <td>{{ pro.title }}</td>
            <td>
              <label for="cv_file">File:</label>
              <a :href="pdfUrl" target="_blank">Открыть файл</a>
            </td>
            <td>{{ pro.project_categories ? pro.project_categories.title : 'No position' }}</td>
            <td>{{ pro.points }}</td>
            <td>{{pro.status}}</td>
            <td>{{pro.comment}}</td>
<!--            <td>-->
<!--              <button @click="changeStatusProject(pro.id)" class="btn btn-danger">dont accept</button>-->
<!--              <input type="text" :placeholder="'reason of dont accepting ' + pro.id" v-model="comment[pro.id]">-->
<!--            </td>-->
          </tr>
          </tbody>
        </table>
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
            <th>status</th>
            <th>comment</th>
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
            <td>{{article.status}}</td>
            <td>{{article.comment}}</td>
          </tr>
          </tbody>
        </table>
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
            <th>status</th>
            <th>comment</th>
<!--            <th>action</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="(sertific, index) in sertificates" :key="sertific.id">
            <td>{{index + 1}}</td>
            <td>{{ sertific.title }}</td>
            <td><a :href="FileUrlSertific" target="_blank">Открыть файл</a></td>
            <td>{{ sertific.organization ? sertific.organization.title : 'No position' }}</td>
            <td>{{ sertific.points }}</td>
            <td>{{sertific.status}}</td>
            <td>{{sertific.comment}}</td>
<!--            <td>-->
<!--              <button @click="changeStatusSertific(sertific.id)" class="btn btn-danger">dont accepting</button>-->
<!--              <input type="text" placeholder="reason of dont accepting" v-model="sertific_comment[sertific.id]">-->
<!--            </td>-->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectServices from "@/services/ProjectServices";
import ArticleService from "@/services/ArticleService";
import SertificatingService from "@/services/SertificatingService";
import Achievments from "@/services/Achievments";

export default {
  data() {
    return {
      achievments: {
        possible_grades: {
          position: []
        },
        users: []
      },
      projects:{
        project_categories:[]
      },
      comment: {},
      articles:{
        publications:[]
      },
      article_comment: {},
      sertificates:{
        organization:[]
      },
      sertific_comment: {},
      isPositionFormOpen: false,
      isAddCategoryFormOpen: false,
      isPublicationFormOpen: false,
      isSertificateOpen: false
    }
  },
  async mounted(){
    const id = this.$route.params.id;
    console.log(id)
    const achievements = await Achievments.getTeacherByUserId(id)
    this.achievments = achievements.data
    console.log(this.achievments)
    const projects= await ProjectServices.showProject(id)
    this.projects = projects.data
    const article = await ArticleService.showArticle(id)
    this.articles = article.data
    const sertific = await SertificatingService.showSertific(id)
    this.sertificates = sertific.data
    console.log(this.sertificates)
    console.log(this.projects)
    console.log(this.articles)
  },
  methods: {
    async changeStatusProject(id){
      try{
        console.log(id)
        const comment = this.comment[id]
        const response = await ProjectServices.ChangeStatus(id, comment)
        console.log(response)
        console.log(this.comment)
      }catch(e){
        console.log(e)
      }
    },
    async changeStatusArticle(id){
      try{
        console.log(id)
        const comment = this.article_comment[id]
        const response = await ArticleService.ChangeStatusArticle(id, comment)
        console.log(response)
      }catch(e){
        console.log(e)
      }
    },
    async changeStatusSertific(id){
      try{
        console.log(id)
        const comment = this.sertific_comment[id]
        const response = await SertificatingService.changeStatusSertific(id, comment)
        console.log(response)
      }catch(e){
        console.log(e)
      }
    },
    async UpdateTeacherGrade(){
      try{
        const id = this.$route.params.id
        const response = await Achievments.updateTeachersGrade(id)
        console.log(response.data)
      }catch(e){
        console.log(e)
      }
    },
    currentUserId() {
      return this.$store.state.user ? this.$store.state.user.id : null;
    },
    async refreshArticle() {
      try {
        const response = await ArticleService.showArticle();
        this.articles = response.data;

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