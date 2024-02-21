import Api from "@/services/Api";
export default {
    addProject(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/project/add/`, credential,        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    showProject() {
        const token = localStorage.getItem('token')
        return Api().get(`api/project/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}