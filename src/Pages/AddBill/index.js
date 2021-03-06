import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';
function AddBill() {

    const bill_date = useRef();
    const paid_date = useRef();
    const units = useRef();
    const amount = useRef();

    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(false)

    const formSubmitted = () => {
        setLoading(true);
        fetch(`https://exela-backend.herokuapp.com/`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "bill_date": bill_date.current.value,
                "paid_date": paid_date.current.value,
                "units": units.current.value,
                "amount": amount.current.value

            })
        }).then(res => res.json())
        .then(res => {
                setLoading(false)
                console.log(res);
                Swal.fire('Bill Added', '', 'success').then(() => {
                    window.location.href = '/'
                })
            }).catch(err => {
                setError(true);
                Swal.fire(
                    'Error',
                    `${err}`,
                    'error'
                )
            })
    }

    return (
        <div className='d-flex row justify-content-center align-items-center w-100 fullmh'>
            <div className='col-12 col-lg-4 '>
                <div className="card p-0 minh300">
                    <div className="card-header bg-primary">
                        <h4 className='text-center mb-0 py-1 text-white'>ADD A BILL</h4>
                    </div>
                    <div className="card-body">
                        {
                            Error ? <h1 className='my-5 text-center'>Error Occured while adding bill</h1>
                                : Loading ?
                                    <div className='my-5 py-5 d-flex justify-content-center minh250 w-100'>
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden d-block">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        formSubmitted()
                                        return false;
                                    }}>
                                        <span className='d-block my-2 fw-600'>Bill Date <span className="text-danger">*</span> </span>
                                        <input ref={bill_date} className='form-control' type="date" placeholder='Enter Bill Date' name="date" id="" required />
                                        <span className='d-block my-2 fw-600'>Payment Date <span className="text-danger">*</span> </span>
                                        <input ref={paid_date} className='form-control' type="date" placeholder='Enter Payment Date' name="date" id="" required />
                                        <span className='d-block my-2 fw-600'>No of units <span className="text-danger">*</span> </span>
                                        <input ref={units} className='form-control' type="number" placeholder='Enter no of units' name="date" id="" required />
                                        <span className='d-block my-2 fw-600'>Amount <span className="text-danger">*</span> </span>
                                        <input ref={amount} className='form-control' type="number" placeholder='Enter Amount' name="date" id="" required />
                                        <button className='btn btn-lg mt-3 mb-1 w-100 btn-success'>Submit</button>
                                    </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBill