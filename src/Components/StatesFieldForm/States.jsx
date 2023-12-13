import React from 'react';

import { Field } from 'formik';

import StatesList from '@/assets/Datas/States.json'

const States = () => {
	return (
		<div className="StatesField">
			<label htmlFor="state">State</label>
			<Field
				component="select"
				name="state"
				id="state"
				multiple={false}
			>
        	<option value="">Select a state</option>
        	{StatesList.map((state) => (
          		<option key={state.abbreviation} value={state.abbreviation}>
            			{state.name}
          		</option>
        	))}
			</Field>
		</div>
	);
};

export default States;