//src/components/Play.js

import myCss from'./css/custom_play.module.css'
import Study from './study'


export default function Play(){
console.log(myCss)
    return(
        <div>
            <h3>Play Component</h3>
            <p className={myCss.green}>열심히 놀아 보아요</p>
            <p className={myCss["big-font"]}>어쩌구... 저쩌구...</p>
            <p className={myCss.green +" "+myCss["big-font"]}>어쩌구... 저쩌구...</p>
            <p className={`${myCss.green} ${myCss["big-font"]}}`}>어쩌구... 저쩌구...</p>
         
        </div>
    )

}

