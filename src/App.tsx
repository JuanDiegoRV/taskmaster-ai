import { useState } from 'react'
import { AuthForm } from './components/AuthForm'
import { ProjectPicker } from './components/ProjectPicker'
import { TaskBoard } from './components/TaskBoard'
import { useAuth } from './hooks/useAuth'
import { useProjects } from './hooks/useProjects'
import './App.css'

function App() {
  const auth = useAuth()
  const projects = useProjects(auth.user?.id ?? null)
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const selectedProject = projects.data.find((project) => project.id === selectedProjectId) ?? projects.data[0] ?? null

  if (auth.loading && !auth.user) {
    return <main className="app-shell centered"><p className="muted">Comprobando sesión…</p></main>
  }

  if (!auth.user) {
    return (
      <main className="app-shell centered">
        <AuthForm loading={auth.loading} error={auth.error} onSubmit={auth.signIn} />
        {!auth.error && <p className="setup-note">Configura Supabase en `.env.local` para iniciar sesión.</p>}
      </main>
    )
  }

  return (
    <div className="app-shell dashboard-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">TaskMaster AI</p>
          <h1>Tu espacio de trabajo</h1>
        </div>
        <div className="session-controls">
          <span className="user-email">{auth.user.email}</span>
          <button className="ghost-button" type="button" onClick={() => void auth.signOut()}>Cerrar sesión</button>
        </div>
      </header>
      <div className="dashboard-grid">
        <ProjectPicker
          projects={projects.data}
          selectedProjectId={selectedProject?.id ?? ''}
          loading={projects.loading}
          error={projects.error}
          onSelect={setSelectedProjectId}
        />
        {selectedProject ? (
          <TaskBoard projectId={selectedProject.id} projectName={selectedProject.name} />
        ) : (
          <section className="task-board empty-board">
            <p className="eyebrow">Sin selección</p>
            <h2>Elige un proyecto</h2>
            <p className="muted">Selecciona un proyecto para consultar y gestionar sus tareas.</p>
          </section>
        )}
      </div>
    </div>
  )
}

export default App
