import React from 'react'

const SearchItem = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search'>Search Item</label>
        <input 
            id='search'
            role='searchbox'
            placeholder='Search Item'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

    </form>
  )
}

export default SearchItem