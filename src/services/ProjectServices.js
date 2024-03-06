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
    showProject(userId) {
        const token = localStorage.getItem('token')
        return Api().get(`api/project/show?userId=${userId}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    DeleteProject(userId) {
        const token = localStorage.getItem('token')
        return Api().delete(`api/project/del/${userId}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    ChangeStatus(projectId, comment){
        const token = localStorage.getItem('token')
        console.log(comment)
        return Api().put(`api/project/change/?projectId=${projectId}`,   {comment:comment},    {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
}
}