const { prisma } = require("../lib/prisma");
const bcrypt = require("bcrypt");
const recipesData = require('./recipes.json');

async function main() {
  // 1. Felhasználók létrehozása
  await prisma.step.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      {
        name: "Tamás",
        username: "Tamás",
        emailVerified: new Date(),
        email: "tomi@example.com",
        password: await bcrypt.hash("Password", 10),
      },
      {
        name: "Katinka",
        username: "Katinka",
        emailVerified: new Date(),
        email: "kate@example.com",
        password: await bcrypt.hash("Password", 10),
      },
    ],
  });

  // 2. Felhasználók lekérése a user id-khez
  const allUsers = await prisma.user.findMany();
  const tamas = allUsers.find(u => u.username === "Tamás");
  const katinka = allUsers.find(u => u.username === "Katinka");

  // 3. Receptek feltöltése váltakozó authorId-vel
  for (let i = 0; i < recipesData.length; i++) {
    const recipe = recipesData[i];
    const author = i % 2 === 0 ? tamas : katinka; // váltakozva

    const createdRecipe = await prisma.recipe.create({
      data: {
        name: recipe.name,
        slug: recipe.slug,
        imageURL: recipe.imageURL,
        rate: recipe.rate ?? 4.0,
        authorId: author.id,
        ingredients: {
          create: recipe.ingredients.map(ing => ({
            name: ing.name,
            quantity: ing.quantity,
            type: ing.type,
          })),
        },
        steps: {
          create: recipe.steps.map(step => ({
            content: step.content,
            timer: step.timer,
          })),
        },
      },
    });

    // 4. Kedvencek váltakozva
    const favoriteOwner = i % 2 === 0 ? katinka : tamas;
    await prisma.favorite.create({
      data: {
        userId: favoriteOwner.id,
        recipeId: createdRecipe.id,
      },
    });

    // 5. Rating-ek (mindkét user értékel)
    const usersForRating = [tamas, katinka];
    for (const user of usersForRating) {
      const randomScore = Math.floor(Math.random() * 5) + 1;
      await prisma.rating.create({
        data: {
          userId: user.id,
          recipeId: createdRecipe.id,
          score: randomScore,
        },
      });
    }
  }

  console.log("✅ Seed kész!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
