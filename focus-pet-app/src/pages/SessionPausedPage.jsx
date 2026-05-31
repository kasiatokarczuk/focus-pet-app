import Button from '../components/Button';
import Modal from '../components/Modal';

function SessionPausedPage({ onResume, task }) {
  return (
    <main className="session-page">
      <Modal title="Session Paused">
        <div className="session-pet" aria-hidden="true" />
        <p>{task.petName} is waiting for you to return to the flow state.</p>
        <Button onClick={onResume}>Resume Focus</Button>
      </Modal>
    </main>
  );
}

export default SessionPausedPage;
