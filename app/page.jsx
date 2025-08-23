

import Image from 'next/image';
import styles from './styles/home.module.scss';
import Link from 'next/link';
import RecipeCard from './components/RecipeCard';
import { prisma } from '../lib/prisma';

export default async function Home() {


 



  const recipes = await prisma.recipe.findMany({})
 





  return (
    <div className={styles.home}>
      <div className={styles.img_container}>
        <Image
          className={styles.banner_img}
          src="/banner6.jpg"
          alt="Banner kép"    // Kép leírása
          width={2200}        // Kép szélessége pixelben
          height={400}        // Kép magassága pixelben
        />
        <div className={styles.text_wrapper}>
          <div className={styles.text_container}>
            <h1>Receptek</h1>
            <p>Főzz, kóstolj, alkoss!</p>
          </div>
        </div>
      </div>




      <div className={styles.content}>
        <div className={styles.main_container}>
          <h2 className={styles.main_title}>Legjobb receptek</h2>
          <div className={styles.card_container}>
            {recipes.slice(0, 6).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe}  />
            ))}
          </div>
        </div>



        <aside className={styles.aside}>

          {/* category section */}
          <div className={styles.category_container}>
            <h2>Kategóriák</h2>
            <ul>
              <li>
                <Link href="#" className={styles.links}>Csirke</Link>
              </li>
              <li>
                <Link href="#" className={styles.links}>Disznó</Link>
              </li>
              <li>
                <Link href="#" className={styles.links}>Zöldség</Link>
              </li>
              <li>
                <Link href="#" className={styles.links}>Desszert</Link>
              </li>
              <li>
                <Link href="#" className={styles.links}>Leves</Link>
              </li>
              <li>
                <Link href="#" className={styles.links}>Előétel</Link>
              </li>
              <li>
                <Link href="#" className={styles.links}>Egytál étel</Link>
              </li>
              <li>
                <Link href="#" className={styles.links}>Ital</Link>
              </li>
            </ul>
          </div>



          {/*  Search  */}
          <div className={styles.about_container}>
            <h2>Keresés</h2>
            <div className={styles.form_container}>
              <input type="text" placeholder='Kersés...' />
              <button className='btn-orange'>Keresés</button>
            </div>

          </div>

        </aside>

      </div>


      <div className={styles.subscribtion}>

        <h3>Iratkozz fel hírlevelünkre!</h3>
        <h4>
          Legyél naprakész a legújabb receptjeinkkel, konyhai tippekkel és inspiráló ötletekkel!
        </h4>


        <div className={styles.form_container}>
          <form action="" >
            <div className={styles.input_content}>
              <input className={styles.input} type="text" placeholder="Neved" />
              <input className={styles.input} type="text" placeholder="E-mail címed." />
              <button className={`${styles.subscribe_btn} btn-green-border`} >Feliratkozás!</button>
            </div>


            <label htmlFor="checkbox" className={styles.checkbox_container}>
              <input className={styles.checkbox} id="checkbox" type="checkbox" />
              <div className={styles.custom_checkbox}></div>
              A gombra kattintva elfogadom a személyes adataim kezelését az Adatvédelmi tájékoztatóban leírtaknak megfelelően.
            </label>

          </form>
        </div>


      </div>

    </div>
  );

}
