import Api from "@/services/Api";
export default {
    addAchievments( credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/achievment/add`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getTeacherByUserId(userId) {
        const token = localStorage.getItem('token')
        return Api().get(`api/achievment/user?teacherId=${userId}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}