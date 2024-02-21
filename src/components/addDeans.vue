<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Add Dean</h2>
            <form @submit.prevent="addDean" class="needs-validation" novalidate>
              <div class="mb-3">
                <p>select User</p>
                <select v-model="formData.userId">
                  <option v-for="u in users" :key="u.id" :value="u.id">
                    {{u.email}}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="salary" class="form-label">Salary:</label>
                <input type="number" class="form-control" id="salary" v-model="formData.salary" required>
                <div class="invalid-feedback">Please provide a valid salary.</div>
              </div>
              <div class="mb-3">
                <label for="duties" class="form-label">Duties:</label>
                <input type="text" class="form-control" id="duties" v-model="formData.duties" required>
                <div class="invalid-feedback">Please provide valid duties.</div>
              </div>
              <div class="mb-3">
                <p>select Role</p>
                <select v-model="formData.deanRoleId">
                  <option v-for="d in deanRoles" :key="d.id" :value="d.id">
                    {{d.value}}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Add Dean</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeanService from '@/services/DeansService';
// import UserService from "@/services/UserService";
import DeanRole from "@/services/DeanRole";
import RoleServices from "@/services/RoleServices";
export default {
  data() {
    return {
      formData: {
        userId: null,
        salary: null,
        duties: '',
        deanRoleId: null
      },
      users:{},
      deanRoles:{}
    };
  },
  async mounted(){
    const response = await RoleServices.SearchByRoleDep(1)
    this.users = response.data
    console.log(this.users)
    const deanRoles = await DeanRole.showDeanRole()
    this.deanRoles = deanRoles.data
    console.log(this.deanRoles)
  },
  methods: {
    async addDean() {
      try {
        const response = await DeanService.addDean(this.formData);
        console.log(response.data); // Для отладки
      } catch (error) {
        console.error('Error adding dean:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  min-height: 100vh;
}

.card {
  width: 500%;
}

.form-label {
  font-weight: bold;
}

.invalid-feedback {
  color: red;
}
</style>
