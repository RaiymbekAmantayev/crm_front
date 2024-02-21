import Api from "@/services/Api";

export default {
    Complete(credential) {
        const token = localStorage.getItem('token')
        return Api().put('api/users/complement', credential,        {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    getCurrentUser(){
        const token = localStorage.getItem('token')
        return Api().get('api/users/current',    {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    getAllUsers(){
        const token = localStorage.getItem('token')
        return Api().get('api/users/all',    {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    getUserById(id){
        const token = localStorage.getItem('token')
        return Api().get(`api/users/get/${id}`,    {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    RoleById(id, credential){
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return Api().put(`api/users/role/${id}`, credential, { headers });
    },
    DepById(id, credential){
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return Api().put(`api/users/dep/${id}`, credential, { headers });
    },

}