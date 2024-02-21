<template>
  <div class="file-upload-container container mt-5">
    <h1>add Grades</h1>
    <div>
      <div class="form-group">
        <label>Title:</label> <br>
        <select v-model="title">
          <option value="1">grade 1</option>
          <option value="2">grade 2</option>
          <option value="3">grade 3</option>
        </select>
      </div>
      <div class="form-group">
        <label for="hasPhd">Ученая степень требуется</label>
        <input type="radio" v-model="hasPhd" value="1" />
      </div>
      <div class="form-group">
        <label for="noPhd">Ученой степень не треубется</label>
        <input type="radio" v-model="hasPhd" value="0" />
      </div>
      <div class="form-group">
        <label>Укажите опыт работы в науке годах</label>
        <input type="number" class="form-control" v-model="experience" />
      </div>
      <div class="form-group">
        <label>Укажите миниальная количество статьи</label>
        <input type="number" class="form-control" v-model="min_count_article" />
      </div>
      <div class="form-group">
        <label>Укажите миниальная количество научных проектов</label>
        <input type="number" class="form-control" v-model="min_count_projects" />
      </div>
      <div class="form-group">
        <label>Укажите миниальная количество сертификатов</label>
        <input type="number" class="form-control" v-model="min_count_sertificates" />
      </div>
      <div class="form-group">
        <label>Укажите миниальная количество семинаров</label>
        <input type="number" class="form-control" v-model="min_count_seminar" />
      </div>
      <div class="form-group">
        <label>Укажите миниальная количество монографии</label>
        <input type="number" class="form-control" v-model="min_count_monography" />
      </div>
      <div class="form-group">
        <label>Укажите миниальная количество собранных баллов</label>
        <input type="number" class="form-control" v-model="points" />
      </div>
      <p>select positions</p>
      <select  v-model="positionId">
        <option v-for="p in positions" :key="p.id" :value="p.id">
          {{p.title}}
        </option>
      </select>
      <button @click="addInfo" class="btn btn-primary btn-block">Add Info</button>
    </div>
  </div>
</template>

<script>

import PositonService from "@/services/PositionService";
import GradeService from "@/services/GradeService";

export default {
  data() {
    return {
        title: '',
        hasPhd: 0,
        experience: null,
        min_count_article: 0,
        min_count_projects: 0,
        min_count_sertificates: 0,
        min_count_seminar: 0,
        min_count_monography: 0,
        points: null,
        positionId: null,
      positions: {},
    };
  },
  async mounted() {
    const response = await PositonService.showPosition()
    this.positions = response.data
    console.log(this.positions)
  },
  methods: {
    async addInfo(){
      if (!this.title) {
        alert("Please fill in the title field");
        return;
      }
      const response = await GradeService.addGrade({
        title: this.title,
        hasPhd: this.hasPhd,
        experience: this.experience,
        min_count_article: this.min_count_article,
        min_count_projects: this.min_count_projects,
        min_count_sertificates: this.min_count_sertificates,
        min_count_seminar: this.min_count_seminar,
        min_count_monography: this.min_count_monography,
        points: this.points,
        positionId : this.positionId
      })
      console.log(response.data)
    }

  }
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
</style>