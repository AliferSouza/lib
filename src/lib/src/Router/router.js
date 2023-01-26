import erroPage from "../componentesIndoor/erroPage.js";
import useTags from "../DOM/useTags.js";

export default function Router(componentsPages, components) {
    async function route() {
        const pathname = location.pathname.split("/")[1];
        let currentPage;

        if (pathname === "/" || pathname === "") {
            currentPage = Object.values(componentsPages)[0];
        } else if (componentsPages[pathname]) {
            currentPage = componentsPages[pathname];
        } else {
            currentPage = erroPage;
        }


        console.log(currentPage)


        document.querySelector("title").innerText = await currentPage.name.toUpperCase() || erroPage.name
        document.querySelector("#app").innerHTML = await currentPage(componentsPages) || currentPage()
        useTags(components);
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