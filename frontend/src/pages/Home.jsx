import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user, isAdmin } = useAuth()

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to SkillNest</h1>
      <p className="text-xl text-gray-600 mb-8">
        Learn and Grow With Us.
      </p>
      
      <div className='flex items-center justify-center'>
        <h1 className='flex w-2/3 border h-90 rounded-2xl items-center justify-center bg-blue-200 text-3xl'>WE OFFER BEST COURSES</h1>
      </div>
        
    </div>
  )
}

export default Home