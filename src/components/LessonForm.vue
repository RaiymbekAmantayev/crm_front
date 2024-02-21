<template>
  <div class="file-upload-container container mt-5">
    <h1>add Teacher</h1>
    <div>
      <div class="form-group">
        <input type="text" placeholder="title" class="form-control" v-model="title" />
        <input type="number" placeholder="credit-count" class="form-control"  v-model="credit_count" />
        <input type="text" placeholder="description" class="form-control" v-model="description" />
      </div>
      <p>select Category</p>
      <select v-model="selectedCategory">
        <option v-for="cat in category" :key="cat.id" :value="cat.id">
          {{ cat.title }}
        </option>
      </select>
      <button @click="addLesson" class="btn btn-primary btn-block">Add Info</button>
    </div>
  </div>
</template>


<script>

import LessonService from "@/services/LessonService"
import LessonCategory from "@/services/LessonCategory";

export default {
  data() {
    return {
      title: '',
      credit_count:null,
      description: '',
      category:[],
      selectedCategory: null
    };

  },
  async mounted() {
    try {
      const response = await LessonCategory.showCategory();
      this.category = response.data;
      if (this.category.length > 0) {
        this.selectedCategory = this.category[0].id;
      }
      console.log(this.category);
    } catch (e) {
      console.log(e);
    }
  },
  methods:{
    async addLesson(){
      try{
        const response = await LessonService.addLesson( {
          title: this.title,
          credit_count: this.credit_count,
          description: this.description,
          categoryId: this.selectedCategory,
        });
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
  },
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