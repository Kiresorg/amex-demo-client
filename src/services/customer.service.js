import http from "../http-common";

class CustomerDataService {
    getAll() {
        return http.get('/customer');
    }
}

export default new CustomerDataService();