
const CHARACTER_ENDPOINT = process.env.REACT_APP_BASE_URL + "/ddcharacters";
const LOGIN_ENDPOINT = process.env.REACT_APP_BASE_URL + "/login";
const REGISTER_ENDPOINT = CHARACTER_ENDPOINT + "/users";


export async function registerUser(username, password) {
    const requestBody = {username, password};
    console.log("Called", REGISTER_ENDPOINT);
    const result = await fetch(REGISTER_ENDPOINT, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        });
    }

export async function getRegisteredUsers() {
    console.log("Called", REGISTER_ENDPOINT);
    const result = await fetch(REGISTER_ENDPOINT);
    return (await result.json()).data;
}


export async function createCharacter(char_name, class_id, race_id) {
    
    const requestBody = {char_name, class_id, race_id};
    console.log(requestBody);
    const result = await fetch( CHARACTER_ENDPOINT, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(requestBody)
    });

}
export async function getCharacter() {
    console.log("Called", CHARACTER_ENDPOINT);
    const result = await fetch(CHARACTER_ENDPOINT);
    return (await result.json()).data;
}

export async function getAllRaces() {
    console.log("Called", CHARACTER_ENDPOINT + "/races");
    const result = await fetch(CHARACTER_ENDPOINT + "/races");
    return (await result.json());
}

export async function getAllSpells() {
    console.log("Called", CHARACTER_ENDPOINT + "/spells");
    const result = await fetch(CHARACTER_ENDPOINT + "/spells");
    return (await result.json());
}

export async function getAllClasses() {
    console.log("Called", CHARACTER_ENDPOINT + "/classes");
    const result = await fetch(CHARACTER_ENDPOINT + "/classes");
    return (await result.json());
}

// login
export async function loginUser(username, password) {
    const requestBody = {username, password};
    console.log("Called", LOGIN_ENDPOINT);
    const result = await fetch(LOGIN_ENDPOINT,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        });
    return (await result.json()).data;
}


// const requestBody= {name, classId, raceId};
// fetch(url, {method: POST, body: JSON.stringify(requestBody)})
