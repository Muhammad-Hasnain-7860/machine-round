import { createBrowserRouter, RouterProvider } from "react-router"
import AppLayout from "../layout/AppLayout"
import AddQuestion from "../../features/Question/ui/components/AddQuestion"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { questionUpdate } from "../../features/Question/state/questionState"
import Dashboard from "../../features/Dashboard/ui/components/Dashbaord"
import Questions from "../../features/Dashboard/ui/components/Questions"
import Pending from "../../features/Dashboard/ui/components/Pending"

const AppRouter = () => {
   const dispatch = useDispatch()
    useEffect(()=>{
       const questions = JSON.parse(localStorage.getItem('questions')) || []

        if(questions.length !== 0){
            dispatch(questionUpdate(questions))
        }

    },[])

    const router = createBrowserRouter([
        {
            path : '/',
            element : <AppLayout />,
            children : [
                {
                    path : 'add-question',
                    element : <AddQuestion />
                },
                {
                    path : '',
                    element : <Dashboard />
                },
                {
                    path : 'questions',
                    element : <Questions />
                },
                {
                    path : 'pending',
                    element : <Pending />
                }
            ]
        }
    ])

  return (
    <>
    <RouterProvider router={router}/>
    <Toaster />
    </>
  )
}

export default AppRouter
