import React, { useEffect, useContext}from 'react'
import { dataContext } from '../../context/AuthContext'
import {NavLink, useSearchParams} from 'react-router-dom'


const RouteCalculation = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const originId = (searchParams.get("id"))
    const destinationId = (searchParams.get("id"))
    console.log(originId)
    console.log(destinationId)
    console.log(searchParams.toString())


    const {getOptimalRoute, routeDetail} = useContext(dataContext)

  
    const activeStyles ={
        fontWeight: "bold",
        textDecoration: "underline",
        color: "red"
      };

      const queryParams = `?originId=${originId}&destinationId=${destinationId}`;

      const handleCalculateRoute =async()=>{

        console.log("Calculate Route was clicked")
        setSearchParams({"id":1})       
        // await getOptimalRoute(queryParams)
    
      }

      useEffect(()=>{
        console.log("component is mounted");
        getOptimalRoute(queryParams)
    }, [])

  
    // console.log(routeDetail)
  return (
    <div>

   <h1>Optimal Route Calculation and cost of delivery go in here!</h1>
   <li><NavLink className= "nav-link text-dark" 
            to="#" onClick={handleCalculateRoute}
            style={({isActive})=> isActive ? activeStyles : null}
            >
              ROUTE CALCULATOR
              </NavLink>
            </li>
    </div>
  )
}

export default RouteCalculation