import React from 'react'
import { Activity } from '../../../app/models/activity'
import { Segment, Item, Button, Label } from 'semantic-ui-react'
interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void
    deleteActivity: (id: string) => void
}
export default function ActivityList({ activities, selectActivity,deleteActivity }: Props) {
    return (
        <Segment>
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
                                    <Button floated='right' onClick={() => deleteActivity(a.id)} content='Delete' color='red' />
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