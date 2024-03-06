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
    showArticle(userId) {
        const token = localStorage.getItem('token')
        return Api().get(`api/art/show?userId=${userId}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    DeleteArticle(id) {
        const token = localStorage.getItem('token')
        return Api().delete(`api/art/del/${id}`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    ChangeStatusArticle(articleId, comment) {
        const token = localStorage.getItem('token')
        return Api().put(`api/art/change/?articleId=${articleId}`,   {comment:comment},   {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}