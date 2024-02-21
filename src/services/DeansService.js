import Api from "@/services/Api";
export default {
    addDean(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/dean/add/`, credential, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showDean() {
        const token = localStorage.getItem('token')
        return Api().get(`api/dean/show`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}