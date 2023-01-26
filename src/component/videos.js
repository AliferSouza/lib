import video from '../data/dataVideos.js'


export default function Video() {
  

  const areaVideo =  document.selecionar =  () => {
   
        const video_main = document.querySelector( ".main-video-content");
        const playlist_video = document.querySelectorAll(".playlist-video");

        playlist_video.forEach((item, i) => {  
           
             
            if (!i) {
              video_main.children[0].src = item.children[0].getAttribute("src");
              video_main.children[1].innerHTML = item.children[1].innerHTML;
                
            }

            item.onclick = () => {
                playlist_video.forEach((video) => video.classList.remove("active"));
                item.classList.add("active");

                video_main.children[0].src = item.children[0].getAttribute("src");
                video_main.children[1].innerHTML = item.children[1].innerHTML;
            };
        });

    }

    window.onload = () =>{
        areaVideo()
    }
 
    
    let compVideo = ""

    video.forEach((element, index) => {
        compVideo += `
         <div class="playlist-video ${index + 1 === 1 && "active"}" onclick="selecionar()">        
          <video src="${element.src}" muted></video>
          <label class="playlist-video-info">${element.title}</label>
         </div>
        `
    })


    return compVideo


}