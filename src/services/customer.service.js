import http from "../http-common";

class CustomerDataService {
    getAll() {
        return http.get('/customer');
    }

    search(searchTerm) {
        return http.get(`/customer?searchTerm=${searchTerm}`);
    }
}

export default new CustomerDataService();