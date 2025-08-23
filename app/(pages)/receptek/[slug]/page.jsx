import Image from "next/image";
import style from '../../../styles/recipeDetail.module.scss'
import { prisma } from '../../../../lib/prisma';

const RecipeDetails = async ({ params }) => {

 
  const recipe = await prisma.recipe.findUnique(
    {
      where: { slug: params.slug },
      include: {
        ingredients: true,
        steps: true,
      }
    }
  );

  const user = await prisma.user.findUnique({
    where: { id: recipe.authorId }
  });

  //* nagy kezdőbetűvé alakítás
  function capitalize(s) {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
   <div className={`${style.page_container} section`}>

      <h2 className={style.name}>{recipe.name}</h2>
      <Image src={`/images/${recipe.imageURL}`} width={300} height={300} className={style.img} alt={recipe.slug}/>
      <p className={style.rate}>Értékelés: {recipe.rate}</p>
      <h2 className={style.titles}>Hozzávalók:</h2>
      <ul>
        {recipe.ingredients.map(x => <li key={x.id}>{capitalize(x.name)} - Mennyiség: {x.quantity}</li>)}
      </ul>
      <h2 className={style.titles}>Elkészítés:</h2>
      <ul>
        {recipe.steps.map(x => <li className={style.list_items} key={x.id}>{x.content}<span> Időtartam: {x.timer}</span></li>)}
      </ul>

      <h3>Szerző: {user.name}</h3>
    </div>
  );
}

export default RecipeDetails