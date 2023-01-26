export default function userTags(component) {
  document.addEventListener("DOMContentLoaded", (e) => {
    const nameTag = [];
    const functionName = [];
    const componentNames = [];
    const documentDOM = e.target.body.outerHTML.match(/<(comp-[a-z]+)/g);

    documentDOM.forEach((elem, keys) => {
      componentNames.push(`${elem.match(/(comp-[a-z]+)/g)}`);
      document
        .querySelectorAll(componentNames)
        .forEach(function (elementDom, i) {
          const compAlgo = elementDom.outerHTML.match(/(comp-[a-z]+)/g)[0];
          nameTag.push(`${compAlgo}-${i}`);
          var newTag = document.createElement(`${compAlgo}-${i}`);
          elementDom.parentNode.replaceChild(newTag, elementDom);
        });
    });

    Object.keys(component).forEach((cop, kys) => {
      const obj = {
        [`${cop}-${kys}`]: component[cop],
      };
      functionName.push(obj);
    });

    nameTag.forEach((elem, keys) => {
      document.querySelector(elem).innerHTML = component[componentNames[0]]();
    });
  });
}
