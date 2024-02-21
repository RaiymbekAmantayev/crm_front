import Api from "@/services/Api";
export default {
    addCategory(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/category/add/`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showCategory() {
        const token = localStorage.getItem('token')
        return Api().get(`api/category/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}