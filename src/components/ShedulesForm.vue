<template>
  <div>
    <div>
      <table  class="table" >
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
  </div>
  <div>
    <h2>Add Schedule</h2>
    <form @submit.prevent="addSchedule">
      <div class="mb-3">
        <p>select lesson</p>
        <select v-model="formData.lessonId">
          <option v-for="l in lessons" :key="l.id" :value="l.id">
            {{l.title}}
          </option>
        </select>
      </div>
      <div class="mb-3">
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
      <div class="mb-3">
        <label for="startTime" class="form-label">Start Time:</label>
        <select class="form-select" id="startTime" v-model="formData.start_time">
          <option v-for="time in startTimeOptions" :key="time">{{ time }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="endTime" class="form-label">End Time:</label>
        <select class="form-select" id="endTime" v-model="formData.end_time">
          <option v-for="time in endTimeOptions" :key="time">{{ time }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="auditory" class="form-label">Auditory:</label>
        <input type="text" class="form-control" id="auditory" v-model="formData.auditory">
      </div>
      <div class="mb-3">
        <p>select CRN</p>
        <select v-model="formData.CRNId">
          <option v-for="c in crns" :key="c.id" :value="c.id">
            {{c.title}}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <p>Select teacher</p>
        <select v-model="formData.TeacherId">
          <option v-for="t in teachers" :key="t.id" :value="t.id">
            {{ t.user ? t.user.email : 'Unknown Email' }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Add Schedule</button>
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
      }
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
/* Ваши стили здесь */
</style>
