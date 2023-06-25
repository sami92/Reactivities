import React, { ChangeEvent, useEffect, useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Activity } from '../../../app/models/activity'
import LoadingComponent from '../../../app/layout/LoadingComponent'



export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const {  createActivity, updateActivity, loading, loadActivity, loadingInitail } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate()
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])


    function handleSubmit() {
        if(!activity.id){
            activity.id = ''
            createActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
        }
        else{
            updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInitail) return <LoadingComponent content='Loading Activity' />
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
                <Button as = {Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
