export default function userTags(pages, component) { 




  document.addEventListener("DOMContentLoaded", (e) =>{
    const componentNames = []

    const documentDOM = e.target.body
    const dadosDOM = documentDOM.outerHTML
    
    const found = dadosDOM.match(/<(comp-.+?)[\s|>]/g);

    found.forEach((elem)=>{
      componentNames.push(elem.match(/[a-z]+/g)[1].toLowerCase())     
    })

    

        
   componentNames.forEach((keys, index) => { 
     const nome = `comp-${component[keys].name.toLowerCase()}`;     
     const renomearTag = nome.replace(nome, `${nome}-${index}`)
     const pegarDivPrincipal =  document.querySelector(nome)
     pegarDivPrincipal.innerHTML = (`<${renomearTag}>` )

     console.log(pegarDivPrincipal)

     const nomeRenomeado = `comp-${component[keys].name.toLowerCase()}-${index}`;  

     const result = component[keys];

     document.querySelector(nomeRenomeado).innerHTML += result()
    })

  })
   
    
}




export default function userTags(pages, component) { 




  document.addEventListener("DOMContentLoaded", (e) =>{
    const componentNames = []
    const documentDOM = e.target.body
    const dadosDOM = documentDOM.outerHTML   

    const found = dadosDOM.match(/<(comp-.+?)[\s|>]/g);

    found.forEach((elem)=>{
      componentNames.push(elem.match(/[a-z]+/g)[1].toLowerCase())     
    })


   


    
    

        
   componentNames.forEach((comp, index) => {     
    console.log(comp)
   
     const nome = `comp-${component[comp].name.toLowerCase()}`;  
     document.querySelector(nome).id = index

     const result = component[comp];

     document.querySelector(nome).innerHTML += result()
    })

  })
   
    
}

