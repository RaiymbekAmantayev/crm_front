<template>
  <div class="department">
    <div class="department__content">
      <h1>Completing info</h1>
      <label>Title:</label> <br>
      <select v-model="title">
        <option value="1">grade 1</option>
        <option value="2">grade 2</option>
        <option value="3">grade 3</option>
      </select>
      <form action="">
        <label for="hasPhd">Ученая степень требуется</label>
        <input type="radio" v-model="hasPhd" value="1" />
      </form>
      <form action="">
        <label for="noPhd">Ученой степень не треубется</label>
        <input type="radio" v-model="hasPhd" value="0" />
      </form>
      <form action="">
        <label>Укажите опыт работы в науке годах</label>
        <input type="number" class="form-control" v-model="experience" />
      </form>
      <form action="">
        <label>Укажите миниальная количество статьи</label>
        <input type="number" class="form-control" v-model="min_count_article" />
      </form>
      <form action="">
        <label>Укажите миниальная количество научных проектов</label>
        <input type="number" class="form-control" v-model="min_count_projects" />
      </form>
      <form action="">
        <label>Укажите миниальная количество сертификатов</label>
        <input type="number" class="form-control" v-model="min_count_sertificates" />
      </form>
      <form action="">
        <label>Укажите миниальная количество семинаров</label>
        <input type="number" class="form-control" v-model="min_count_seminar" />
      </form>
      <form action="">
        <label>Укажите миниальная количество монографии</label>
        <input type="number" class="form-control" v-model="min_count_monography" />
      </form>
      <form action="">
        <label>Укажите миниальная количество собранных баллов</label>
        <input type="number" class="form-control" v-model="points" />
      </form>
      <div class="department__content-descriptionTwo">
        <p>select positions</p>
        <select  v-model="positionId">
          <option v-for="p in positions" :key="p.id" :value="p.id">
            {{p.title}}
          </option>
        </select>
      </div>
      <div class="department__content-button">
          <button @click="addInfo">
            Добавить
          </button>
      </div>
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
      this.title=  ''
        this.hasPhd= ''
      this.experience= null
      this.min_count_article= ''
      this.min_count_projects = ''
      this.min_count_sertificates= ''
      this.min_count_seminar = ''
      this.min_count_monography = ''
      this.points = null
      this.positionId = null
      console.log(response.data)
    }

  }
}

</script>

<style scoped>
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
  margin-left: 30%;
}

.department__content {
  display: flex;
  width: 500px;
  border-radius: 20px;
  margin-left: 50px;
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