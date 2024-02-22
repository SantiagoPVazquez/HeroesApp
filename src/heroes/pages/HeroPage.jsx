import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers/getHeroById";
import { useMemo } from "react";

export const HeroPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();
 
  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  const hero = useMemo( () => getHeroById(id), [ id ]);

  const onNavigateBack = () => {
    navigate(-1);
  }

  if (!hero) {
    return <Navigate to='/'/>;
  }
  
  return (

    <div className="row mt-5">
      <div className="col-4">
        <img src={heroImageUrl} alt={hero.superhero} className="img-thumbnail animate__animated animate__fadeInLeft"/>
      </div>

      <div className="col-8 animate__animated animate__fadeInRight">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> <b>Alter Ego: </b> {hero.alter_ego}</li>
          <li className="list-group-item"> <b>Publisher: </b> {hero.publisher}</li>
          <li className="list-group-item"> <b>First Appearence: </b> {hero.first_appearance}</li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button className="btn btn-primary" onClick={onNavigateBack}>Back</button>
      </div>

    </div>
  )
}
