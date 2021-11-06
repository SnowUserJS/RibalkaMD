import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { SIGNIN_USER } from '../gql/mutation';
import UserForm from '../components/UserForm';

const SignIn = props => {
	useEffect(() => {
		document.title = 'Вход';
	});

const client = useApolloClient();
const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
	onCompleted: data => {
		localStorage.setItem('token', data.signIn);
		client.writeData({ data: { isLoggedIn: true } });
		props.history.push('/');
	}
});
return (
	<React.Fragment>
		<UserForm action={signIn} formType="signIn" />
		{loading && <p>Загрузка</p>}
		{error && <p>Ошибка входа!</p>}
	</React.Fragment>
	);
};
export default SignIn;