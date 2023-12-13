import React from 'react';
import { Field } from 'formik';

import DepartmentsList from '@/assets/Datas/Departments.json';

const DepartmentField = () => {
	return (
		<div className="form-row">
			<label htmlFor="department">Department</label>
			<Field
				component="select"
				id="department"
				name="department"
				multiple={false}
				className="departmentField"
			>
				<option value="">Select a department</option>
				{DepartmentsList.map((department, index) => (
					<option key={index} value={department}>
						{department}
					</option>
				))}
			</Field>
    	</div>
	);
};

export default DepartmentField;