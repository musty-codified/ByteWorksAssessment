import { Link } from 'react-router-dom'
import "./page404.css"

const Page404 = () => {
  
  return (
    <div className="not-found-container">
    <h1>
          <h1>Sorry, the page you were looking for was not found.</h1>
          <Link to="/" className="link-button">Return to Home</Link>
    </h1>
    </div>

  )
}

export default Page404