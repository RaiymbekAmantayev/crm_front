<template>
  <div>
    <p>get users by role </p>
    <select style="border-bottom-color: black" v-model="selectedRole" @change="getUsers">
      <option v-for="role in roles" :key="role.id" :value="role.id">
        {{ role.value }}
      </option>
    </select>
    <p>get users by department </p>
    <select style="border-color: black" v-model="selectedDepartment" @change="getDepartment">
      <option v-for="dep in department" :key="dep.id" :value="dep.id">
        {{ dep.title }}
      </option>
    </select>
  </div>
  <div v-if="isAll" class="row">
    <div v-for="user in users"  :key="user.id" class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <img v-if="user.image" :src="'http://localhost:7000/' + user.image" class="song-img" style="border-radius: 50%; width: 100px; height: 100px;" alt="">
          <img v-else src="../assets/istockphoto-1300845620-612x612.jpg" class="song-img" style="border-radius: 50%; width: 100px; height: 100px;" alt="">
          <h5 class="card-title">{{user.email}}</h5>
          <p class="card-text">{{user.last_name}}</p>
          <router-link :to="{ path: 'users/' +  user.id  }" class="btn btn-primary">
            Посмотреть пользователя
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import RoleServices from "@/services/RoleServices";
import Dep from "@/services/departmentService"

export default {
  data() {
    return {
      isOnlyUsers: false,
      isOnlyTeachers:false,
      isAll:true,
      users: {},
      roles:{},
      department:{},
      selectedRole: null,
      selectedDepartment: null
    }
  },
  async mounted(){
    try{
      if(this.selectedRole == null) {
        const user = await UserService.getAllUsers()
        this.users = user.data
        console.log(user)
        const role = await RoleServices.ShowRoles()
        this.roles = role.data
        const department = await Dep.ShowDep()
        this.department = department.data
        console.log(this.roles)
        console.log(this.users)
        console.log(this.department)
      }
    }catch (e){
      console.log(e)
    }
  },
  methods:{
    async getUsers() {
      const response = await RoleServices.SearchByRole(this.selectedRole)
      this.users = response.data
    },
    async getDepartment(){
      const response = await RoleServices.SearchByDep(this.selectedDepartment)
      this.users = response.data
    }
  }
}
</script>