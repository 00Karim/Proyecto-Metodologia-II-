import { User } from "./entities/user.js";
class BaseUserModel {
    async getObject(_id) {
        return null;
    }
    async createObject(parameters) {
        return null;
    }
    async deleteObject(parameters) {
        return false;
    }
    async updateObject(parameters) {
        return null;
    }
}
export const UserModel = new BaseUserModel(); // instanciamos el model para que sea exportada siempre la misma instancia
