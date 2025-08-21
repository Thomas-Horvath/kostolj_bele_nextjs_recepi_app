
import styles from '../../styles/recipes.module.scss';
import RecipeCard from '../../components/RecipeCard';
import { prisma } from '../../../lib/prisma'



const Recipes = async () => {

  const recipes = await prisma.recipe.findMany({})






  return (
    <div className={`${styles.recipesContainer} section`}>
      <h1>Receptek</h1>



      <div className={styles.recipesGrid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe}/>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
