import Api from "@/services/Api";
export default {
    addDeanRole(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/deanRoles/add/`, credential, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showDeanRole() {
        const token = localStorage.getItem('token')
        return Api().get(`api/deanRoles/show`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}