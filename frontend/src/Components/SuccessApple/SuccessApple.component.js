// i wish i started this project in typescript >:(
export default function SuccessApple({ playlistUrl, tracks }) {
  return (
    <>
      <h1>Your playlist has been converted!</h1>
      <p>
        You can access the playlist <a href={playlistUrl}>here</a>.
      </p>
    </>
  )
}
