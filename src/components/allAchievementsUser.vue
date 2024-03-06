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
      <tr v-for="achievments in achievements" :key="achievments.id" >
        <td>{{ achievments.user ? achievments.user.email : 'No user email' }}</td>
        <td>{{ achievments.academic_degree }}</td>
        <td>{{  achievments.experience }}</td>
        <td>{{ achievments.count_of_projects }}</td>
        <td>{{ achievments.count_of_monography }}</td>
        <td>{{ achievments.count_of_seminar }}</td>
        <td>{{ achievments.count_of_articles }}</td>
        <td>{{ achievments.count_of_sertific }}</td>
        <td>{{ achievments.points }}</td>
        <td>{{ achievments.possible_grades ? achievments.possible_grades.title : 'No position' }}</td>
        <td>
          <ul class="nav" style="display: flex; justify-content: flex-end;">
            <li class="nav-item">
              <router-link v-if="achievments.user && achievments.user.id" :to="'/achievments/' + achievments.user.id">
                <button class="btn btn-warning">Подробнее</button>
              </router-link>
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Achievments from "@/services/Achievments";
// import ProjectServices from "@/services/ProjectServices";
// import Project_categories from "@/services/Project_categories";
// import PublicationService from "@/services/PublicationService";
// import ArticleService from "@/services/ArticleService";
// import OrganizationService from "@/services/OrganizationService";
// import SertificatingService from "@/services/SertificatingService";

export default {
  data() {
  return {
  achievements: {
    possible_grades: [],
    users: []
  },
}
},
  async mounted() {
  try {
  const response = await Achievments.getAll()
  this.achievements = response.data
  console.log(this.achievements)
} catch (e) {
  console.log(e)
}
}
}
</script>
