import React from 'react';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { IS_LOGGED_IN } from '../gql/query';

import Layout from '../components/Layout';

import SignUp from './signup';
import SignIn from './signin';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';
import NewNote from './new';
import EditNote from './edit';

const Pages = () => {
	return (
		<Router>
			<Layout>
				<Route exact path="/" component={Home} />
				<PrivateRoute path="/mynotes" component={MyNotes} />
				<PrivateRoute path="/favorites" component={Favorites} />
				<Route path="/note/:id" component={Note} />
				<Route path="/signup" component={SignUp} />
				<Route path="/signin" component={SignIn} />
				<PrivateRoute path="/new" component={NewNote} />
				<PrivateRoute path="/edit/:id" component={EditNote} />
			</Layout>
		</Router>
		);
};
const PrivateRoute = ({ component: Component, ...rest }) => {
	const { loading, error, data } = useQuery(IS_LOGGED_IN);
	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка загрузки!</p>;
return (
		<Route
			{...rest}
				render={props =>
					data.isLoggedIn === true ? (
						<Component {...props} />
						) : (
						<Redirect
							to={{
								pathname: '/signin',
								state: { from: props.location }
							}}
							/>
							)
						}
					/>
				);
			};
export default Pages;