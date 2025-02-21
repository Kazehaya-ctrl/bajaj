import express, { Request, Response } from "express"
import * as z from 'zod'
import cors from 'cors'

interface data {
    data: Array<string>
}

const dataSchema = z.object({
    "data": z.array(z.string())
})

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4001, () => {
    console.log("Server is running on port 4001")
})


app.get("/bfhl", (req: Request, res: Response) => {
    res.json({"operation_code" : 1})
})


app.post("/bfhl", (req: Request, res: Response) => {
    const reqData: data = req.body
    console.log(reqData)
    const validataData = dataSchema.safeParse(reqData)
    if (!validataData.success) {
        res.status(400).json({error: "Invalid data", is_success: false})
        return
    }

    const incomingData = validataData.data.data
    let numbers: Array<number> = []
    let strings: Array<string> = []
    let stringAsNumber: Array<number> = []
    incomingData.forEach((item) => {
        if (isNaN(Number(item))) {
            strings.push(item)
            console.log("String: ", item)
        } else {
            numbers.push(Number(item))
            console.log("Number: ", item)
        }
    })

    strings.forEach((data) => {
        stringAsNumber.push(data.charCodeAt(0))
    })

    const max = Math.max(...stringAsNumber)

    res.json({
        is_success: true,
        "numbers": numbers,
        "strings": strings,
        "user_id": "john_doe_17091999",  
        "email" : "john@xyz.com", 
        "roll_number": "ABCD123",
        "highest_alphabet": String.fromCharCode(max)
    })
})