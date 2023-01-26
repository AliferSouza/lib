export default function userTags(component) {
  console.log(component)

  document.addEventListener("DOMContentLoaded", (e) => {
    const componentNames = []
    const documentDOM = e.target.body
    const dadosDOM = documentDOM.outerHTML

    const elementDom = dadosDOM.match(/<(comp-[a-z]+)/g)

    elementDom.forEach((elem, keys) => {
      componentNames.push(elem.match(/(comp-[a-z]+)/g))
    })

    const divPrincipal = document.querySelector("#app")

    componentNames.forEach((comp, index) => {   

      console.log(comp)
      document.querySelector("#app").innerHTML += `<${comp}-${index}>`

      document.querySelector(`${comp}-${index}`).innerHTML = component[comp]()

    })

  })



}