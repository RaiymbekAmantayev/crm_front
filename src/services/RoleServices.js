import Api from "@/services/Api";

export default {
    ShowRoles() {
        return Api().get('api/roles/show')
    },
    SearchByRole(roleId) {
        const token = localStorage.getItem('token')
        return Api().get(`api/roles/search?roleId=${roleId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    SearchByRoleDep(roleId) {
        const token = localStorage.getItem('token')
        return Api().get(`api/roles/roleDep?roleId=${roleId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    SearchByDep(departmentId) {
        return Api().get(`api/roles/dep?departmentId=${departmentId}`)
    },
    getTeachers() {
        const token = localStorage.getItem('token')
        return Api().get(`api/roles/teach`,    {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
}