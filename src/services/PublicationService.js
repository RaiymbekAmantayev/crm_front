import Api from "@/services/Api";
export default {
    addPublic(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/pub/add`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showPublications() {
        const token = localStorage.getItem('token')
        return Api().get(`api/pub/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}