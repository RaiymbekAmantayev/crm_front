<template>
  <div class="container">
    <h1>Сабақ кестесі</h1>
    <table>
      <thead>
      <tr>
        <th>discipline title</th>
        <th>week_day</th>
        <th>start_time</th>
        <th>end_time</th>
        <th>auditory</th>
        <th>CRN</th>
        <th>Teacher</th>
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
        <td>{{ sched.teachers && sched.teachers.user ? sched.teachers.user.email : 'No position' }}</td>
        <td><ul class="nav" style="display: flex; justify-content: flex-end;">
          <li class="nav-item">
            <router-link to=""><button class="btn btn-warning">edit</button></router-link>
          </li>
        </ul></td>
      </tr>
      </tbody>
    </table>
  <div>
    <h2>Add Schedule</h2>
    <button @click="toggleScheduleForm" class="btn btn-sm btn-primary">
      {{ isSheduleFormOpen ? '-' : '+' }}
    </button>
    <form @submit.prevent="addSchedule" v-if="isSheduleFormOpen">
      <div class="department">
        <div class="department__content">
          <div class="department__content-description">
      <p>select lesson</p>
      <select v-model="formData.lessonId">
        <option v-for="l in lessons" :key="l.id" :value="l.id">
          {{l.title}}
        </option>
      </select>
          </div>
      <div class="department__content-description">
        <label>Week day:</label> <br>
        <select v-model="formData.week_days">
          <option value="monday">monday</option>
          <option value="thursday">thursday</option>
          <option value="wednesday">wednesday</option>
          <option value="tuesday">tuesday</option>
          <option value="friday">friday</option>
          <option value="saturday">saturday</option>
        </select>
      </div>
          <div class="department__content-description">
            <label for="startTime" class="form-label">Start Time:</label>
            <select class="form-select" id="startTime" v-model="formData.start_time">
              <option v-for="time in startTimeOptions" :key="time">{{ time }}</option>
            </select>
          </div>
          <div class="department__content-description">
            <label for="endTime" class="form-label">End Time:</label>
            <select class="form-select" id="endTime" v-model="formData.end_time">
              <option v-for="time in endTimeOptions" :key="time">{{ time }}</option>
            </select>
          </div>
          <form action="">
            <label for="auditory" class="form-label">Auditory:</label>
            <input type="text" class="form-control" id="auditory" v-model="formData.auditory">
          </form>
          <div class="department__content-description">
            <p>select CRN</p>
            <select v-model="formData.CRNId">
              <option v-for="c in crns" :key="c.id" :value="c.id">
                {{c.title}}
              </option>
            </select>
          </div>
          <div class="department__content-description">
            <p>Select teacher</p>
            <select v-model="formData.TeacherId">
              <option v-for="t in teachers" :key="t.id" :value="t.id">
                {{ t.user ? t.user.email : 'Unknown Email' }}
              </option>
            </select>
          </div>
          <div class="department__content-button">
            <a href="">
              <button @click="addSchedule">
                Добавить
              </button>
            </a>
          </div>
        </div>
      </div>
    </form>
  </div>
  </div>

</template>

<script>
import ScheduleService from '@/services/ScheduleService';
import LessonService from "@/services/LessonService";
import CrnService from "@/services/CrnService";
import TeacherService from "@/services/TeacherService";

export default {
  data() {
    return {
      formData: {
        lessonId: '',
        week_days: '',
        start_time: null,
        end_time: null,
        auditory: '',
        CRNId: '',
        TeacherId: ''
      },
      lessons:{},
      crns:{},
      teachers:{
        user:[]
      },
      shedules:{
        lessons:[],
        crns:[],
        teachers:{
          user:[]
        }
      },
      isSheduleFormOpen: false
    };
  },
  computed: {
    startTimeOptions() {
      return this.generateTimeOptions(8, 0, 19, 45, 75);
    },
    endTimeOptions() {
      return this.generateTimeOptions(8, 0, 19, 45, 75);
    },
  },
  async mounted(){
    const response = await ScheduleService.showShedule()
    this.shedules = response.data
    console.log(this.shedules)
    const lessons = await LessonService.showLesson()
    this.lessons = lessons.data
    console.log(this.lessons)
    const crn = await CrnService.showCrn()
    this.crns = crn.data
    console.log(this.crns)
    const teachers = await TeacherService.showTeachers()
    this.teachers = teachers.data
    console.log(this.teachers)
  },
  methods: {
    async addSchedule() {
      try {
        const response = await ScheduleService.addSchedule(this.formData);
        console.log('Schedule added successfully:', response.data);
        this.formData.lessonId = ''
        this.formData.week_days = ''
        this.formData.start_time = null
        this.formData.end_time = null
        this.formData.auditory = ''
        this.formData.CRNId = ''
        this.formData.TeacherId = ''
        this.refreshSchedule()
      } catch (error) {
        console.error('Error adding schedule:', error);
      }
    },
    async refreshSchedule() {
      try {
        const response = await ScheduleService.showShedule();
        this.shedules = response.data;

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
    toggleScheduleForm() {
      this.isSheduleFormOpen= !this.isSheduleFormOpen;
    },
    generateTimeOptions(startHour, startMinute, endHour, endMinute, interval) {
      const options = [];
      let hour = startHour;
      let minute = startMinute;
      while (hour < endHour || (hour === endHour && minute <= endMinute)) {
        const timeString = `${this.pad(hour)}:${this.pad(minute)}`;
        options.push(timeString);
        minute += interval;
        if (minute >= 60) {
          hour++;
          minute -= 60;
        }
      }
      return options;
    },
    pad(value) {
      return value.toString().padStart(2, '0');
    }
  }
};
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
  //margin-left: 30%;
}

.department__content {
  display: flex;
  width: 500px;
  border-radius: 20px;
  //margin-left: 50px;
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
