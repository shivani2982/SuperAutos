import React from 'react'

const Login = () => {
  return (
    <main className='Login'>
        <h1>Welcome to Super Autos</h1>
        <h1>LoginIn to confirm your Identity</h1>
        <form className="loginForm" onSubmit={onSubmit}>
            <label htmlFor='username'>Username: </label>
            <input 
                id='username'
                required
                type='Text'
                placeholder="Item Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
            />
        </form>
    </main>
  )
}

export default Login