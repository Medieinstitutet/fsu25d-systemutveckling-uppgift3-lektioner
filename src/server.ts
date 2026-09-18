import express, { Request, Response } from "express";
import * as core from "express-serve-static-core";
import {z} from "zod";
import { getProducts } from "./router";
import DatabaseUsers from "./DatabaseUsers";

let app = express();

type SignUpFormData = {
    firstName: string,
    lastName: string
}

/*
app.get("/products", async (req, res) => {
    res.send([
        {"id": 1, "name": "shoe"},
        {"id": 2, "name": "hat"}
    ])
});
*/

app.get("/products", getProducts);

app.get("/", async (req:Request, res:Response) => {

    if(req.body) {
        let formData = (req.body as SignUpFormData);
        formData.firstName;
        formData.lastName;
    }

    res.json({"test": "test"});
});

app.post("/", async (req:Request, res) => {

    req.body.firstName.toLowerCase()

    res.json({"test": "test"});
});

type LoginRequestData = {
    email: string
    password: string
}

let isLoginRequestData = (potentialLoginRequestData:any): potentialLoginRequestData is LoginRequestData => {

    if(!potentialLoginRequestData) {
        return false;
    }
    
    if(potentialLoginRequestData.email && potentialLoginRequestData.password) {
        return true;
    }

    return false;
}

let logIn = (loginRequestData:LoginRequestData):boolean => {
    let email = loginRequestData.email.toLowerCase();
    return true;
}

let tryToLogIn = (loginRequestData:LoginRequestData|any):boolean => {
    if(isLoginRequestData(loginRequestData)) {
        return logIn(loginRequestData);
    }

    return false;
}

app.post("/api/auth/login", async (req, res) => {

    let result = tryToLogIn(req.body);
    
    res.json({"success": result});
});

console.log(tryToLogIn({"email": "me@example.com", "password": "123456"}));
console.log(tryToLogIn({"email": "me@example.com", "password": "123456", "rememberMe": true}));
console.log(tryToLogIn({"username": "me@example.com", "password": "123456"}));
console.log(tryToLogIn(null));



let RegisterRequestDataSchema = z.object({
    "email": z.string(),
    "password": z.string(),
    "age": z.number().min(0),
    "address": z.object({
        "street": z.string(),
        "city": z.string(),
        "postCode": z.string()
    })
})

type RegisterRequestData = z.infer<typeof RegisterRequestDataSchema>;

/*
type RegisterRequestData = LoginRequestData & {
    age: number,
    address: {
        street: string
        city: string
        postCode: string
    }
}
*/

app.post("/api/auth/register", async (req, res) => {

    let result = false;

    // 200 {"success": true}
    // 500 
    let body:RegisterRequestData = RegisterRequestDataSchema.parse(req.body);

    try {
        let body = RegisterRequestDataSchema.parse(req.body);
        result = true;
    }
    catch(theError) {
        //MENOTE: do nothing
    }

    {
        let result = RegisterRequestDataSchema.safeParse(req.body);

        if(result.success) {
            let body = result.data;
        }
    }

    // 200 {"success": true | false}
    res.json({"success": result});
});

app.listen(4001, () => {
    console.log("Started");
})


console.log("Hello world");

let firstName:string = "Mattias";
let firstName2 = "Mattias";
let id:number = 123;
let id2:BigInt = 234n;
let isOk:boolean = true;

let point:{x: number, y: number} = {x: 0, y: 0};

let myVariable:any = firstName2;

let testName:string|null = firstName2;
testName.toLowerCase();

type Calculate = (input1:number, input2:number) => number;

let add:Calculate = (input1, input2) => {
    return input1 + input2;
}

let multiply:Calculate = (input1, input2) => {
    return input1 * input2;
}

add(2, 4);

testName as string;
<string>testName;

type Point = {
    x: number
    y: number
}

let point2:Point = {x: 0, y: 0};

let addVector:(vector1:Point, vector2:Point) => Point = (vector1, vector2) => {
    return {x: add(vector1.x, vector2.x), y: add(vector1.y, vector2.y)};
}

addVector(point2, point2);

let calculateVector:(vector1:Point, vector2:Point, calculate:Calculate) => Point = (vector1, vector2, calculate) => {
    return {x: calculate(vector1.x, vector2.x), y: calculate(vector1.y, vector2.y)};
}

calculateVector(point2, point2, multiply);

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "HEAD" | "OPTIONS";

type UrlRequest = {
    url: string
    method?: RequestMethod
}

type PostUrlRequest = UrlRequest & {
    body?: any
}

type MyString = string;
type StringOrNull = string | null;
type ApiCallResponseData = string | null;

let getData = async (request:UrlRequest):Promise<ApiCallResponseData> => {

    let requestMethod:string = "GET";

    if(request.method) {
        requestMethod = request.method.toLowerCase();
    }
    
    //request.method?.toLowerCase();

    let response = await fetch(request.url, {
        method: request.method
    });
    let data = await response.text();
    if(data) {
        return data;
    }

    return null;
}

(async (method:RequestMethod) => {
    let requestData:PostUrlRequest = {
        "url": "https://example.com",
        "method": method,
        "body": {
            "test": "test"
        }
    };

    let data = await getData(requestData);
})("GET");

type ObjectName = string;

type Plant = {
    name: ObjectName
}

type Centimeter = number;

type Flower = Plant & {
    color: string,
    height: Centimeter
}

type Meter = number;

type Tree = Plant & {
    height: Meter
}

type Weed = Plant & {
    spreadRate:number
}

interface Animal {
    name: string
}

