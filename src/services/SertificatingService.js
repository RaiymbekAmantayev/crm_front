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
    showSertific(userId) {
        const token = localStorage.getItem('token')
        return Api().get(`api/sertific/show?userId=${userId}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    deleteService(id) {
        const token = localStorage.getItem('token')
        return Api().delete(`api/sertific/del/${id}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    changeStatusSertific(sertificId, comment) {
        const token = localStorage.getItem('token')
        return Api().put(`api/sertific/change/?sertificId=${sertificId}`,   {comment:comment},     {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}