import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
	useEffect(() => {
		// Обновляем заголовок документа
		document.title = 'Мои заметки';
	});

	const { loading, error, data } = useQuery(GET_MY_NOTES);
	if (loading) return 'Загрузка';
	if (error) return `Ошибка! ${error.message}`;
	if (data.me.notes.length !== 0) {
		return <NoteFeed notes={data.me.notes} />;
	} else {
		return <p>У вас нет заметок</p>;
	}
};
export default MyNotes;