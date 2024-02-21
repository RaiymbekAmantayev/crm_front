import Api from "@/services/Api";

export default {
    ShowDep() {
        return Api().get('api/dep/show')
    },
}