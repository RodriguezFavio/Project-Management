import { useState } from 'react';

import ProjectsSidebar from './components/ProjectsSidebar/ProjectsSidebar';
import NewProject from './components/NewProject/NewProject';
import NoProjectSelected from './components/NoProjectSelected/NoProjectSelected';
import SelectedProject from './components/SelectedProject/SelectedProject';

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTasks(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        text,
        projectId: prevState.selectedProjectId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTasks(id) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => ({ ...prevState, selectedProjectId: id }));
  }

  function handleStartAddProject() {
    setProjectState((prevState) => ({ ...prevState, selectedProjectId: null }));
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        id: projectId,
        ...projectData,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
      tasks: prevState.tasks.filter(
        (task) => task.projectId !== prevState.selectedProjectId
      ),
    }));
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const selectedTask = projectsState.tasks.filter(
    (task) => task.projectId === selectedProject.id
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTasks={handleAddTasks}
      onDeleteTasks={handleDeleteTasks}
      tasks={selectedTask}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  console.log(projectsState);

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
