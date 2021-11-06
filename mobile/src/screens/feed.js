import React from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import Loading from '../components/Loading';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
	query notes {
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
`;

const Feed = props => {
	const { loading, error, data } = useQuery(GET_NOTES);

	if (loading) return <Loading />;
	if (error) return <Text>Ошибка загрузки статей</Text>;
	return <NoteFeed notes={data.notes} navigation={props.navigation} />;
}
Feed.navigationOption = {
	title: 'Главная'
};
export default Feed;