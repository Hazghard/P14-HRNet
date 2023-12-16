import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUserListContext } from '@/Context/UsersListContext';

import './employees.css';

// Méthode permettant l'affichage des dates au format DD/MM/YYYY et non au format ISO
const formatDate = (dateString) => {
	const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const Employees = () => {
	const { userList } = useUserListContext();
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [filterText, setFilterText] = useState('');

	const employees = userList || [];

	const columns = [
		{ Header: 'First Name', accessor: 'firstName' },
		{ Header: 'Last Name', accessor: 'lastName' },
		{
			Header: 'Start Date',
			accessor: 'startDate',
			Cell: ({ value }) => formatDate(value),
		},
		{ Header: 'Department', accessor: 'department' },
		{
			Header: 'Date of Birth',
			accessor: 'dateOfBirth',
			Cell: ({ value }) => formatDate(value),
		},
		{ Header: 'Street', accessor: 'street' },
		{ Header: 'City', accessor: 'city' },
		{ Header: 'State', accessor: 'state' },
		{ Header: 'Zip Code', accessor: 'zipCode' },
	];

	const filteredData = employees.filter((row) =>
		columns.some((column) =>
			String(row[column.accessor]).toLowerCase().includes(filterText.toLowerCase())
		)
	);

	const paginatedData = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

	return (
		<main className="mainEmployees css-selector">
			<div className="mainEmployees-container">
				<h1>Current Employees</h1>
				<div className="tableOptionTool-Container">
					<div className="entries-Container">
						<label>
							Show entries:
							<select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
								{[10, 25, 50, 100].map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</label>
					</div>
					<input
						type="text"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
						placeholder="Search..."
					/>
				</div>
				{filteredData.length > 0 ? (
					<table className="display">
						<thead>
							<tr>
								{columns.map((column) => (
									<th key={column.Header}>{column.Header}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{paginatedData.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{columns.map((column) => (
										<td key={column.Header}>
											{column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No employees available.</p>
				)}
				<div className="tableFooter-Container">
					<div>
						Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of {filteredData.length} entries
					</div>
					<div>
						<button onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
							{'<<'}
						</button>{' '}
						<button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
							{'<'}
						</button>{' '}
						<button
							onClick={() => setPageIndex(pageIndex + 1)}
							disabled={pageIndex >= Math.ceil(filteredData.length / pageSize) - 1}
						>
							{'>'}
						</button>{' '}
						<button
							onClick={() => setPageIndex(Math.ceil(filteredData.length / pageSize) - 1)}
							disabled={pageIndex >= Math.ceil(filteredData.length / pageSize) - 1}
						>
							{'>>'}
						</button>{' '}
					</div>
				</div>
				<Link to="/home">Home</Link>
			</div>
		</main>
	);
};

export default Employees;
