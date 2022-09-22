import Webcam from "react-webcam";

// TODO: receive data stream
export function Camera({ selectedDeviceId }) {
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
  const userMediaHandler = (data) => {
    console.log(data);
    const track = data.getVideoTracks()[0];
    console.log(track);
    track.oncapturehandlechange = () => console.log("p");
  };

  return (
    <>
      <div className="w-full">
        <Webcam
          audio={false}
          videoConstraints={{ deviceId: selectedDeviceId }}
          className="w-full"
          onUserMedia={userMediaHandler}
        />
      </div>
    </>
  );
}
