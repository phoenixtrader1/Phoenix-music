import { useState } from "react";
import TrackHistory from "./TrackHistory";
import MusicPlayer from "./MusicPlayer";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMusic = async () => {
    if (!prompt) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok) {
        setAudioSrc(`data:audio/wav;base64,${data.audio_base64}`);
        setHistory([{ prompt, audio_base64: data.audio_base64 }, ...history]);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError("Failed to generate music");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Phoenix Music Generator</h1>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your music..."
        />
        <button onClick={generateMusic} disabled={loading}>
          {loading ? "Generating..." : "Generate Music"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {audioSrc && <MusicPlayer audioSrc={audioSrc} />}
      <TrackHistory history={history} setAudioSrc={setAudioSrc} />
    </div>
  );
}
