import { IS_MORE_P, USER_LOCALSTORAGE_DATA_NAME } from "../constant";
import { Project, User } from "../types";

class LocalStorage {
  setData(storageName: string, data: User |Project[] | boolean) {
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

  updateIsMore(is: boolean) {
    localStore.setData(IS_MORE_P ,is)
  }

  IsMoreProduct(): boolean  {
    const data = localStorage.getItem(IS_MORE_P);
    if (data == null || data == undefined) throw Error('Cannot track the pages')
    return JSON.parse(data);
  }

  setMode() {
    localStorage.setItem("MODE", localStorage.getItem("MODE") ? "false" : 'true')
  }
  getMode():boolean {
    return JSON.parse(localStorage.getItem("MODE"));
  }
}

const localStore = new LocalStorage();
export default localStore;
