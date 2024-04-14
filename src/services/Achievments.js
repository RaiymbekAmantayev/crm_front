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
        return Api().get(`api/achievment/user?userId=${userId}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    getAll() {
        const token = localStorage.getItem('token')
        return Api().get(`api/achievment/all`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    getAllAchievement() {
        const token = localStorage.getItem('token')
        return Api().get(`api/achievment/showall`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    updateTeachersGrade (id){
        const token = localStorage.getItem('token')
        return Api().put(`api/achievment/update?id=${id}`,      {},  {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
}