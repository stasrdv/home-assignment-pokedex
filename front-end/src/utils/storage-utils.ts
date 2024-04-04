export class StorageUtils {
  static setLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getLocalStorage<T>(key: string, defaultValue: T): T {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      try {
        return JSON.parse(storedItem) as T;
      } catch (error) {
        console.error(`Error parsing stored item for key '${key}':`, error);
        return defaultValue;
      }
    }
    return defaultValue;
  }
}
