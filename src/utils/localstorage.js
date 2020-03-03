let db = {
  /**
   * 向本地存储值
   * @param key 键
   * @param value 值，可以被json化
   */
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * 获取值
   * @param key 键
   * @param defaultValue 值，默认是空
   * @returns {any | {}}
   */
  get (key, defaultValue = {}) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  },
  /**
   * 从本地删除某个值
   * @param key
   */
  remove (key) {
    localStorage.removeItem(key);
  },
  /**
   * 清除缓存
   */
  clear () {
    localStorage.clear();
  }
};

export default db;
