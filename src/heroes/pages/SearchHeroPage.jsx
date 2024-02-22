import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { HeroCard } from "../components/HeroCard";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../helpers";

export const SearchHeroPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  })

  const onSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${ searchText.toLowerCase().trim() }`);
  }
  
  return (
    <>
      <h1>Search Hero</h1>
      <hr />

      <div className="row">

      <div className="col-5">
        <h4>Searching</h4>
        <hr />
        <form onSubmit={onSearchSubmit} aria-label="form">
          <input 
          type="text" 
          placeholder="Hero name" 
          className="form-control" 
          name="searchText" 
          autoComplete="off"
          value={searchText}
          onChange={onInputChange}
          />
          <button className="btn btn-outline-primary mt-1">Search</button>
        </form>
      </div>
    
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {
            (q === '')
            ?
            <div className="alert alert-primary animate__animated animate__fadeInUp">Search a Hero</div>
            : (heroes.length === 0) 
            && <div className="alert alert-danger animate__animated animate__headShake"> <b>{q}</b> was not found </div>
          }


          {
            heroes.map( hero => (<HeroCard key={hero.id} {...hero}/>) )
          }
          
        </div>

        </div>
    
    </>
  )
}
