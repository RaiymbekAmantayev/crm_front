import Api from "@/services/Api";
export default {
    addArticle(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/art/add`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    showArticle() {
        const token = localStorage.getItem('token')
        return Api().get(`api/art/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}