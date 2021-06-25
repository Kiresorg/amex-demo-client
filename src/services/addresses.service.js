import http from "../http-common";

class AddressDataService {
    getAll() {
        return http.get('/address');
    }
}

export default new AddressDataService();