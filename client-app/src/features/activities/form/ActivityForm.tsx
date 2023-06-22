import React, { ChangeEvent, useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit }: Props) {

    const initalStat = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initalStat);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Desc' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Cate' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' onClick={closeForm} type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
