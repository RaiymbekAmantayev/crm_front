import Api from "@/services/Api";
export default {
    showPosition() {
        const token = localStorage.getItem('token')
        return Api().get(`api/pos/show`,        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    addPosition(credential) {
        const token = localStorage.getItem('token')
        return Api().post(`api/pos/add`,    credential,     {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
}