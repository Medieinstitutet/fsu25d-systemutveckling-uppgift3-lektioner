import { Request, Response } from "express"

export const getProducts = async (req:Request, res:Response) => {
    res.send([
        {"id": 1, "name": "shoe"},
        {"id": 2, "name": "hat"}
    ])
}