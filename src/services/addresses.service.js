import http from "../http-common";

class AddressDataService {
    getAll() {
        return http.get('/address');
    }

    search(searchTerm) {
        return http.get(`/address?searchTerm=${searchTerm}`);
    }
}

export default new AddressDataService();