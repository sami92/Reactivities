import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/Activities").then(response => {
      setActivities(response.data)
    })
  }, [])

  function handleSelectedActivity(id: string) {
    setselectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setselectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity()
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id ?
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, activity])
      setEditMode(false);
      setselectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(a=>a.id!==id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>

    </>
  );
}

export default App;
