
export const saveToLocalStorage = (state) => {
    try {
      const State = JSON.stringify(state);
      localStorage.setItem('cart', State);
    } catch (e) {
      console.error("Could not save state to localStorage", e);
    }
  };
  
  export const loadFromLocalStorage = () => {
    try {
      const State = localStorage.getItem('cart');
      if (State === null) {
        return undefined; 
      }
      return JSON.parse(State);
    } catch (e) {
      console.error("Could not load state from localStorage", e);
      return undefined;
    }
  };
  