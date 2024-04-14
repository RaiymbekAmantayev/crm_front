<template>
  <div class="department">
    <div class="department__content">
      <h1>Completing info</h1>
      <form action="">
        <input type="text" class="form-control" placeholder="first_name" v-model="formData.first_name" />
      </form>
      <form action="">
        <input type="text" class="form-control" placeholder="last_name" v-model="formData.last_name" />
      </form>
      <form action="">
        <label for="image">Image:</label>
        <input type="file" class="form-control-file" @change="handleImage" required>
      </form>
      <form action="">
        <label for="cv_file">CV:</label>
        <input type="file" class="form-control-file" @change="handleCv" required>
      </form>
      <form action="">
        <input type="text" class="form-control" placeholder="phone_number" v-model="formData.phone_number" />
      </form>
      <div class="department__content-button">
        <a href="">
          <button @click="uploadFiles">
            Добавить
          </button>
        </a>
      </div>
    </div>
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

.form-control {
  border-radius: 5px;
}

h1 {
  text-align: center;
}
</style>

<style>
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