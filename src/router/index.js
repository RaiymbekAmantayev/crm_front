import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import CompletingForm from "@/components/CompletingForm.vue";
import profilePage from "@/components/profilePage.vue";
import UsersPage from "@/components/UsersPage.vue";
import UserIdComponents from "@/components/UserIdComponents.vue";
import addAchievments from "@/components/addAchievments.vue"
import AddTeachers from "@/components/AddTeachers.vue";
import TeachersComponent from "@/components/TeachersComponent.vue";
import LessonForm from "@/components/LessonForm.vue";
import addGrades from "@/components/addGrades.vue";
import GradesView from "@/components/GradesView.vue"
import LessonVIews from "@/components/lessonVIews.vue";
import AddDeans from "@/components/addDeans.vue";
import ShedulesForm from "@/components/ShedulesForm.vue";
import ScheduleVIewsTeacher from "@/components/ScheduleVIewsTeacher.vue";
import MyAchievementsView from "@/components/MyAchievementsView.vue";
import allAchievementsUser from "@/components/allAchievementsUser.vue";
import AchievementDetail from "@/components/AchievementDetail.vue";

const routes = [
    {
        path: '/register',
        component: RegisterForm
    },
    {
        path: '/',
        component: LoginForm
    },
    {
        path: '/user/complete',
        component: CompletingForm
    },
    {
        path: '/user/current',
        component: profilePage
    },
    {
        path: '/users',
        component: UsersPage
    },

    {
        path: '/users/:id',
        component: UserIdComponents
    },
    {
        path: '/user/achievment',
        component: addAchievments
    },
    {
        path: '/achievments',
        component: MyAchievementsView
    },
    {
        path: '/achievments/all',
        component: allAchievementsUser
    },
    {
        path: '/achievments/:id',
        component: AchievementDetail
    },
    {
        path: '/teachers',
        component: TeachersComponent
    },
    {
        path: '/teachers/add',
        component: AddTeachers
    },
    {
        path: '/lesson/add',
        component: LessonForm
    },
    {
        path: '/lesson',
        component: LessonVIews
    },
    {
        path: '/grade/add',
        component: addGrades
    },
    {
        path: '/grade',
        component: GradesView
    },
    {
        path: '/dean/add',
        component: AddDeans
    },
    {
        path: '/shedule/add',
        component: ShedulesForm
    },
    {
        path: '/shedules',
        component: ScheduleVIewsTeacher
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})
export default router;