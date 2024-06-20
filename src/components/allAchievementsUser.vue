<template>
  <div>
    <h2>List of achievement</h2>
    <table v-if="currentUserRole == 6" class="table">
      <thead>
      <tr>
        <th>user email</th>
        <th>academic degree</th>
        <th>experience</th>
        <th>count_projects</th>
        <th>count_monopraphy</th>
        <th>count_conference</th>
        <th>count_article</th>
        <th>count_sertificates</th>
        <th>points</th>
        <th>grade</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="achievments in AllAchievements" :key="achievments.id" >
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
          <ul class="nav" style="display: flex; justify-content: flex-end;">
            <li class="nav-item">
              <router-link v-if="achievments.user && achievments.user.id" :to="'/achievments/' + achievments.user.id">
                <button class="btn btn-warning">Толығырақ</button>
              </router-link>
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <table v-if="currentUserRole == 1" class="table table-bordered table-hover">
      <thead class="thead-dark">
      <tr>
        <th>User Email</th>
        <th>Academic Degree</th>
        <th>Experience</th>
        <th>Projects</th>
        <th>Monographs</th>
        <th>Seminars</th>
        <th>Articles</th>
        <th>Certificates</th>
        <th>Points</th>
        <th>Grade</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="achievement in achievements" :key="achievement.id">
        <td>{{ achievement.user ? achievement.user.email : 'No user email' }}</td>
        <td>{{ achievement.academic_degree }}</td>
        <td>{{ achievement.experience }}</td>
        <td>{{ achievement.count_of_projects }}</td>
        <td>{{ achievement.count_of_monography }}</td>
        <td>{{ achievement.count_of_seminar }}</td>
        <td>{{ achievement.count_of_articles }}</td>
        <td>{{ achievement.count_of_certificates }}</td>
        <td>{{ achievement.points }}</td>
        <td>
          {{
            achievement.possible_grades && achievement.possible_grades.position
                ? achievement.possible_grades.position.title
                : "Error"
          }} {{
            achievement.possible_grades
                ? achievement.possible_grades.title
                : "No position"
          }}
        </td>
        <td>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link v-if="achievement.user && achievement.user.id" :to="'/achievments/' + achievement.user.id">
                <button class="btn btn-warning">Details</button>
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
    possible_grades: {
      position:[]
    },
    users: []
  },
  AllAchievements: {
    possible_grades: {
      position:[]
    },
    users: []
  },
}
},
  async mounted() {
  try {
  const response = await Achievments.getAll()
  this.achievements = response.data
    const achievment = await Achievments.getAllAchievement()
    this.AllAchievements = achievment.data
  console.log(this.achievements)
} catch (e) {
  console.log(e)
}
},
  computed: {
    currentUserRole() {
      return this.$store.state.user ? this.$store.state.user.roleId : null;
    },
  }
}
</script>


<style>

</style>
