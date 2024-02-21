<template>
  <div class="file-upload-container container mt-5">
    <h1>Complement info</h1>
    <div class="form-group">
      <label for="first_name">First Name:</label>
      <input type="text" class="form-control" id="first_name" v-model="formData.first_name" />
    </div>
    <div class="form-group">
      <label for="last_name">Last Name:</label>
      <input type="text" class="form-control" id="last_name" v-model="formData.last_name" />
    </div>
    <div class="form-group">
      <label for="image">Image:</label>
      <input type="file" class="form-control-file" @change="handleImage" required>
    </div>
    <div class="form-group">
      <label for="cv_file">CV:</label>
      <input type="file" class="form-control-file" @change="handleCv" required>
    </div>
    <div class="form-group">
      <label for="phone_number">Phone Number:</label>
      <input type="text" class="form-control" id="phone_number" v-model="formData.phone_number" />
    </div>
    <button @click="uploadFiles" class="btn btn-primary btn-block">Add Info</button>
  </div>
</template>

<script>
import axios from "axios";
import UserService from "@/services/UserService";
export default {
  data() {
    return {
      formData:{
        first_name: '',
        last_name: '',
        image: null,
        cv_file: null,
        phone_number: ''
      }
    }
  },
  async mounted() {
    try {
      const response = await UserService.getCurrentUser();
      console.log(response)
      this.formData.first_name = response.data.first_name
      this.formData.last_name = response.data.last_name
      this.formData.image = response.data.image
      this.formData.cv_file = response.data.cv_file
      this.formData.phone_number = response.data.phone_number

    }catch (err){
      console.log(err)
    }
  },
  methods: {
    handleImage(event) {
      this.formData.image = event.target.files[0];
    },
    handleCv(event) {
      this.formData.cv_file = event.target.files[0];
    },
      async uploadFiles() {
        const formData = new FormData();
        formData.append('first_name', this.formData.first_name);
        formData.append('last_name', this.formData.last_name);
        formData.append('image', this.formData.image);
        formData.append('cv_file', this.formData.cv_file);
        formData.append('phone_number', this.formData.phone_number);

        try {
          const token = localStorage.getItem('token')
          const response = await axios.put('http://localhost:7000/api/users/complement', formData, {
            headers: {
              Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
          });
          console.log(response.data);

          this.first_name = '';
          this.last_name = '';
          this.formData.image = null;
          this.formData.cv_file = null;
          this.phone_number = '';
        } catch (error) {
          console.error('Error uploading files:', error);
          // Handle the error as needed
        }
      },
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