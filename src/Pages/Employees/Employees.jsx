import React from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

import { getSavedValues } from '@/_Services/localStorageGetDatas.service';
import { useUserListContext } from '@/Context/UsersListContext';

import './employees.css';

// Méthode permettant l'affiche des date au format DD/MM/YYYY et non au format ISO
const formatDate = (dateString) => {
	const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const Employees = () => {
	
	// Pour utiliser la version avec localStorage
	//const employees = getSavedValues();

	// Pour utiliser la version avec Context React
	const { userList } = useUserListContext();
	const employees = userList || [];

	const columns = React.useMemo(
		() => [
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
		],
		[]
	);

	const data = React.useMemo(() => employees, [employees]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data });

	return (
		<main className="mainEmployees css-selector">
			<div className="mainEmployees-container">
				<h1>Current Employees</h1>
				{employees.length > 0 ? (
					<table {...getTableProps()} className="display">
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th {...column.getHeaderProps()}>{column.render('Header')}</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<p>No employees available.</p>
				)}
				<Link to="/home">Home</Link>
			</div>
		</main>
	);
};

export default Employees;