interface Dog extends Animal {
    color: string
}

type Person = {
    name: string
}

let testValue1:Flower = {"name": "Test 1", "color": "yellow", "height": 30};
let testValue2:Tree = {"name": "Test 2", "height": 3};
let testValue3:Flower = {"name": "Test 3", "color": "red", "height": 30};
let testValue4:Weed = {"name": "Test 4", "spreadRate": 0.9};
let testValue5:Person = {"name": "Test 5"};

let myGarden:Plant[] = [testValue5, testValue1, testValue2, {"name": "Test 3", "spreadRate": 0.9} as Weed];
myGarden.push(testValue3);
myGarden.push(testValue4);

let testValue6:Dog = {"name": "Test 6", "color": "brown"};

let myFamily:Animal[] = [testValue6, testValue5];





if(firstName === "Mattias") {
    firstName.toLocaleLowerCase();
}


type User = {
    id: number
}


let getUser = (idOrUsername:number|string|null) => {

    if(!idOrUsername) {
        return 0;
    }

    if(typeof idOrUsername === "string") {
        return Number.parseInt(idOrUsername);
    }
    
    idOrUsername.toFixed();

    return idOrUsername;
}


type Location = {
    x: number,
    y: number
}

let myLocation:Location = {x: 23, y: 57};

let stores:Location[] = [
    {x: 1, y: 44},
    {x: 56, y: 12},
    {x: 78, y: 56}
];

let distance = <T extends Location>(location1:T, location2:T):number => {
    return Math.sqrt(Math.pow(location1.x-location2.x, 2)+Math.pow(location1.y-location2.y, 2));
}

let charDistance = (char1:string, char2:string):number => {
    return Math.abs(char1.toLowerCase().charCodeAt(0)-char2.toLowerCase().charCodeAt(0));
}

type DistanceResult<T = Location> = {
    length: number,
    result: T
}

let findClosestDefault = <T extends Location = Location>(currentLocation:T, locations:T[]):DistanceResult<T> => {
    let bestLocation:T = locations[0];
    let bestLength = distance(currentLocation, bestLocation);

    for(let i = 1; i < locations.length; i++) { //MENOTE: first is set as default
        if(bestLength > distance(currentLocation, locations[i])) {
            bestLocation = locations[i];
            bestLength = distance(currentLocation, locations[i]);
        }
    }

    return {length: bestLength, result: bestLocation};
}

let findClosest = <T = Location>(currentLocation:T, locations:T[], calculateDistance:(location1:T, location2:T) => number):DistanceResult<T> => {
    let bestLocation:T = locations[0];
    let bestLength = calculateDistance(currentLocation, bestLocation);

    for(let i = 1; i < locations.length; i++) { //MENOTE: first is set as default
        if(bestLength > calculateDistance(currentLocation, locations[i])) {
            bestLocation = locations[i];
            bestLength = calculateDistance(currentLocation, locations[i]);
        }
    }

    return {length: bestLength, result: bestLocation};
}

let closestLocation = findClosest(myLocation, stores, distance);
closestLocation.length;
closestLocation.result.x;

let closetsChatacter = findClosest("F", ["S", "I", "D"], charDistance);
closestLocation.length;
closetsChatacter.result.toLowerCase()


/*
let findClosestCharacter = (currentLocation:string, locations:string[]):string => {
    let bestLocation = locations[0];

    for(let i = 1; i < locations.length; i++) { //MENOTE: first is set as default
        if(locations[i] < bestLocation) {
            bestLocation = locations[i];
        }
    }

    return bestLocation;
}
    */





type LinkedListNode<T extends Location, V = string> = {
    next: LinkedListNode<T> | null,
    data: {
        key: V,
        value: T
    }
}

let node:LinkedListNode<Location> = {next: null, data: {"key": "store1", "value": {x: 0, y: 1}}}

let node2:LinkedListNode<Location, number> = {next: null, data: {"key": 1, "value": {x: 0, y: 1}}}

node.next?.next?.next?.next?.next?.data?.value.x

type NamedLocations<T = Location> = {
    [key:string]:T
}

let namedStores:NamedLocations = {
    "location1": {x: 0, y: 1},
    "location2": {x: 0, y: 1},
    "location3": {x: 0, y: 1},
    "location4": {x: 0, y: 1},
}

let capialCities:NamedLocations<string> = {
    "sweden": "Stockholm",
    "norway": "Oslo",
}



type DatabaseUser = {
    id: number,
    email: string
}

let users:DatabaseUser[] = [
    {id: 1, email: "1@example.com"},
    {id: 2, email: "2@example.com"}
]

function getDatabaseUser(id:number):DatabaseUser|null;
function getDatabaseUser(email:string):DatabaseUser|null;
function getDatabaseUser(key:string, token:string):DatabaseUser|null;

function getDatabaseUser(idOrEmail:number|string, token?:string):DatabaseUser|null {

    if(typeof idOrEmail === "string") {
        if(token) {
            //METODO: implemnet this
        }
        else {
            for(let i = 0; i < users.length; i++) {
                let currentUser = users[i];
                if(currentUser.email === idOrEmail) {
                    return currentUser;
                }
            }
        }
    }
    else {
        for(let i = 0; i < users.length; i++) {
            let currentUser = users[i];
            if(currentUser.id === idOrEmail) {
                return currentUser;
            }
        }
    }
    
    return null;
} 

getDatabaseUser(1)
getDatabaseUser("email@example.com");

DatabaseUsers.getUser(1);


function getUser2(props:{id?: number, email?:string}) {

}

getUser2({email: "asdasd@example.com"})
