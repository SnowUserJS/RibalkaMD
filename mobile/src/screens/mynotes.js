import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

const GET_MY_NOTES = gql`
	query me {
		me {
			id
			username
			notes {
				id
				createdAt
				content
				favoriteCount
				author {
					username
					id
					avatar
				}
			}
		}
	}
`;

const MyNotes = props => {
	const { loading, error, data } = useQuery(GET_MY_NOTES);
	if (loading) return <Loading />;
	if (error) return <Text>Ошибка загрузки моих заметок!</Text>;
	if (data.me.notes.length !== 0) {
		return <NoteFeed notes={data.me.notes} navigation={props.navigation} />;
	} else {
		return <Text>Заметок больше нет</Text>;
	}
};
MyNotes.navigationOptions = {
	title: 'Мои заметки'
	};
export default MyNotes;