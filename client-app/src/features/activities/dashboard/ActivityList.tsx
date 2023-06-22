import React, { SyntheticEvent, useState } from 'react'
import { Activity } from '../../../app/models/activity'
import { Segment, Item, Button, Label } from 'semantic-ui-react'
interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void
    deleteActivity: (id: string) => void
    submitting: boolean
}
export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {
    const [target, setTarget] = useState('')

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(a => {
                    return (
                        <Item key={a.id}>
                            <Item.Content>
                                <Item.Header as='a'> {a.title}</Item.Header>
                                <Item.Meta>{a.date}</Item.Meta>
                                <Item.Description>
                                    <div>{a.description}</div>
                                    <div>{a.city} , {a.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button floated='right' onClick={() => selectActivity(a.id)} content='View' color='blue' />
                                    <Button
                                        name={a.id}
                                        floated='right'
                                        loading={submitting && target===a.id}
                                        onClick={(e) => handleDeleteActivity(e, a.id)}
                                        content='Delete'
                                        color='red' />
                                    <Label basic content={a.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    )
}