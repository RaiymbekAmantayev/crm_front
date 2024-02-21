<template>
  <div class="row">
    <div v-for="teacher in teachers"  :key="teacher.id" class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <img v-if="teacher.user.image" :src="'http://localhost:7000/' + teacher.user.image" class="song-img" style="border-radius: 50%; width: 100px; height: 100px;" alt="">
          <img v-else src="../assets/istockphoto-1300845620-612x612.jpg" class="song-img" style="border-radius: 50%; width: 100px; height: 100px;" alt="">
          <h5 class="card-title">{{teacher.user.email}}</h5>
          <p class="card-text">{{teacher.user.last_name}}</p>
          <p class="card-text">{{teacher.salary}}</p>
          <router-link :to="{ path: 'users/' +  teacher.user.id  }" class="btn btn-primary">
            Посмотреть пользователя
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <router-link :to="{ path: 'teachers/add'  }" class="btn btn-primary">
    Добавить
  </router-link>
</template>

<script>

import TeacherService from "@/services/TeacherService";

export default {
  data() {
    return {
      teachers:[]
    }
  },
  async mounted(){
    try{
        const response = await TeacherService.showTeachers()
        this.teachers = response.data
        console.log(this.teachers)
    }catch (e){
      console.log(e)
    }
  },
  methods:{
  }
}
</script>