const context = [];

const ctxApp = {
  pathname: location.pathname,
  pathCompleto: location.pathname.split("/"),
  href: location.href,
  document: document,
};

function Alert(props) {
  alert(props);
}
function autoExecultar(props) {
  Function("return " + props)();
}
function navigatorTo(path) {
  history.pushState(null, null, path);
  roteamento();
}
function dbSetItem(name, props) {
  window.localStorage.setItem(name, JSON.stringify(props));
}
function dbGetItem(props) {
  return JSON.parse(window.localStorage.getItem(props));
}
async function atualizarComp(tag, props) {
  document.querySelector(await tag).innerHTML = await props;
}
async function addComponet(tag, props) {
  document.querySelector(await tag).innerHTML += await props;
}
async function Api(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const valorDta = await data;
    return valorDta;
  } catch {
    return null;
  }
}
function addBanco(nome, props) {
  const link = JSON.parse(localStorage.getItem(nome) || "[]");
  link.push(props);
  localStorage.setItem(nome, JSON.stringify(link));
}
function gerarId() {
  const id = Math.random().toString(32).substr(2, 9);
  return id;
}
function backup(props, tipo, textNomeArqDow) {
  let blob = new Blob([`${props}`], { type: `${tipo}` });
  const link = window.document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${textNomeArqDow || "export.txt"}`;
  link.click();
  window.URL.revokeObjectURL(link.href);
}
function erroPage(props) {
  let comErroLin = "";

  Object.keys(props).forEach((prop) => {
    console.log(prop);
    comErroLin += `<a href="/${prop}" class="nav__link" data-link>${prop}</a>`;
  });

  return `<div 
  style="
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-direction: column;"
  >${comErroLin}</div>`;
}
function gerarQueryString(props) {
  const texto = JSON.stringify(props);
  const parametroQyuery = `?data=${texto}`;
  return parametroQyuery;
}

const state = (initialValue) => ({
  _subscribers: new Set(),
  _value: initialValue,
  get: function () {
    const current = context.at(-1);
    if (current) {
      this._subscribers.add(current);
    }
    return this._value;
  },
  set: function (value) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this._subscribers.forEach((sub) => sub());
  },
});
const effect = (fn) => {
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
const memo = (fn) => {
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

function userTags() { 
    let generosKeys = Object.keys(component)
    generosKeys.forEach((keys) => {
      const nome = `comp-${component[keys].name.toLowerCase()}`;
      const result = component[keys];
      document.querySelector(nome).innerHTML += result()
    
    });  



}
function tags(){
  if(document.querySelector("comp-alifer")){
    addComponet("comp-alifer", `<h1>AliferSouza</h1>`)
  }


}
function Router(componentsPages) {

  async function roteamento() {
    const pathname = location.pathname.split("/")[1];

    if (pathname === "/" || pathname === "") {
      document.querySelector("title").innerText =
        Object.values(componentsPages)[0].name.toUpperCase();
      document.querySelector("#app").innerHTML = await Object.values(
        componentsPages
      )[0]();
    } else if (componentsPages[pathname]) {
      document.querySelector("title").innerText =
        componentsPages[pathname].name.toUpperCase();
      document.querySelector("#app").innerHTML = await componentsPages[
        pathname
      ]();
    } else {
      document.querySelector("title").innerText = pathname.toUpperCase();
      document.querySelector("#app").innerHTML = await erroPage(
        componentsPages
      );
    }
  }

  window.addEventListener("popstate", () => {
    roteamento();
  });

  document.addEventListener("DOMContentLoaded", (e) => {
    tags() 
  
   document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();

        history.pushState(null, null, e.target.href || e.target.id);
        roteamento();
      }
    });
  });
  roteamento();
}

const contextAplicationComponets = {
  button(props) {
    return `<button onclick="${props.nameFuc}()" style="${props.Style}">${props.title}</button>`;
  },
};

export {
  Alert,
  autoExecultar,
  navigatorTo,
  dbSetItem,
  dbGetItem,
  atualizarComp,
  addComponet,
  Api,
  addBanco,
  gerarId,
  backup,
  erroPage,
  gerarQueryString,
  Router,
  state,
  effect,
  memo,
  contextAplicationComponets,
  ctxApp,
  userTags,
};
