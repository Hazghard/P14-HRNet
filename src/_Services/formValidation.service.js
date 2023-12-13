import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.required('First Name is required')
		.matches(/^[a-zA-Z]+$/, 'Invalid First Name'),
	lastName: Yup.string()
		.required('Last Name is required')
		.matches(/^[a-zA-Z]+$/, 'Invalid Last Name'),
	dateOfBirth: Yup.string()
		.required('Date of Birth is required'),
	startDate: Yup.string()
		.required('Start date is required'),
	street: Yup.string()
		.required('Street is required')
		.matches(/^[a-zA-Z0-9\s,'.-]+$/, 'Invalid Street Name'),
	city: Yup.string()
		.required('City is required')
		.matches(/^[a-zA-Z\s]+$/, 'Invalid City Name'),
	state: Yup.string()
		.notRequired(),
	zipCode: Yup.string()
		.required('Zip Code is required')
		.matches(/^[0-9]+$/, 'Invalid Zip Code'),
	department: Yup.string()
		.required('Department is required'),
});

export { validationSchema };
