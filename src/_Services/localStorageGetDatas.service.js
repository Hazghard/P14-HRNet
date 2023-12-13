// Fonction pour récuperer les valeurs du formulaire depuis le localStorage
export const getSavedValues = () => {
	try {
		// Récupérer les valeurs actuelles du localStorage
		const storedValues = JSON.parse(localStorage.getItem('formValues')) || [];
		console.log('Form values retrieved successfully:', storedValues);

		return storedValues;
	} catch (error) {
		console.error('Error storing form values:', error);
	}
};