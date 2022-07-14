import React from 'react'

function AddBill() {
    return (
        <div className='d-flex row justify-content-center align-items-center w-100 fullmh'>
                <div className='col-12 col-lg-4 '>
                    <div className="card p-0 minh300">
                        <div className="card-header bg-primary">
                            <h4 className='text-center mb-0 py-1 text-white'>ADD A BILL</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <span className='d-block my-2'>Bill Date <span className="text-danger">*</span> </span>
                                <input className='form-control' type="datetime" name="date" id="" required />
                                <span className='d-block my-2'>Payment Date <span className="text-danger">*</span> </span>
                                <input className='form-control' type="datetime" name="date" id="" required />
                                <span className='d-block my-2'>No of units <span className="text-danger">*</span> </span>
                                <input className='form-control' type="text" name="date" id="" required />
                                <span className='d-block my-2'>Amount <span className="text-danger">*</span> </span>
                                <input className='form-control' type="text" name="date" id="" required />
                                <button className='btn btn-lg mt-3 mb-1 w-100 btn-primary'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AddBill