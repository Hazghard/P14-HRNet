import React, { useState, createContext, useContext } from 'react';

export const UserListContext = createContext({
	userList: null,
	setUserListContext: (list) => {throw new Error('useUserListContext must be used within a UserListContextProvider');},
});

export const UserListContextProvider = ({ children }) => {
	const [userList, setUserList] = useState(null);

	const setUserListContext = (list) => {
		setUserList(list);
	};

	const contextValue = {
		userList,
		setUserListContext,
	};

	return (
		<UserListContext.Provider value={contextValue}>
			{children}
		</UserListContext.Provider>
	);
};

// Export du hook contexte avec generation d'erreur
export const useUserListContext = () => {
	const context = useContext(UserListContext);
	return context;
};