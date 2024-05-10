The Rise of the Tamagotchi, or Tamagotchi Reloaded, is a pet database akin to a Tamagotchi virtual pet. It uses a React front-end with a C# back-end (currently not deployed). It also uses the Poke API for fetching Pokemon images if the user chooses a Pokemon name, or random Pokemon images if the user does not specify image URLs during creation. Users can also link any non-Pokemon images to their pets during pet creation.

Deployed at: https://tamagotchi-reloaded-jb.netlify.app

    The database has a table named Pets.
        Uses a POCO called Pet with the following columns:
            Id (int - automatic primary key)
            Name (string)
            Birthday (DateTime)
            HungerLevel (int)
            HappinessLevel (int)

    Includes a table named Playtimes that has the following columns:
        Id (int - automatic primary key)
        When (DateTime)
        PetId (int - foreign key to Pet)

    Also includes a table named Feedings that has the following columns:
        Id (int - automatic primary key)
        When (DateTime)
        PetId (int - foreign key to Pet)

    Also includes a table named Scoldings that has the following columns:
        Id (int - automatic primary key)
        When (DateTime)
        PetId (int - foreign key to Pet)

The API has the following endpoints.

    GET /Pets returns all pets in your database.
    GET /Pets/{id} returns the pet with the corresponding id.
    POST /Pets creates a new pet. The controller ensures the following: Birthday defaults to the current DateTime, HungerLevel defaults to 0 and HappinessLevel defaults to 0.
    DELETE /Pets/{id}, deletes a pet from the database by Id
    POST /Pets/{id}/Playtimes finds the pet by id and add five to its happiness level and add three to its hunger level. It also creates a new Playtime for this pet and the current time.
    POST /Pets/{id}/Feedings finds the pet by id and subtract five from its hunger level and add three to its happiness level. It also creates a new Feeding for this pet and the current time.
    POST /Pets/{id}/Scoldings finds the pet by id and subtract five from its happiness level. It also creates a new Scolding for this pet and the current time.


    There are two additional columns, LastInteractedWithDate (DateTime) and IsDead (boolean). When a pet is updated, the API sets the LastInteractedWithDate to the current time. If LastInteractedWithDate is over three days old, IsDead will return true; otherwise, it will return false.
    GET /Pets only returns Pets that are alive.
