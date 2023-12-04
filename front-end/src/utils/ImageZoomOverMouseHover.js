import { useEffect } from "react";
import ImageZoom from "js-image-zoom";
const ImageZoomOverHover=({ id1 })=> {
    var options = {
        // width:400,
        // zoomWidth:500,
        // fillContainer:true,
        zoomPosition:"center",
        scale: 2,
        offset: {
            vertical: 0,
            horizontal: 0
        },
    }
    useEffect(
        () => {
            new ImageZoom(document.getElementById(id1) ,options)
        },[]);
        console.log(document.getElementById(id1))
        return null;
}
export default ImageZoomOverHover;