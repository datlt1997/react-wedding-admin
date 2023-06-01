import clsx from "clsx";
import "./style.css"

function Image({image, className}) {
  return <img src={image} className={clsx("image-default", className)}/>
}

export default Image