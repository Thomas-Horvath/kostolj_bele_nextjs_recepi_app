'use client';

import styles from '../styles/recipeCard.module.scss';
import { FaStar, FaRegStar, FaStarHalfAlt, FaRegHeart, FaHeart } from "react-icons/fa";

import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '../context/FavoriteContext';


const RecipeCard = ({ recipe }) => {
    const imageUrl = `/images/${recipe.imageURL}`;
  
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(recipe.id);
//! TODO   console.log(favorites)  // ez még kell a kedvencek mentéséhez

    return (
        (<div className={styles.card}>

            <span className={styles.heart} onClick={() => toggleFavorite(recipe.id)}>
                {!isFavorite ? <FaRegHeart className={styles.svg} /> : <FaHeart className={`${styles.svg} ${styles.added_heart}`} />}
            </span>

            <div className={styles.img_container}>
                <Image src={imageUrl} alt={recipe.name} className={styles.image} width={400} height={200} />
            </div>
            <div className={styles.content_container}>
                <div className={styles.rate_container}>
                    <div className={styles.starsWrapper}>
                        <FaStar className={styles.star} />
                        <FaStar className={styles.star} />
                        <FaStar className={styles.star} />
                        <FaStarHalfAlt className={styles.star} />
                        <FaRegStar className={styles.star} />
                    </div>
                    <p>{recipe.rate.toFixed(1)}</p>

                </div>
                <h2 className={styles.title}>{recipe.name}</h2>
            </div>
            <Link href={`/receptek/${recipe.slug}`} className='btn-green'>Részletek</Link>
        </div>)
    );
};

export default RecipeCard;
