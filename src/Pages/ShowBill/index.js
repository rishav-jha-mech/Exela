import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

function ShowBill(props) {
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
            window.location.href= '/'
        }
    }, [])

    const fetchData = () => {
        fetch(`http://127.0.0.1:4000/bill/${props.match.params.id}`, {
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

    const deleteBill = () => {
        setLoading(true)
        fetch(`http://127.0.0.1:4000/bill/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                Swal.fire('Bill Deleted','','success').then(() =>{
                    window.location.href= '/'
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
                            <form>
                                <span className='d-block my-2'>Bill Date <span className="text-danger">*</span> </span>
                                <input className='form-control' type="datetime" name="date" placeholder='Enter Bill date' id="" value={data.bill_date} required />
                                <span className='d-block my-2'>Payment Date <span className="text-danger">*</span> </span>
                                <input className='form-control' type="datetime" name="date" placeholder='Enter payment date' id="" required value={data.paid_date} />
                                <span className='d-block my-2'>No of units <span className="text-danger">*</span> </span>
                                <input className='form-control' type="text" name="date" id="" placeholder='Enter no of units' value={data.units} required />
                                <span className='d-block my-2'>Amount <span className="text-danger">*</span> </span>
                                <input className='form-control' type="text" name="date" placeholder='enter amount' id="" value={data.amount} required />
                                <div className="row">
                                    <div className='col-6'>
                                        <button type='button' className='w-100 btn btn-lg mt-3 mb-1 btn-danger' onClick={() => {deleteBill()}}>Delete</button>
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