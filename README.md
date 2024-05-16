[![React][React.js]][React-url]
[![TypeScript][Typescript.com]][Typescript-url]
[![React-Router][React-router.com]][React-Router-url]
[![React-Query][React-query.com]][React-Query-url]

# Tamagotchi Reloaded

[![][product-screenshot]](https://tamagotchi-reloaded-jb.netlify.app/)

### Built With

React.js, TypeScript, React-Router, React-Query

The Rise of the Tamagotchi, or Tamagotchi Reloaded, is a pet database akin to a Tamagotchi virtual pet. It uses a React front-end with a C# back-end (currently not deployed). It also uses the [Poke API](https://pokeapi.co/) for fetching Pokemon images if the user chooses a Pokemon name, or random Pokemon images if the user does not specify image URLs during creation. Users can also link any non-Pokemon images to their pets during pet creation.

**Link to backend:** https://github.com/jbadge/TamagotchiAPI

**Link to static implementation of project:** https://tamagotchi-reloaded-jb.netlify.app/

## Optimizations

I added a PUT method in order to make on-the-fly changes to pets for diagnostic purposes. I also have (currently commented out) code in order to run on external devices within a LAN, both in the frontend and backend code. Not only did this help with testing, as I did not deploy the backend codebase, but also allowed my 7 year old to have her own database, resulting in a happy 7 year old.

## Lessons Learned

How to implement a full-stack application by building a backend API. After all was said and done, I was fascinated by the simplicity of the HTTP requests. Seeing it all come together after the frontend was built, with the SQL queries to the database resulting in a fun, interactive pet database, was very satisfying.

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
sfdjkhan

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
