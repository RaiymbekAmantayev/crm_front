import Api from "@/services/Api";
export default {
    addGrade(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/grade/add/`, credential, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showGrades() {
        const token = localStorage.getItem('token')
        return Api().get(`api/grade/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}