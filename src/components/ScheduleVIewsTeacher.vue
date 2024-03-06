<template>
    <div v-if="shedules">
      <table class="table" >
        <thead>
        <tr>
          <th>discipline title</th>
          <th>week_day</th>
          <th>start_time</th>
          <th>end_time</th>
          <th>auditory</th>
          <th>CRN</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="sched in shedules"  :key="sched.id">
          <td >{{ sched.lessons ? sched.lessons.title : 'No position' }}</td>
          <td>{{ sched.week_days }}</td>
          <td>{{ sched.start_time }}</td>
          <td>{{ sched.end_time }}</td>
          <td>{{ sched.auditory}}</td>
          <td v-if="sched.crns"> {{ sched.crns ? sched.crns.title : 'No position' }}</td>
        </tr>
        </tbody>
      </table>
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
.table {
  margin-bottom: 20px; /* Уменьшает интервал между таблицей и последующим списком */
}
</style>