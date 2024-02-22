import { heroes } from '../data/heroes'


export const getHeroById = ( id ) => {

    const heroById = heroes.find( hero => hero.id === id);

    return heroById;


}