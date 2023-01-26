import Video from "../component/videos.js"
import Menu from "../component/menu.js"



export default  function Home() {


  const data = {
    "alifer": "alifer",
    valor: 1
  
  }

  const a = JSON.stringify(data)

console.log(a)

    return `   
    

  
 
    <comp-menu data-dados="${a}"> </comp-menu>
    <div class="container">
    <div class="main-video-content">
      <video src="" controls muted autoplay></video>
      <label class="main-info"></label>
    </div>
    
    <div class="playlist">    
     <comp-video> </comp-video>
    </div>
    </div>

  


  
  

   
  


     
    `
}