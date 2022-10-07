import { Link, useParams } from "react-router-dom";
import { Cards, Grid } from "../components/StyledElements";
import { useEffect, useState, React } from "react";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams(); // this will give us the params of the request used to access the page

  useEffect(() => {
    getSearchedRecipes(params.search);
  }, [params.search]);

  const itemsInLocalStorage = localStorage.getItem("searchedRecipes");
  const getSearchedRecipes = async (name) => {
    if (itemsInLocalStorage === undefined) {
      setSearchedRecipes(JSON.parse(itemsInLocalStorage));
    } else {
      const api = await fetch(
        `https://url/apiKey=${process.env.REACT_API_KEY}&query=${name}`
      );
      const recipes = await api.json();

      localStorage.setItem("searchedRecipes", JSON.stringify(recipes.results)); // in local storage you can only store strings
      setSearchedRecipes(recipes.results);
      console.log(recipes.results);
    }
  };
  return (
    <Grid>
      {searchedRecipes.map((item) => {
        return (
          <Cards key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Cards>
        );
      })}
    </Grid>
  );
};

export default Searched;
