export default function MusicPlayer({ audioSrc }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <audio controls src={audioSrc}></audio>
      <br />
      <a href={audioSrc} download="music.wav">Download</a>
    </div>
  );
}
