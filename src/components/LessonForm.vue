<template>
  <div class="department">
    <div class="department__content">
      <h1>Add lesson</h1>
      <div class="department__content-description">
        <p>title</p>
        <input type="text" placeholder="title" class="form-control" v-model="title" />
      </div>
      <form action="">
        <input type="number" placeholder="credit-count" class="form-control"  v-model="credit_count" />
      </form>
      <form action="">
        <input type="text" placeholder="description" class="form-control" v-model="description" />
      </form>
      <div class="department__content-descriptionTwo">
        <p>select Category</p>
        <select v-model="selectedCategory">
          <option v-for="cat in category" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
      </div>
      <div class="department__content-button">
          <button @click="addLesson">
            Добавить
          </button>
      </div>
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
        this.title = ''
        this.credit_count = ''
        this.description = ''
        this.selectedCategory = ''
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