import React from 'react'

const Home = () => {
  
  return (
    <div className='fullmh container'>
      <h1 className='my-3'>Exela Electricity Bill</h1>
      <hr />
      {/* ThE TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sl. no</th>
            <th scope="col">Month</th>
            <th scope="col">Year</th>
            <th scope="col">Bill date</th>
            <th scope="col">Paid date</th>
            <th scope="col">Unit Consumed</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}


export default Home