import Api from "@/services/Api";
export default {
    addOrganzition(credntial) {
        const token = localStorage.getItem('token')
        return Api().post(`api/organ/add`, credntial, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    showOrganzition() {
        const token = localStorage.getItem('token')
        return Api().get(`api/organ/show`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}