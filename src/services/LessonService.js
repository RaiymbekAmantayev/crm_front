import Api from "@/services/Api";
export default {
    addLesson(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/lesson/add/`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showLesson() {
        const token = localStorage.getItem('token')
        return Api().get(`api/lesson/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}