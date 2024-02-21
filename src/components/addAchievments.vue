<template>
  <div class="file-upload-container container mt-5">
    <h1>Add Achievements</h1>
    <div class="form-group">
      <label>Academic Degree:</label> <br>
      <select v-model="formData.academic_degree" class="form-control">
        <option value="phd">PhD</option>
        <option value="master">Master</option>
      </select>
    </div>
    <div class="form-group">
      <label for="experience">Experience:</label>
      <input type="text" class="form-control" id="experience" v-model="formData.experience" />
    </div>
    <p>Select pretend grade:</p>
    <select v-model="formData.selectGrade" class="form-control">
      <option v-for="grade in grades" :key="grade.id" :value="grade.id">
        {{ grade.position ? grade.position.title : 'No position' }} {{grade.title}}
      </option>
    </select>
    <div>
      <div v-for="(project, index) in projects" :key="index" class="projects">
        <h4>Projects</h4>
        <div class="form-group">
          <label for="project_title">Title:</label>
          <input type="text" class="form-control" v-model="project.title" />
        </div>
        <div class="form-group">
          <label for="project_file">File:</label>
          <input type="file" class="form-control-file" @change="handleProjectFile(index, $event)" required>
        </div>
        <div class="form-group">
          <p>Select Category:</p>
          <select v-model="project.categoryId" class="form-control">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </select>
        </div>
        <button @click="removeProject(index)" class="btn btn-danger">Remove</button>
      </div>
      <button @click="addProject" class="btn btn-success">Add Project</button>
    </div>
    <div style="margin-top: 5%">
      <div v-for="(articles, index) in articles" :key="index" class="projects">
        <h4>Articles</h4>
        <div class="form-group">
          <label for="project_title">Title:</label>
          <input type="text" class="form-control" v-model="articles.title" />
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
            <label for="project_file">File:</label>
            <input type="file" class="form-control-file" @change="handleArticleFile(index, $event)" required>
          </div>
        </div>
        <div class="form-group">
          <p>Select Publication:</p>
          <select v-model="articles.publicationId" class="form-control">
            <option v-for="pub in publications" :key="pub.id" :value="pub.id">
              {{ pub.title }}
            </option>
          </select>
        </div>
        <button @click="removeArticle(index)" class="btn btn-danger">Remove</button>
      </div>
      <button @click="addArticle" class="btn btn-success">Add Article</button>
    </div>
    <div style="margin-top: 5%">
      <div v-for="(sertificates, index) in sertificates" :key="index" class="projects">
        <h4>Sertificates</h4>
        <div class="form-group">
          <label for="project_title">Title:</label>
          <input type="text" class="form-control" v-model="sertificates.title" />
        </div>
        <div class="form-group">
          <label for="project_file">File:</label>
          <input type="file" class="form-control-file" @change="handleSertificFile(index, $event)" required>
        </div>
        <div class="form-group">
          <p>Select Organization:</p>
          <select v-model="sertificates.OrganizationId" class="form-control">
            <option v-for="org in organizations" :key="org.id" :value="org.id">
              {{ org.title }}
            </option>
          </select>
        </div>
        <button @click="removeSertific(index)" class="btn btn-danger">Remove</button>
      </div>
      <button @click="addSertific" class="btn btn-success">Add Sertificates</button>
    </div>
    <div>
      <button @click="AddInfo" class="btn btn-primary btn-block mt-3">Add Info</button>
    </div>
  </div>
</template>

<script>

import Achievments from "@/services/Achievments";
import Project_categories from "@/services/Project_categories";
import PublicationService from "@/services/PublicationService";
import OrganizationService from "@/services/OrganizationService";
import ProjectServices from "@/services/ProjectServices";
import GradeService from "@/services/GradeService";
import ArticleService from "@/services/ArticleService";
import SertificatingService from "@/services/SertificatingService";
export default {
  data() {
    return {
      formData:{
        academic_degree: '',
        experience: '',
        selectGrade: null
      },
      grades: {
        position:{}
      },
      projects: [
        { title: '', file: null, categoryId: null }
      ],
      categories: {},

      selectedOption: '',

      articles: [
        { title: '', file: null, link: '', publicationId: null }
      ],
      publications: {},

      sertificates: [
        { title: '', file: null, OrganizationId: null }
      ],
      organizations: {}
      }

    },
  async mounted(){
    const response = await Project_categories.showProjectCategory()
    this.categories = response.data
    console.log(this.categories)
    const publications = await PublicationService.showPublications()
    this.publications = publications.data
    console.log(this.publications)
    const organization = await OrganizationService.showOrganzition()
    this.organizations = organization.data
    console.log(this.organizations)
    const grades = await GradeService.showGrades()
    this.grades = grades.data
    console.log(this.grades)
  },
  methods: {
    handleProjectFile(index, event) {
      const file = event.target.files[0];
      this.projects[index].file = file;
    },
    handleArticleFile(index, event) {
      const file = event.target.files[0];
      this.articles[index].file = file;
    },
    handleSertificFile(index, event) {
      const file = event.target.files[0];
      this.sertificates[index].file = file;
    },

    addProject() {
      this.projects.push({ title: '', file: null, categoryId: null });
    },
    removeProject(index) {
      this.projects.splice(index, 1);
    },
    addArticle() {
      this.articles.push( { title: '', file: null, link: '', publicationId: null });
    },
    removeArticle(index) {
      this.articles.splice(index, 1);
    },
    addSertific() {
      this.sertificates.push({ title: '', file: null, OrganizationId: null });
    },
    removeSertific(index) {
      this.sertificates.splice(index, 1);
    },
    async AddInfo() {
      try {
        if (this.projects.length > 0) {
          for (const project of this.projects) {
            const projectData = {
              title: project.title,
              file: project.file,
              categoryId: project.categoryId
            };
            const response = await ProjectServices.addProject(projectData);
            console.log(response.data);
          }
        } else {
          console.log("No projects to add.");
        }
    if(this.articles.length>0) {
      for (const article of this.articles) {
        const articleData = {
          title: article.title,
          publicationId: article.publicationId
        };
        if (article.file) {
          articleData.file = article.file;
        } else if (article.link) {
          articleData.link = article.link;
        }
        const response = await ArticleService.addArticle(articleData);
        console.log(response.data);
      }
    }else{
      console.log("No articles to add.");
    }
        if(this.sertificates.length>0){
          for (const sertific of this.sertificates) {
            const sertificateData = {
              title: sertific.title,
              file: sertific.file,
              OrganizationId: sertific.OrganizationId
            };
            const response = await SertificatingService.addSertific(sertificateData);
            console.log(response.data);
          }
        }else{
          console.log("sertificates not found")
        }


      setTimeout(async () => {
        try {
          console.log(this.formData.academic_degree)
          console.log(this.formData.experience)
          console.log(this.formData.selectGrade)
          const achievment = await Achievments.addAchievments({
            academic_degree: this.formData.academic_degree,
            experience: this.formData.experience,
            pretend_grade: this.formData.selectGrade
          });
          console.log(achievment.data);
          alert("ur dates added to db, result u can see in ur progile page")
        } catch (error) {
          console.error('Error uploading files:', error);
        }
      }, 5000);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    },
  }
}
</script>


<style scoped>
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

.projects {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
}
</style>