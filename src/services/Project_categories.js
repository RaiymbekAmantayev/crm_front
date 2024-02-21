import Api from "@/services/Api";
export default {
    addProjectCategory(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/pro_cat/add/`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showProjectCategory() {
        const token = localStorage.getItem('token')
        return Api().get(`api/pro_cat/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}