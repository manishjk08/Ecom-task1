import React, { useContext, useState } from 'react'
import { AuthContext, useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
        setError('')
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
        setError('')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (username.trim() && password.trim()) {
            login(username)
            navigate('/')
        } else {
            setError('Please enter both username and password')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            value={username} 
                            onChange={handleUsername}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            id="password" 
                            value={password}
                            onChange={handlePassword}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-2 px-4 bg-green-700 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
