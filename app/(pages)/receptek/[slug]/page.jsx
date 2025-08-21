import Image from "next/image";
import style from '../../../styles/recipeDetail.module.scss'
import { prisma } from '../../../../lib/prisma';

const RecipeDetails = async ({ params }) => {

  console.log(params)
  const recipe = await prisma.recipe.findUnique(
    {
      where: { slug: params.slug },
      include: {
        ingredients: true,
        steps: true,
      }
    }
  );
  //* nagy kezdőbetűvé alakítás
  function capitalize(s) {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
   <div className={`${style.page_container} section`}>

      <h2 className={style.name}>{recipe.name}</h2>
      <Image src={`/images/${recipe.imageURL}`} width={500} height={500} className={style.img} alt={recipe.slug}/>
      <p className={style.rate}>Értékelés: {recipe.rate}</p>
      <h2 className={style.titles}>Hozzávalók:</h2>
      <ul>
        {recipe.ingredients.map(x => <li key={x._id}>{capitalize(x.name)} - Mennyiség: {x.quantity}</li>)}
      </ul>
      <h2 className={style.titles}>Elkészítés:</h2>
      <ul>
        {recipe.steps.map(x => <li className={style.list_items} key={x._id}>{x.content}<span> Időtartam: {x.timer}</span></li>)}
      </ul>
    </div>
  );
}

export default RecipeDetails