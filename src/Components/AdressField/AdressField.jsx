// AddressField.js
import React from 'react';
import { Field } from 'formik';
import States from '@/Components/StatesFieldForm/States';

const AddressField = () => {
  return (
	<div className="form-row">
		<fieldset className="address">
		<legend>Address</legend>

		<label htmlFor="street">Street</label>
		<Field type="text" id="street" name="street" />

		<label htmlFor="city">City</label>
		<Field type="text" id="city" name="city" />

		<States />

		<label htmlFor="zipCode">Zip Code</label>
		<Field type="number" id="zipCode" name="zipCode" />
		</fieldset>
	</div>
  );
};

export default AddressField;