// Carga el estado del almacenamiento local
export const loadState = () => {
    try {
      // Intenta obtener los datos serializados del almacenamiento local
      const serializedData = localStorage.getItem("state");
  
       // Si no hay datos en el almacenamiento local, devuelve undefined
      if (serializedData === null) {
        return undefined;
      }
  
      // Si hay datos en el almacenamiento local, los parsea y los devuelve
      return JSON.parse(serializedData);
    } catch (error) {
      // En caso de error, devuelve undefined
      return undefined;
    }
  };
  
  // Guarda el estado en el almacenamiento local
  export const saveState = (state) => {
    try {
      // Convierte el estado a una cadena JSON
      let serializedData = JSON.stringify(state);
  
       // Almacena los datos serializados en el almacenamiento local bajo la clave "state"
      localStorage.setItem("state", serializedData);
    } catch (error) {
      console.error("Could not save state", error);
    }
  };
  
  // Elimina un valor específico del almacenamiento local
  export const removeValueFromLocalStorage = (key) => {
    try {
      // Intenta eliminar un valor del almacenamiento local utilizando la clave especificada
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Could not remove value from local storage", error);
    }
  };
  