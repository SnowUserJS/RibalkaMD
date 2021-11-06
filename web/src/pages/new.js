import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

import NoteForm from '../components/NoteForm';

const NewNote = props => {
	useEffect(() => {
		document.title = 'Новая заметка';
	});
	
	const [data, { loading, error }] = useMutation(NEW_NOTE, {
		refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES}],
		onCompleted: data => {
			props.history.push(`note/${data.newNote.id}`);
		}
	});
	
	return (
		<React.Fragment>
			{loading && <p>Загрузка...</p>}
			{error && <p>Ошибка! документ не сохранен.</p>}
		 <NoteForm action={data} />
		</React.Fragment>
		);
};
export default NewNote;