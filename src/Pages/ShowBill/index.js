import React, { useState, useEffect } from 'react'

function ShowBill(props) {
    const [error, setError] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        try {
            setId(props.match.params.id)
        } catch {
            setError(true);
        }
    }, [error, id])

    // console.log(JSON.stringify(props,null,4));
    return (
        <div className='d-flex row justify-content-center align-items-center w-100 fullmh'>
            <div className='col-12 col-lg-4 '>
                <div className="card p-0 minh300">
                    <div className="card-header bg-primary">
                        <h4 className='text-center mb-0 py-1 text-white'>BILL #{id}</h4>
                    </div>
                    <div className="card-body">
                        {error ? <h5 className='my-4 text-center'>Error Loading Bill</h5> :
                            <form>
                                <span className='d-block my-2'>Bill Date <span className="text-danger">*</span> </span>
                                <input className='form-control' type="datetime" name="date" placeholder='Enter Bill date' id="" required />
                                <span className='d-block my-2'>Payment Date <span className="text-danger">*</span> </span>
                                <input className='form-control' type="datetime" name="date" placeholder='Enter payment date' id="" required />
                                <span className='d-block my-2'>No of units <span className="text-danger">*</span> </span>
                                <input className='form-control' type="text" name="date" id="" placeholder='Enter no of units' required />
                                <span className='d-block my-2'>Amount <span className="text-danger">*</span> </span>
                                <input className='form-control' type="text" name="date" placeholder='enter amount' id="" required />
                                <div className="row">
                                    <div className='col-6'>
                                        <button className='w-100 btn btn-lg mt-3 mb-1 btn-danger'>Delete</button>
                                    </div>
                                    <div className='col-6'>
                                        <button className='w-100 btn btn-lg mt-3 mb-1 btn-success'>Update</button>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowBill