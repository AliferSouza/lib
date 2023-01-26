export default async function userTags(component) {
  const DOM = document.querySelector("body").outerHTML.match(/<(comp-[a-z]+)/g);
  const domAtri = document.querySelector("body").outerHTML.match(/(data-[a-z]+)/g);
 

  const nameTag = [];
  const functionName = [];
  const componentNames = [];
  const getAttribute = []


 await DOM.forEach((elem, keys) => {
    componentNames.push(`${elem.match(/(comp-[a-z]+)/g)}`);
    document.querySelectorAll(componentNames).forEach(function (elementDom, i) {
      getAttribute.push(elementDom.dataset)
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
    document.querySelector(elem).innerHTML = component[componentNames[keys]](getAttribute);
  });
}
