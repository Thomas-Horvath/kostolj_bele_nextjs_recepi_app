'use client';

import styles from '../styles/recipeCard.module.scss';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from './FavoriteButton';



const RecipeCard = ({ recipe }) => {
    const imageUrl = `/images/${recipe.imageURL}`;
  
   

    return (
        (<div className={styles.card}>

           <FavoriteButton recipeId={recipe.id} />

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
