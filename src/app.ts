import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'
const app:Application = express()


 app.use(express.json())
 app.use(cors())


app.use("/api/v1/student",studentRoutes)
app.use('/api/v1/user',UserRoutes)

app.get('/', (req :Request, res:Response ) => {
  res.send('Hello World!')
})

export default app ;