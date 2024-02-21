import Api from "@/services/Api";
export default {
    addSchedule(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/shedule/add`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showShedule() {
        const token = localStorage.getItem('token')
        return Api().get(`api/shedule/all`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}