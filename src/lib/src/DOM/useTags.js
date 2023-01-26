export default function userTags(component) {
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