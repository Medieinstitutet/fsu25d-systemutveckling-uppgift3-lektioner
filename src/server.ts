import express from "express";

let app = express();

type SignUpFormData = {
    firstName: string,
    lastName: string
}

app.get("/", async (req, res) => {

    if(req.body) {
        let formData = (req.body as SignUpFormData);
        formData.firstName;
        formData.lastName;
    }

    res.json({"test": "test"});
});

app.post("/", async (req, res) => {

    req.body.firstName.toLowerCase()

    res.json({"test": "test"});
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


type Plant = {
    name: string
}

type Flower = Plant & {
    color: string
}

interface Animal {
    name: string
}

interface Dog extends Animal {
    color: string
}








if(firstName === "Mattias") {
    firstName.toLocaleLowerCase();
}