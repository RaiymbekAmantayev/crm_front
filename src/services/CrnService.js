import Api from "@/services/Api";
export default {
    addCrn(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/crn/add/`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showCrn() {
        const token = localStorage.getItem('token')
        return Api().get(`api/crn/all`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}