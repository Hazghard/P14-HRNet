import React, { useState } from 'react';
import { useTable, usePagination, useFilters } from 'react-table';
import { Link } from 'react-router-dom';

import { getSavedValues } from '@/_Services/localStorageGetDatas.service';
import { useUserListContext } from '@/Context/UsersListContext';

import './employees.css';

// Méthode permettant l'affichage des dates au format DD/MM/YYYY et non au format ISO
const formatDate = (dateString) => {
	const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const TextFilter = ({ column }) => {
	const { setFilter } = column;

	return (
		<input
		value={column.filterValue || ''}
		onChange={(e) => setFilter(e.target.value)}
		placeholder={`Search ${column.Header}`}
		/>
	);
};

const Employees = () => {
	const { userList } = useUserListContext();
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [filterText, setFilterText] = useState('');

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

	const data = React.useMemo(() => {
		// Appliquer le filtre global à toutes les colonnes
		return employees.filter((row) =>
		columns.some((column) =>
			String(row[column.accessor]).toLowerCase().includes(filterText.toLowerCase())
		)
		);
	}, [employees, filterText, columns]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		state: { pageIndex: statePageIndex, pageSize: statePageSize },
	} = useTable(
		{
		columns,
		data,
		initialState: { pageIndex, pageSize },
		manualPagination: true,
		},
		useFilters,
		usePagination
	);

	const handleChangePageSize = (e) => {
		setPageSize(Number(e.target.value));
		setPageIndex(0);
	};

	return (
		<main className="mainEmployees css-selector">
		<div className="mainEmployees-container">
			<h1>Current Employees</h1>
			<div className="tableOptionTool-Container">
				<select value={pageSize} onChange={handleChangePageSize}>
					{[10, 25, 50, 100].map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				<input
					type="text"
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					placeholder="Search..."
				/>
			</div>
			{data.length > 0 ? (
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
					{page.map((row) => {
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
			<div className="tableFooter-Container">
				<div>
					Showing {pageIndex * pageSize + 1} to {pageIndex * pageSize + page.length} of {data.length} entries
				</div>
				<div>
					<button onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
						{'<<'}
					</button>{' '}
					<button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
						{'<'}
					</button>{' '}
					<button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}>
						{'>'}
					</button>{' '}
					<button onClick={() => setPageIndex(Math.ceil(data.length / pageSize) - 1)} disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}>
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
