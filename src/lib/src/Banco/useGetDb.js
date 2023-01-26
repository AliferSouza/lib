export default function useGetDb(props) {
    return JSON.parse(window.localStorage.getItem(props));
  }