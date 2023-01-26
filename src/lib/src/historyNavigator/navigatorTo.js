export default function navigatorTo(path) {
    history.pushState(null, null, path);
    roteamento();
  }
  
  