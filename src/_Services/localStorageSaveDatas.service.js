// Fonction pour stocker les valeurs du formulaire dans le localStorage
export const storeFormValues = (values) => {
	try {
		// Récupérer les valeurs actuelles du localStorage
		const storedValues = JSON.parse(localStorage.getItem('formValues')) || [];

		// Ajouter les nouvelles valeurs du formulaire
		storedValues.push(values);

		// Mettre à jour le localStorage avec les nouvelles valeurs
		localStorage.setItem('formValues', JSON.stringify(storedValues));

		console.log('Form values stored successfully:', storedValues);
	} catch (error) {
		console.error('Error storing form values:', error);
	}
};