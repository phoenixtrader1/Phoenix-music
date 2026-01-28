export default function TrackHistory({ history, setAudioSrc }) {
  if (!history || history.length === 0) return null;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>History</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            <button onClick={() => setAudioSrc(`data:audio/wav;base64,${item.audio_base64}`)}>
              {item.prompt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
