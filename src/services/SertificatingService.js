import Api from "@/services/Api";
export default {
    addSertific(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/sertific/add/`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    showSertific() {
        const token = localStorage.getItem('token')
        return Api().get(`api/sertific/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}