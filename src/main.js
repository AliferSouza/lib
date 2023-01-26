import {Router} from "./lib/src/index.js"
import home from "./views/Home.js";
import sobre from "./views/Sobre.js"
import Menu from "./component/menu.js";
import Video from "./component/videos.js";

import compcard from "./component/teste.js";

Router({home, sobre}, {"comp-card":compcard, "comp-menu":Menu, "comp-video": Video})



   



