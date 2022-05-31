import utils from './utils';

//存储媒介封装
const ROOTKEY = 'ueditor_preference';
const LOCAL_FILE = 'localStorage';
const getUserData = function (localFIle) {
  var container = document.createElement('div');
  container.style.display = 'none';

  if (!container.addBehavior) {
    return null;
  }

  container.addBehavior('#default#userdata');

  return {
    getItem(key) {
      var result = null;

      try {
        document.body.appendChild(container);
        container.load(localFIle);
        result = container.getAttribute(key);
        document.body.removeChild(container);
      } catch (e) {}

      return result;
    },

    setItem(key, value) {
      document.body.appendChild(container);
      container.setAttribute(key, value);
      container.save(localFIle);
      document.body.removeChild(container);
    },

    //// 暂时没有用到
    //clear() {
    //
    //    let expiresTime = new Date();
    //    expiresTime.setFullYear(expiresTime.getFullYear() - 1);
    //    document.body.appendChild(container);
    //    container.expires = expiresTime.toUTCString();
    //    container.save(localFIle);
    //    document.body.removeChild(container);
    //
    //},

    removeItem(key) {
      document.body.appendChild(container);
      container.removeAttribute(key);
      container.save(localFIle);
      document.body.removeChild(container);
    }
  };
};
const storage = window.localStorage || getUserData(LOCAL_FILE) || null;

const localStore = {
  saveLocalData(key, data) {
    if (storage && data) {
      storage.setItem(key, data);
      return true;
    }

    return false;
  },

  getLocalData(key) {
    if (storage) {
      return storage.getItem(key);
    }

    return null;
  },

  removeItem(key) {
    storage && storage.removeItem(key);
  }
};

export default class LocalStorage {
  setPreferences(key, value) {
    let obj = {};
    if (utils.isString(key)) {
      obj[key] = value;
    } else {
      obj = key;
    }
    let data = localStore.getLocalData(ROOTKEY);
    if (data && (data = utils.str2json(data))) {
      utils.extend(data, obj);
    } else {
      data = obj;
    }
    data && localStore.saveLocalData(ROOTKEY, utils.json2str(data));
  }

  getPreferences(key) {
    let data = localStore.getLocalData(ROOTKEY);
    if (data && (data = utils.str2json(data))) {
      return key ? data[key] : data;
    }
    return null;
  }

  removePreferences(key) {
    let data = localStore.getLocalData(ROOTKEY);
    if (data && (data = utils.str2json(data))) {
      data[key] = undefined;
      delete data[key];
    }
    data && localStore.saveLocalData(ROOTKEY, utils.json2str(data));
  }
}
