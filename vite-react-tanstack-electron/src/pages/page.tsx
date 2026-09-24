import { useState } from 'react';

const Home = () => {
  const [version, setVersion] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const readVersion = async () => {
    setLoading(true);
    setError(undefined);
    setVersion(undefined);
    try {
      setVersion(await window.electronAPI.app.getVersion());
    } catch {
      setError('Unable to read the app version. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Electron + React</h1>
      <button type="button" onClick={readVersion} disabled={loading}>
        {loading ? 'Reading…' : 'Read app version'}
      </button>
      <p role="status">{version ? `App version: ${version}` : ''}</p>
      {error && <p role="alert">{error}</p>}
    </main>
  );
};

export default Home;
