import React, { ChangeEvent, useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'



export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm,createActivity,updateActivity,loading } = activityStore;

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
        activity.id? updateActivity(activity): createActivity(activity);
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
                <Form.Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' onClick={closeForm} type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
