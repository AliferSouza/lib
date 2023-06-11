const ROOT = document.querySelector("#app");

async function useGetModules(caminho) {
  let result;  
 
  try {
    result = await import(`${caminho}`).then(module => module.default);

  } catch (error) {
    // Trate o erro de importação aqui
    console.error("Erro ao importar o arquivo:", error);
    // Defina um valor padrão para result ou faça qualquer outra ação adequada
  }  
  return result;
}

async function useApi(url, method) {
    try {
      const res = await fetch(url, method);
      const data = await res.json();
      const valorDta = await data;
      return valorDta;
    } catch {
      return null;
    }
}

function useGetItem(props) {
    return JSON.parse(window.localStorage.getItem(props));
}

async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      const error = new Error("Geolocation is not supported by this browser.");
      reject(error);
    }
  });
}

 async function useLocation() {
  try {
    const { latitude, longitude } = await getLocation();
    return [latitude, longitude];
  } catch (error) {
    console.log("Erro ao obter localização:", error.message);
    return [null, null];
  }
}

 async function useNavigate(page, rota) {
  const Pages = await useGetModules("../../../pages/index.js")
  history.pushState(null, null, rota)
  Router(page)
}

async function useId(senha) {
  try {
    // Converte a senha para um ArrayBuffer
    const encoder = new TextEncoder();
    const senhaBytes = encoder.encode(senha);

    // Calcula o hash SHA-256 da senha
    const hashBuffer = await crypto.subtle.digest("SHA-256", senhaBytes);

    // Converte o hash para uma string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");

    return hashHex;
  } catch (error) {
    throw new Error("Erro ao criptografar a senha: " + error);
  }
}

 function useSearch(props) {
  try {
    const location = window.location;
     const prop = location[props];
     return decodeURIComponent(prop) || location

  } catch (error) {
    throw error;
  }
}

 function useSetItem(name, props) {
  window.localStorage.setItem(name, JSON.stringify(props));
}

 function useSetItems(nome, props) {
  const link = JSON.parse(localStorage.getItem(nome) || "[]");
  link.push(props);
  localStorage.setItem(nome, JSON.stringify(link));
}

async function CSVToJSON(url, ct) {
  const response = await fetch(url, {
    headers: {
      ct,
    },
  });
  const data = await response.text();

  const lines = data.split("\n");
  const keys = lines[0].split(";");

  return lines.slice(1).map((line) => {
    return line.split(";").reduce((acc, cur, i) => {
      const toAdd = {};
      toAdd[keys[i]] = cur;
      return { ...acc, ...toAdd };
    }, {});
  });
}

function JSONToCSV(objArray, keys) {
  return [
    keys.join(","),
    ...objArray.map((row) => keys.map((k) => row[k] || "").join(",")),
  ].join("\n");
}

function useExeFucTemp(func, time) {  
  setTimeout(function() {
    func();
  }, time || 1);
}





///////////////////////////////////////////////////////////
async function customTags(sortedOut, statePage) {
  const components = await useGetModules("../components/index.js");
  const stateFunctions = [];

  const divTemporaria = document.createElement("div");
  divTemporaria.insertAdjacentHTML("beforeend", sortedOut);

  const tagElements = [...divTemporaria.getElementsByTagName('*')].filter((element) =>
  element.tagName.toLowerCase().match(/^comp-[a-z]+$/));

  await Promise.all(tagElements.map(async (elem, i) => {
    const newTag = document.createElement(`${elem.tagName.toLowerCase()}-${i}`);
    elem.replaceWith(newTag);
  
    const attributes = { ...elem.dataset };
    Object.entries(attributes).forEach(([key, value]) => {
      newTag.setAttribute(key, value);
    });
  
    const dataApp = {
      referencia: i,
      nameTag: newTag.tagName.toLowerCase(),
      attributes,
      parameter: Object.fromEntries(new URLSearchParams(location.href.split("?")[1]).entries()),
      pagina: location.hash.replace("#", "").match(/^\/(\w+)(\/)?/)
    };
  
    const { html, state } = await components[elem.tagName.toLowerCase()](dataApp);
    newTag.innerHTML = html();
  
    if (typeof state === "function") {
      stateFunctions.push(state);
    }
  }));
  
  ROOT.innerHTML = "";
  ROOT.appendChild(divTemporaria);
  if (typeof  statePage === "function") {
    statePage()
  }
  stateFunctions.forEach((stateFunction) => {
    stateFunction();
  });

 
}  

async function render(Pages, selectedPage) {
  if(selectedPage === "erro"){
    erroPage(Pages)
  }else{
    const { html, state, notTags } =   erroPage(Pages) || await Pages[selectedPage]() 
    const renderedHtml = typeof html === "function" ? html() : html;
    const renderedState = typeof state === "function" ? state : undefined;
  
    if (notTags === undefined) {
      customTags(renderedHtml, renderedState);
    } else {    
      ROOT.innerHTML = renderedHtml;
      renderedState && renderedState();
    }

  }
}

function stateURL(Pages) {
  const dataUrl = location.hash.replace("#", "") || location.pathname;
  let currentPage;

  if (dataUrl === "/#" || dataUrl === "/#/" || dataUrl === "/") {
    currentPage = Object.keys(Pages)[0];
    history.pushState(null, null, `/#/${currentPage}/`);
  } else {
    const match = dataUrl.match(/^\/(\w+)(\/)?/);
    const keyPage = match && match[1];
    currentPage = keyPage && Pages[keyPage] ? keyPage : "erro";   
  }
  return currentPage;
}


function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function erroPage(Pages) {
  ROOT.innerHTML = `
    <div class="erroPages">
      ${Object.keys(Pages).map((page, index) => `<a class="pagina-erro" id="${index}"  data-href="/#/${page}/">${page.toUpperCase()}</a>`).join("")}
    </div>
  `;
}

function Router(Pages) {
  function routerState() {
    const selectedPage = stateURL(Pages);
    if (selectedPage) {
      render(Pages, selectedPage);
    }
  }

  function handleClick(e) {
    if (e.target.matches("[data-href]")) {
      e.preventDefault();
      const href = e.target.dataset.href;
      history.pushState(null, null, href);
      routerState();
    }
  }

  window.addEventListener("popstate", routerState);
  document.body.addEventListener("click", debounce(handleClick, 200));
  routerState();
}

window.$ = (props, valorArederizar) => {
  if(valorArederizar){
  document.querySelector(props).innerHTML = valorArederizar
  }    
  return document.querySelector(props)
}

window.$$ = (options) => {
  const selectors = Object.keys(options);
  const contents = Object.values(options);
  
  const elements = document.querySelectorAll(selectors);
  
  elements.forEach((element, index) => {
    const content = contents[index];
    
    if (content) {
      element.innerHTML = content;
    }
  });
  
  return elements;
};

window.$$$ = (props, valorArederizar) => {
  const elements = document.querySelectorAll(props);

  if (valorArederizar) {
    elements.forEach((element) => {
      console.log(element)
      element.innerHTML += valorArederizar;
    });
  }

  return elements;
};


export {
  Router,
  useSetItems,
  useGetItem,
  useSetItem,
  useApi,
  useGetModules,
  useSearch,
  useExeFucTemp,
  useId,
  useLocation,
  CSVToJSON,
  JSONToCSV,
  useNavigate,  

};
