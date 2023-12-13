import React, { useEffect } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { RxCross2 } from 'react-icons/rx'

type TSearchBar =
  | {
      type: 'task'
      query: string
      setQuery: React.Dispatch<React.SetStateAction<string>>
    }
  | {
      type: 'todo'
      query: string
      setQuery: (query: string) => void
    }

const SearchBar: React.FC<TSearchBar> = ({ query, setQuery, type }) => {
  useEffect(() => {
    return () => {
      setQuery('')
    }
  }, [])
  const clearSearchBar = (e: any) => {
    e.preventDefault()
    setQuery('')
  }

  return (
    <div className="searchWrap">
      <input
        className="searchBar"
        type="text"
        value={query}
        placeholder={`Search ${type}`}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <button className="magnifier" onMouseDown={clearSearchBar}>
        {query ? (
          <RxCross2 size={'1.4em'} style={{ cursor: 'pointer' }} className="magnifierAlign" />
        ) : (
          <HiMagnifyingGlass size={'1.4em'} className="magnifierAlign" />
        )}
      </button>
    </div>
  )
}

export default SearchBar
