export default  function erroPage(props) {
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