
const context = [];

const ctxApp = {
    pathname: location.pathname,
    pathCompleto: location.pathname.split("/"),
    href: location.href,
    document: document,
};


const Emitter = {
    events: {},

    on(event, cb) {
        Emitter.events[event] = Emitter.events[event] || []
        Emitter.events[event].push(cb)
    },

    emit(event, ...rest) {
        if (event in Emitter.events === false) {
            return;
        }

        Emitter.events[event].forEach((e) => {
            e(...rest)
        })
    }
}

function Alert(props) {
    alert(props);
}

function addBanco(nome, props) {
    const link = JSON.parse(localStorage.getItem(nome) || "[]");
    link.push(props);
    localStorage.setItem(nome, JSON.stringify(link));
}

function dbGetItem(props) {
    return JSON.parse(window.localStorage.getItem(props));
}

function dbSetItem(name, props) {
    window.localStorage.setItem(name, JSON.stringify(props));
}

function erroPage(props) {
    let comErroLin = "";

    Object.keys(props).forEach((prop) => {
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

async function addComponet(tag, props) {
    document.querySelector(await tag).innerHTML += await props;
}

async function atualizarComp(tag, props) {
    document.querySelector(await tag).innerHTML = await props;
}


function userTags(component) {
    try {
        const DOM = document.querySelector("body").outerHTML.match(/<(comp-[a-z]+)/g);
        if (!DOM) {
            console.log("Nenhuma tag comp- foi encontrada na página");
            return;
        }

        DOM.forEach(async (elem, i) => {
            const compAlgo = elem.match(/(comp-[a-z]+)/g)[0];
            const elementDom = document.querySelector(compAlgo);
            if (!elementDom) {
                console.log(`Não foi possível encontrar a tag ${compAlgo}`);
                return;
            }
            const attributes = Object.entries(elementDom.dataset).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

            const newTag = document.createElement(`${compAlgo}-${i}`);
            elementDom.parentNode.replaceChild(newTag, elementDom);

            newTag.innerHTML = component[compAlgo](attributes);
        });
    } catch (error) {
        console.error(error);
    }
}





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







const useState = (initialValue) => ({
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


function navigatorTo(path) {
    history.pushState(null, null, path);
    roteamento();
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

function Router(componentsPages, components) {
    async function route() {
        const pathname = location.pathname.split("/")[1];
        let currentPage;

        if (pathname === "/" || pathname === "") {
            currentPage = Object.values(componentsPages)[0];
        } else if (componentsPages[pathname]) {
            currentPage = componentsPages[pathname];
        } else {
            currentPage = erroPage(componentsPages);
        }

        document.querySelector("title").innerText = await currentPage.name.toUpperCase();
        document.querySelector("#app").innerHTML = await currentPage();
        userTags(components);
    }

    window.addEventListener("popstate", route);
    document.addEventListener("DOMContentLoaded", () => {
        document.body.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                history.pushState(null, null, e.target.href || e.target.id);
                route();
            }
        });
    });

    route();
}

function autoExecultar(props) {
    Function("return " + props)();
}



function backup(props, tipo, textNomeArqDow) {
    let blob = new Blob([`${props}`], { type: `${tipo}` });
    const link = window.document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${textNomeArqDow || "export.txt"}`;
    link.click();
    window.URL.revokeObjectURL(link.href);
}



function gerarQueryString(props) {
    const texto = JSON.stringify(props);
    const parametroQyuery = `?data=${texto}`;
    return parametroQyuery;
}



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
    backup,
    erroPage,
    gerarQueryString,
    Router,
    userTags,
    useState,
    useEffect,
    useMemo,
    ctxApp,
    Emitter

};









