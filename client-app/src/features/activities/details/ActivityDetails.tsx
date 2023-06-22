import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
interface Props {
    activity: Activity;
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void

}
export default function ActivityDetails({ activity, cancelSelectedActivity, openForm }: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' onClick={() => openForm(activity.id)} content='Edit' />
                    <Button basic color='grey' onClick={cancelSelectedActivity} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}