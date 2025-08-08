[![React][React.js]][React-url]
[![TypeScript][Typescript.com]][Typescript-url]
[![React-Router][React-router.com]][React-Router-url]
[![React-Query][React-query.com]][React-Query-url]

# Tamagotchi Reloaded

[![][product-screenshot]](https://tamagotchi-reloaded-jb.netlify.app/)

### Built With

React.js, TypeScript, React-Router, React-Query

The Rise of the Tamagotchi, or Tamagotchi Reloaded, is a pet database akin to a Tamagotchi virtual pet. It uses a React front-end with a C# back-end. It also uses the [Poke API](https://pokeapi.co/) for fetching Pokemon images if the user chooses a Pokemon name, or random Pokemon images if the user does not specify image URLs during creation. Users can also link any non-Pokemon images to their pets during pet creation.

**Link to backend code:** https://github.com/jbadge/TamagotchiAPI

**Link to project:** https://tamagotchi-reloaded-jb.netlify.app/

## Optimizations

A few things were tweaked to make this app run better and smoother.

First, a `PUT` method was added, allowing on-the-fly changes to pets, which was helpful for diagnostics. The app initially ran purely locally because getting the backend deployed and cooperating online was proving to be a real headache, so the frontend was configured to talk to my local backend. This local setup was great for testing before the backend was even deployed, and it even let a 7-year-old have her own database, which was a definite win!

To get this online properly, the C# backend was containerized. This was super important because deploying a C#/.NET backend alongside a Node.js frontend to a platform like Render without Docker would have been pretty much impossible. Now, it's happily deployed to Render, using Supabase hosting for the database.

For easier troubleshooting and database management, an admin secret was also implemented. This allows seeing the entire database without limitations, which is invaluable when hunting down bugs or just checking things out.

Since Render's free tier likes to spin down inactive apps, a small optimization was adding a ping mechanism. This keeps the backend awake, ensuring a smoother experience when visitors come by.

Finally, to make sure everyone has their own space, the Crypto interface generates a unique browser-based ID for each visitor. This ID gets sent from the frontend to the backend, so your pets stay _your_ pets. And as a simple bit of housekeeping, there's a monthly database reset to keep things clean and prevent it from getting too big.

## Lessons Learned

Building this full-stack app from scratch was a rewarding experience, a real learning and problem-solving journey, starting with the backend API. It was genuinely fascinating to see the straightforwardness of HTTP requests in action. And seeing the frontend, backend, and SQL queries working together for a fun, interactive pet database was super satisfying!

Initially, the app only ran locally, which worked for development. But getting the backend and database live online presented some interesting challenges. Outdated information and tricky deployment issues meant doing some real digging. After research and a little help from AI, the result was a robust, live backend and database.

Here are a few things that were learned along the way:

- **Navigating Free Tier Limits:** To keep the backend from "spinning down" on the free Render tier, a mechanism was implemented to actively "ping" it. This keeps it consistently active for a smoother user experience.
- **User-Specific Data Handling:** The Crypto interface was used to generate unique browser-based IDs for each visitor. This ID is sent from the frontend to the backend, enabling interaction with the database and their own created pets.
- **Database Maintenance:** A monthly reset is in place to keep the database from getting too cluttered, ensuring it stays clean and manageable.

These experiences really highlighted the importance of being resourceful and adaptable, especially when documentation isn't up to date or you're working with platform limitations.

## Endpoints

Please note, the API uses PUT instead of PATCH for updating.

### Request methods

| Method   | Description                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| `GET`    | Used to retrieve a single pet or all pets in the database.                      |
| `POST`   | Used when creating a new pet, or pet action: playtimes, feedings, or scoldings. |
| `PUT`    | Used to update pet (replaces all fields with new data), e.g. when pet dies      |
| `DELETE` | Used to delete a pet by id.                                                     |

### Examples

During pet creation, Birthday defaults to the current DateTime, Hunger Level defaults to 0 and Happiness Level defaults to 0. When a pet is updated, the API sets the LastInteractedWithDate to the current time. If LastInteractedWithDate is over three days old, IsDead will return true; otherwise, it will return false.

| Method   | URL                     | Description                                                                          |
| -------- | ----------------------- | ------------------------------------------------------------------------------------ |
| `GET`    | `/api/Pets `            | Retrieve all pets.                                                                   |
| `POST`   | `/api/Pets`             | Create a new pet.                                                                    |
| `GET`    | `/api/Pets/5`           | Retrieve pet #id                                                                     |
| `PUT`    | `/api/Pets/5`           | Update pet #5 to dead                                                                |
| `DELETE` | `/api/Pets/5`           | Delete pet #5.                                                                       |
| `POST`   | `/api/Pets/5/Playtimes` | Add a playtime to pet #5, adding 5 to Happiness and 3 to Hunger levels.              |
| `POST`   | `/api/Pets/5/Feedings`  | Add a feeding to pet #5, subtracting 5 from Hunger and adding 3 to Happiness levels. |
| `POST`   | `/api/Pets/5/Scoldings` | Add a scolding to post #5, subtracting 5 from Happiness level.                       |

The front-end adds two additional fields, spriteUrl and imageUrl. SpriteUrl holds the image to display on the Home screen with the list of pets. ImageUrl holds the image on the details page of the pet.

## Acknowledgements

- [My Awesome Project](https://github.com/alec-chernicki/portfolio-template/blob/master/README.md)
- [Best-README](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)
- [Img Shields](https://shields.io/)
- [How to write APIs](https://github.com/ml-archive/readme/blob/master/Documentation/how-to-write-apis.md)

[product-screenshot]: /images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[React-router.com]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-router-url]: https://reactrouter.com/
[React-query.com]: https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white
[React-query-url]: https://tanstack.com/query/v3
[Typescript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://typescriptlang.org
