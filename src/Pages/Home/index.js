import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import ToDate from '../../Components/todate'
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';

const Home = () => {

	const [data, setData] = useState([])
	const [Loading, setLoading] = useState(true)
	const [Error, setError] = useState(false)

	const [Page, setPage] = useState(1)
	const [Sort, setSort] = useState(-1)
	const [SortType, setSortType] = useState('paid_date')

	const [Count, setCount] = useState(0)
	const [items, setItems] = useState([])

	useEffect(() => {
		loadData();
	}, [Loading, Error, Page, Sort, SortType])

	function loadData() {
		fetch(`http://127.0.0.1:4000?page=${Page}&sort=${Sort}&sort_type=${SortType}`, {
			method: 'GET',
		}).then(res => res.json())
			.then(res => {
				console.log(res);
				setCount(res.totalBills)
				let active = Page;
				let items = [];
				for (let number = 1; number <= ((res.totalBills / 9).toPrecision(1)); number++) {
					items.push(
						<Pagination.Item onClick={() => setPage(number)} key={number} active={number === active}>
							{number}
						</Pagination.Item>,
					);
				}
				setItems(items)

				setData(res.resultArray)
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

	const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]


	return (
		<div className='fullmh container'>
			<div className="row align-items-center">
				<h1 className='col-12 my-4 col-lg-8'>
					Exela Electricity Bill ({Count})
				</h1>
				<div className="col-12 my-3 col-lg-4 d-flex justify-content-end">
					<Link to={'/addBill'} className="btn btn-success">Add Bills</Link>
				</div>
			</div>
			<hr />
			<Dropdown className="mb-2">
				<Dropdown.Toggle variant="success" className="btn-md" id="dropdown-basic">
					{Sort == 1 && SortType == 'units' ? 'Unit Consumed Ascending' :
						Sort == -1 && SortType == 'units' ? 'Unit Consumed Descending' :
							Sort == 1 && SortType == 'amount' ? 'Amount Ascending' :
								Sort == -1 && SortType == 'amount' ? 'Amount Descending' :
									Sort == -1 && SortType == 'paid_date' ? 'Recent Paid Bills First' : 'Sort'}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item onClick={() => {
						setSort(1);
						setSortType('units');
					}}
						className={`${Sort == 1 && SortType == 'units' ? 'bg-primary text-white' : ''}`}

					>Unit Consumed Ascending</Dropdown.Item>
					<Dropdown.Item onClick={() => {
						setSort(-1);
						setSortType('units');
					}}
						className={`${Sort == -1 && SortType == 'units' ? 'bg-primary text-white' : ''}`}
					>

						Unit Consumed Descending
					</Dropdown.Item>
					<Dropdown.Item onClick={() => {
						setSort(1);
						setSortType('amount');
					}}
						className={`${Sort == 1 && SortType == 'amount' ? 'bg-primary text-white' : ''}`}

					>Amount Ascending</Dropdown.Item>
					<Dropdown.Item onClick={() => {
						setSort(-1);
						setSortType('amount');
					}}
						className={`${Sort == -1 && SortType == 'amount' ? 'bg-primary text-white' : ''}`}

					>Amount Descending</Dropdown.Item>
					<Dropdown.Item onClick={() => {
						setSort(-1);
						setSortType('paid_date');
					}}
						className={`${Sort == -1 && SortType == 'paid_date' ? 'bg-primary text-white' : ''}`}

					>Recent Paid Bills First</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			{
				Error ? <h1 className='my-5 text-center'>Error Occured while loading bills</h1>
					: Loading ?
						<div className='my-5 py-5 d-flex justify-content-center minh250 w-100'>
							<div className="spinner-border" role="status">
								<span className="visually-hidden d-block">Loading...</span>
							</div>
						</div>
						:

						data.length == 0 ? <h2 className="text-center my-5 py-5">NO BILLS ARE PRESENT</h2>
							:

							<div className='table-responsive'>
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
										{
											data.map((item, index) => {
												let bill_date = new Date(item.bill_date)
												return (
													<tr key={item._id}>
														<th scope="row">{index + 1}</th>
														<td> <Link style={{ textDecoration: 'none', color: 'black' }} to={`bill/${item._id}`}> {MONTHS[bill_date.getMonth()]}</Link></td>
														<td> <Link style={{ textDecoration: 'none', color: 'black' }} to={`bill/${item._id}`}> {bill_date.getFullYear()}</Link></td>
														<td> <Link style={{ textDecoration: 'none', color: 'black' }} to={`bill/${item._id}`}> {ToDate(bill_date)}</Link></td>
														<td> <Link style={{ textDecoration: 'none', color: 'black' }} to={`bill/${item._id}`}> {ToDate(item.paid_date)}</Link></td>
														<td> <Link style={{ textDecoration: 'none', color: 'black' }} to={`bill/${item._id}`}> {item.units}</Link></td>
														<td> <Link style={{ textDecoration: 'none', color: 'black' }} to={`bill/${item._id}`}> {item.amount}</Link></td>
													</tr>
												);
											})
										}
									</tbody>
								</table>
							</div>
			}
			<span className="text-center d-block fw-bold">No. of pages : {(Count / 9).toPrecision(1)}</span>
			<div className="d-flex py-4 justify-content-center align-items-center">
				<Pagination size="md">{items}</Pagination>
			</div>
		</div>
	)
}


export default Home