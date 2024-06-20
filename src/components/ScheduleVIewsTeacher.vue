<template>
  <div v-if="shedules" class="container">
    <h1>Расписание уроков</h1>
    <table>
      <thead>
      <tr>
        <th>discipline title</th>
        <th>week_day</th>
        <th>start_time</th>
        <th>end_time</th>
        <th>auditory</th>
        <th>CRN</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="sched in shedules"  :key="sched.id">
        <td>{{ sched.lessons ? sched.lessons.title : 'No position' }}</td>
        <td>{{ sched.week_days }}</td>
        <td>{{ sched.start_time }}</td>
        <td>{{ sched.end_time }}</td>
        <td>{{ sched.auditory}}</td>
        <td>{{ sched.crns ? sched.crns.title : 'No position' }}</td>
        <td><ul class="nav" style="display: flex; justify-content: flex-end;">
          <li class="nav-item">
            <router-link to=""><button class="btn btn-warning">edit</button></router-link>
          </li>
        </ul></td>
      </tr>
      </tbody>
    </table>
    <div>
    </div>
  </div>
  </template>
<script>
import ScheduleService from "@/services/ScheduleService";
// import scheduleService from "@/services/ScheduleService";

export default {
  data() {
    return {
      shedules: {
        lessons: [],
        crns: [],
        teachers: {
          user: []
        }
      }
    };
  },
  async mounted() {
    try {
      const response = await ScheduleService.showSheduleForTeacher()
      this.shedules = response.data
      console.log(this.shedules)
    }catch (e){
      console.log(e)
    }
  }
}
</script>


<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

.container {
  /* max-width: 1000px; */
  margin: auto;
  background-color: #fff;
  padding: 20px 20px 65px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f2f2f2;
}

h1 {
  text-align: center;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 45px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 8px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input[type="text"] {
  width: calc(100% - 24px);
  padding: 10px;
  margin: 6px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"],
#openModalBtn {
  margin-bottom: 10px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

button[type="submit"]:hover,
#openModalBtn:hover {
  background-color: #45a049;
}
</style>