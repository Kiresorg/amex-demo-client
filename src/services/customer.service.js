import http from "../http-common";

class CustomerDataService {
    getAll() {
        return http.get('/customer');
    }

    get(id) {
        return http.get('/customer/' + id);
    }

    search(searchTerm) {
        return http.get(`/customer?searchTerm=${searchTerm}`);
    }

    update = (id, data) => {
        return http.put(`/customer/${id}`, data);
      };
}

export default new CustomerDataService();