import { USER_LOCALSTORAGE_DATA_NAME } from "../constant";
import { User } from "../types";

class LocalStorage {
  setData(storageName: string, data: User) {
    localStorage.setItem(storageName, JSON.stringify(data));
  }

  getData(storageName: string): User | null {
    const data = localStorage.getItem(storageName);
    if (data) {
      const parseData = JSON.parse(data);
      if (parseData) {
        return parseData;
      }

      return null;
    }
    return null;
  }
  deleteLocalStoreData(storageName: string) {
    const data = localStorage.getItem(storageName);
    if (data && JSON.parse(data)) {
      localStorage.removeItem(storageName);
    }
  }
}

const localStore = new LocalStorage();
export default localStore;
