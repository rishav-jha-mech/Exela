import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import ToDate from '../../Components/todate'

function ShowBill(props) {


    const bill_date = useRef();
    const paid_date = useRef();
    const units = useRef();
    const amount = useRef();

    const [id, setId] = useState()
    const [data, setData] = useState({
        "bill_date": null,
        "paid_date": null,
        "units": null,
        "amount": null,
    })
    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState(false)

    useEffect(() => {
        fetchData();
        try {
            setId(props.match.params.id)
        } catch {
            window.location.href = '/'
        }
    }, [])

    const fetchData = () => {
        setLoading(true)
        fetch(`https://exela-backend.herokuapp.com/bill/${props.match.params.id}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                setData(res.data)
                setLoading(false)
            }).catch(err => {
                setError(true);
                Swal.fire(
                    'Error',
                    `${err}`,
                    'error'
                )
            })
    }

    const updateBill = () => {
        setLoading(true);
        fetch(`https://exela-backend.herokuapp.com/bill/${props.match.params.id}`, {
            method: 'PUT',
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
            fetchData();
                console.log(res);
                Swal.fire('Bill Updated', '', 'success')
            }).catch(err => {
                setError(true);
                Swal.fire(
                    'Error',
                    `${err}`,
                    'error'
                )
            })
    }

    const deleteBill = () => {
        setLoading(true)
        fetch(`https://exela-backend.herokuapp.com/bill/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                Swal.fire('Bill Deleted', '', 'success').then(() => {
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
                        <h4 className='text-center mb-0 py-1 text-white'>EDIT BILL</h4>
                    </div>
                    <div className="card-body">
                        {Error ? <h5 className='my-4 text-center'>Error Loading Bill</h5> :

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                updateBill()
                                return false;
                            }}>
                                <span className='d-block my-2 fw-600'>Bill Date <span className="text-danger">*</span> (Currently: {ToDate(data.bill_date)})</span>
                                <input ref={bill_date} className='form-control' type="date" placeholder='Enter Bill Date' defaultValue={data.bill_date} required />
                                <span className='d-block my-2 fw-600'>Payment Date <span className="text-danger">*</span> (Currently: {ToDate(data.paid_date)})</span>
                                <input ref={paid_date} className='form-control' type="date" placeholder='Enter Payment Date' defaultValue={data.paid_date} required />
                                <span className='d-block my-2 fw-600'>No of units <span className="text-danger">*</span> </span>
                                <input ref={units} className='form-control' type="number" placeholder='Enter no of units' defaultValue={data.units} required />
                                <span className='d-block my-2 fw-600'>Amount <span className="text-danger">*</span> </span>
                                <input ref={amount} className='form-control' type="number" placeholder='Enter Amount' defaultValue={data.amount} required />
                                <div className="row">
                                    <div className='col-6'>
                                        <button type='button' className='w-100 btn btn-lg mt-3 mb-1 btn-danger' onClick={() => { deleteBill() }}>Delete</button>
                                    </div>
                                    <div className='col-6'>
                                        <button type='submit' className='w-100 btn btn-lg mt-3 mb-1 btn-success'>Update</button>
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