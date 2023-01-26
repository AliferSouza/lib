
const context = [];


const useEffect = (fn) => {
    const execute = () => {
      context.push(execute);
      try {
        fn();
      } finally {
        context.pop();
      }
    };
    execute();
  };

  
  export default useEffect