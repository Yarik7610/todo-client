import React from 'react'
import { ITask } from '../../redux/slices/userSlice'
interface IModalShow {
  body: ITask
}

const ModalShow: React.FC<IModalShow> = ({ body }) => {
  const weekDay = body.date && new Date(body.date).toLocaleString('default', { weekday: 'long' })
  const month =
    body.date &&
    new Date(body.date).toLocaleString('default', {
      month: 'short'
    })
  const day = body.date && body.date.slice(8, 10)
  const year = body.date && body.date.slice(0, 4)

  return (
    <div className="showWrap">
      <div className="taskDate">
        {/* <div className="bgDimmer"></div> */}
        <div className="dateHl">
          {body.date ? (
            <>
              <span>{weekDay}</span>
              <span className="dayMonth">{`${month} ${day}`}</span>
            </>
          ) : (
            <span>No date yet</span>
          )}
        </div>
        {body.date && <div className="year">{year}</div>}
      </div>
      {/* <div className="divider"></div> */}
      <div className="show title">{body.title}</div>
      <div className="show description">
        <div className="subtitle">Description:</div>
        <p style={{ fontWeight: 'normal', margin: '10px 0px' }}>
          {body.description ? body.description : 'No description yet'}
        </p>
      </div>
      <div className="show images">
        <div className="subtitle">Images:</div>
        {body.images.length !== 0 ? (
          body.images.map((i, index) => (
            <img
              key={index}
              className="image"
              // @ts-ignore
              src={'http://localhost:3001/api/images/' + i}
              alt="image"
            />
          ))
        ) : (
          <p style={{ fontWeight: 'normal', margin: '10px 0px' }}>No images yet</p>
        )}
      </div>
    </div>
  )
}

export default ModalShow
