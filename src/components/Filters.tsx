import * as React from 'react'
import { useAppDispatch } from '../redux/hooks'
import { changeFilter, FilterValuesType } from '../redux/slices/userSlice'

interface IFilters {
  filter: FilterValuesType
  todolistId: string
}

const Filters: React.FC<IFilters> = ({ filter, todolistId }) => {
  const filters: Array<FilterValuesType> = ['All', 'Completed', 'Active']
  const dispatch = useAppDispatch()

  const changeTodoFilter = (_id: string, filter: FilterValuesType) => {
    dispatch(changeFilter({ _id, filter }))
  }

  return (
    <div className="filters">
      {filters.map((f, index) => (
        <button
          key={index}
          className={`filter ${f === filter ? 'active' : ''}`}
          onClick={() => {
            changeTodoFilter(todolistId, f)
          }}>
          {f}
        </button>
      ))}
    </div>
  )
}

export default Filters
