import React from 'react'
import moment from 'moment'


const Job = ({company,createdAt}) => {

    let date = moment(createdAt)

    date = date.format('MMM Do, YYYY')

  return (
  <div>
    <h2>{company}</h2>
    <h3>{date}</h3>
    </div>
  )
}

export default Job