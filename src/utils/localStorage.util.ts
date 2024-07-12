import { USER_LOCALSTORAGE_DATA_NAME } from "../constant";
import { Project, User } from "../types";

class LocalStorage {
  setData(storageName: string, data: User |Project[]) {
    localStore.deleteLocalStoreData(storageName);
    localStorage.setItem(storageName, JSON.stringify(data));
  }

  getData(storageName: string): User | null | Project[] {
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

  updateFullName(newName: string) {
    const data = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_DATA_NAME) || "null");
    if (data && data !== "null") {
      data.fullName = newName;
      localStore.setData(USER_LOCALSTORAGE_DATA_NAME, data);      
    }
  }

  updateLocalStorageData(storageName:string) {
    // const data = localStore.getData(storageName) || [];
  }
}

const localStore = new LocalStorage();
export default localStore;
