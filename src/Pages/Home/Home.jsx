import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { validationSchema } from '@/_Services/formValidation.service';

import { SimpleReactModal, useModalShow } from "react-modal-package-openclassrooms-p14";

import { storeFormValues } from '@/_Services/localStorageSaveDatas.service';
import { useUserListContext } from '@/Context/UsersListContext';

import AddressField from '@/Components/AdressField/AdressField';
import DepartmentField from '@/Components/DepartmentField/DepartmentField';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './home.css';
import '@/assets/Style/jquery.datetimepicker.css';

const initialValues = {
	firstName: '',
	lastName: '',
	dateOfBirth: '',
	startDate: '',
	street: '',
	city: '',
	state: '',
	zipCode: '',
	department: '',
};

const Home = () => {
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const { userList, setUserListContext } = useUserListContext(); //Pour utiliser la version avec Context React

	const timeOut = 2500;
	const [isOpen, setIsOpen, openModal, closeModal] = useModalShow(timeOut);
	const content = 'Employee Created!';

	return (
		<main className="main css-selector">
			<div className="title">
				<h1>HRnet</h1>
			</div>
			<div className="container">
				<Link to="/employees">View Current Employees</Link>
				<h2>Create Employee</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						console.log('Form submitted with values:', values);
          				//storeFormValues(values); // Pour utiliser la version avec localStorage

						// Récupérer la liste existante à partir du contexte
        				const existingList = userList || [];
        				// Ajouter la nouvelle valeur à cette liste
        				const updatedList = [...existingList, values];
        				// Mettre à jour le contexte avec la nouvelle liste
        				setUserListContext(updatedList);

						// Modal Show
						openModal();
					}}
				>
					{({ values, setFieldValue, handleSubmit, errors, touched }) => (
						<>
							<Form>
								<div className="form-row">
									<label htmlFor="firstName">First Name</label>
									<Field type="text" id="firstName" name="firstName" className={errors.firstName && touched.firstName ? 'input-error' : null} />
									{errors.firstName && touched.firstName && <span className="error">{errors.firstName}</span>}
								</div>

								<div className="form-row">
									<label htmlFor="lastName">Last Name</label>
									<Field type="text" id="lastName" name="lastName" className={errors.lastName && touched.lastName ? 'input-error' : null} />
									{errors.lastName && touched.lastName && <span className="error">{errors.lastName}</span>}
								</div>

								<div className="form-row">
									<label htmlFor="dateOfBirth">Date of Birth</label>
									<DatePicker
										id="dateOfBirth"
										name="dateOfBirth"
										selected={dateOfBirth}
										onChange={(date) => {
											setFieldValue("dateOfBirth", date);
											setDateOfBirth(date);
										}}
									/>
									{errors.dateOfBirth && touched.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
								</div>

								<div className="form-row">
									<label htmlFor="startDate">Start Date</label>
									<DatePicker
										id="startDate"
										name="startDate"
										selected={startDate}
										onChange={(date) => {
											setFieldValue("startDate", date);
											setStartDate(date);
										}}
									/>
									{errors.startDate && touched.startDate && <span className="error">{errors.startDate}</span>}
								</div>

								<AddressField />
								<DepartmentField />

								<div className="formSubmitBtn-Container">
									<button type="submit" className="formSubmitBtn">Save</button>
								</div>
							</Form>
							<SimpleReactModal
								content={content}
								type="success"
								timeOut={2500}
								debugMode={false}
								isOpen={isOpen}
								openModal={openModal}
								closeModal={closeModal}
							/>
						</>
					)}
				</Formik>
			</div>
		</main>
	);
};

export default Home;
