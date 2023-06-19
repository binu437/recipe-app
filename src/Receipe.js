import React from "react";
import style from "./receipe.module.css"

function Receipe({title,Calories,image,ingredients}){
   return(
         <div className={style.receipe}>
           
           <h1 >{title}</h1>
           <ol>
            {ingredients.map((ingredient)=>(
                <li>{ingredient.text}</li>
            ))}
           </ol>
           <p>{Calories}</p>
           
           <img  className={style.image}src={image} alt="" />


         </div>
    );
}

export default Receipe;






