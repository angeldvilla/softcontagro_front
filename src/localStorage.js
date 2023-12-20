// local storage

export const loadState = () => {
    try {
      const serializedData = localStorage.getItem("state");
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      let serializedData = JSON.stringify(state);
      localStorage.setItem("state", serializedData);
    } catch (error) {
      console.error("Could not save state", error);
    }
  };
  
  export const removeValueFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Could not remove value from local storage", error);
    }
  };
  