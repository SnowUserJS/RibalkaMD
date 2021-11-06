import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
	border: 1px solid #f5f4f0;
	max-width: 500px;
	padding: 1em;
	margin: 0 auto;
`;

const Form = styled.form`
	label,
	input {
		display: block;
		line-height: 2em;
	}
	input {
		width: 100%;
		margin-bottom: 1em;
	}
`;

const UserForm = props => {
	const [values, setValues] = useState();

	const onChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};
	return (
		<Wrapper>
			{props.formType === 'signup' ? <h2>Регистрация</h2> : <h2>Войти</h2>}
				<Form
				  onSubmit={event => {
					event.preventDefault();
					props.action({
						variables: {
							...values
						}
					});
				}}
				>
				{props.formType === 'signup' && (
					<React.Fragment>
						<label htmlFor="username">Имя пользователя</label>
						<input
						 required
						 type="text"
						 id="username"
						 name="username"
						 placeholder="Имя пользователя"
						 onChange={onChange}
						/>
					</React.Fragment>
					)}
						<label htmlFor="email">Email:</label>
						<input
						 required
						 type="email"
						 id="email"
						 name="email"
						 placeholder="Email"
						 onChange={onChange}
						/>
						<label htmlFor="password">Пароль:</label>
						<input
						 required
						 type="password"
						 id="password"
						 name="password"
						 placeholder="Пароль"
						 onChange={onChange}
						/>
						<Button type="submit">Зарегистрироваться</Button>
				</Form>
		</Wrapper>
		);
};
export default UserForm;