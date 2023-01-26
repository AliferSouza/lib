 import effect from"./useEffect.js"
 import state from "./useState"

 const useMemo = (fn) => {
    let memoized;
    effect(() => {
      if (memoized) {
        memoized.set(fn());
      } else {
        memoized = state(fn());
      }
    });
    return memoized.get;
  };

  export default useMemo