import React, { useEffect, useState } from 'react';
import './App.css';
import Receipe from "./Receipe";
import Pagination from './Pagination';

function App() {
    
  const appID = "a6cc8dee";
  const appKey = "fec83b55a838643fbddc2bf38ee65efc";
  // const appURL = "https://api.edamam.com/api/recipes/v2?type=any&beta=true&q=chicken&app_id="+ appID "+&app_key="+appKey+ "&imageSize=SMALL";
  // step:4{set useSTATE}

  const[recipes,setRecipes]=useState([]);

  const [search,setSearch] = useState();

  const[query,setQuery] = useState(null);

  const [showResult, setShowResult] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [recipesPerPage] = useState(5);

  
  
  // STEP 3
  useEffect(() => {
         getRecipes();
  },[query]);

  // STEP 4
  async function getRecipes(){
    const response = await fetch(
      "https://api.edamam.com/api/recipes/v2?type=any&beta=true&q="+query+"&app_id="
      + appID+
      "&app_key="
      +appKey+  
      "&imageSize=SMALL"
    );
    const data = await response.json();
    // STEP 5(NEED TO GET THE data that is data.hits(which contain all information))
    setRecipes(data.hits);
    
  }
    function updateSearch(event) {
      setSearch(event.target.value);
    }

    function getSearch(event){
      event.preventDefault();
      setQuery(search);
      setShowResult(true);
      setSearch("");
      setCurrentPage(1);
    }

    function paginate(pageNumber) {
      setCurrentPage(pageNumber);
    }

  //  pagination

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

 




  return (
    <div className="App">
      
     <form className="search-form" onSubmit={getSearch}>
      <input 
      className="search-bar"
      type="text"
      value={search}
      onChange={updateSearch}
      />
      <button className="search-button" type="submit">
      Search
      </button>
     </form>

     
      
      {/* step 6: create a new component and import it(receipe.js)
      /* step 7: create a map function *
       useState=receipes.map((func name) => (component name/)} */}
  

{/* this particular operation condition is to show the result only when the text is typed */}
    
  {showResult && query &&(

      <div className="receipes">
        {currentRecipes.map((recipe) => (
          <Receipe  
            key={recipe.recipe.label}   
            title={recipe.recipe.label}
            Calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}  />
        ))};

        {recipes.length > recipesPerPage && (
        <Pagination
          currentPage={currentPage}
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
      )}


          
      </div>
      )}

    
     



    </div>
  );
}

export default App;
