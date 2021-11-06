import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { SIGNUP_USER } from '../gql/mutation';

import UserForm from '../components/UserForm';

const SignUp = props => {
	useEffect(() => {
		document.title = 'Регистрация';
	});

const client = useApolloClient();

const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
		onCompleted: data => {
			localStorage.setItem('token', data.signUp);
			client.writeData({ data: { isLoggedIn: true } });
			props.history.push('/');
		}
	});


	return (
		<React.Fragment>
			<UserForm action={signUp} formType="signup" />
			{loading && <p>Загрузка</p>}
			{error & <p>Ошибка загрузки страницы</p>}
		</React.Fragment>
		);
};
export default SignUp;