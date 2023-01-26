import erroPage from "../componentesIndoor/erroPage.js";
import useTags from "../DOM/useTags.js";

export default function Router(componentsPages, components) {

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
    useTags(components)  
  }

  window.addEventListener("popstate", () => {
    roteamento();
  });

  document.addEventListener("DOMContentLoaded", (e) => {
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
