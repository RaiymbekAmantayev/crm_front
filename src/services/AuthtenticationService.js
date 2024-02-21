import Api from "@/services/Api";

export default {
    register(credential) {
        return Api().post('api/users/auth', credential)
    },
    login(credential){
        return Api().post('api/users/login', credential)
    },
}

// AuthenticationService.register({
//     email: "test@gmail.com",
//     password: "123456"
// })