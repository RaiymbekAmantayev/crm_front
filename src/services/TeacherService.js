import Api from "@/services/Api";
export default {
    addTeacher(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/teacher/add/`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showTeachers() {
        const token = localStorage.getItem('token')
        return Api().get(`api/teacher/all`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showTeachersByCurrent() {
        const token = localStorage.getItem('token')
        return Api().get(`api/teacher/current/user`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showTeachersById(id) {
        const token = localStorage.getItem('token')
        return Api().get(`api/teacher/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }


}