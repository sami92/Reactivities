import { useEffect, useState } from 'react'
import { Segment, Button, Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Activity } from '../../../app/models/activity'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MySelectInput from '../../../app/common/form/MySelectInput'
import { categoryOptions } from '../../../app/common/options/categoryOptions'
import MyDateInput from '../../../app/common/form/MyDateInput'


export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitail } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate()
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Activity title is required'),
        description: Yup.string().required('Activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])


    function handleFormSubmit(activity: Activity) {
        if (!activity.id) {
            activity.id = ''
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value })
    // }

    if (loadingInitail) return <LoadingComponent content='Loading Activity' />
    return (
        <Segment clearing>
            <Header content='Activity Detais' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={2} placeholder='Desc' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Cate' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='yyyy/MM/dd h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />

                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='venue' name='venue' />
                        <Button disabled={isSubmitting || !isValid || !dirty}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})
