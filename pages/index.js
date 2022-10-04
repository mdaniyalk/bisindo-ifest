import { Holistic } from "@mediapipe/holistic";
import { Camera as MpCamera } from "@mediapipe/camera_utils";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import DefaultLayout from "/components/layouts/DefaultLayout";

function Home() {
  const videoRef = useRef();

  const [holistic, setHolistic] = useState();
  const [deviceIdx, setDeviceIdx] = useState();
  const [devices, setDevices] = useState([]);

  const [camera, setCamera] = useState();

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(({ kind }) => kind === "videoinput");
      if (videoDevices.length === 0) {
        alert("video input is not accessible!");
        return;
      }
      setDevices(videoDevices);

      const idx = Number(localStorage.getItem("deviceIdx")) || 0;
      if (idx < videoDevices.length) setDeviceIdx(idx);
    });
  }, []);

  useEffect(() => {
    if (holistic) holistic.close;
    const holistic = createHolistic();
    setHolistic(holistic);
  }, []);

  const createHolistic = () => {
    const hol = new Holistic({
      locateFile: (file) => {
        return `/holistic/${file}`;
      },
    });

    hol.setOptions({
      modelComplexity: 0.5,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    return hol;
  };

  useEffect(() => {
    (async function () {
      console.log(holistic);
      if (!holistic) return;
      if (!videoRef?.current?.video) return;

      holistic.onResults((results) => {
        console.log(results);
      });

      const camera = new MpCamera(videoRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: videoRef.current.video });
        },
      });
      // await camera.start();

      setCamera(camera);
    })();
  }, [holistic]);

  return (
    <DefaultLayout>
      <div>cam</div>
      <Webcam
        ref={videoRef}
        videoConstraints={{ deviceId: devices[deviceIdx]?.deviceId }}
        // TODO: create mirror controller
        mirrored={true}
        className="w-full"
      ></Webcam>
      <div
        role="button"
        onClick={() => {
          (async function () {
            // await camera.stop();
            // await holistic.close();

            // const hol = createHolistic();
            // setHolistic(hol);

            const n = devices.length;
            if (deviceIdx === n - 1) {
              localStorage.setItem("deviceIdx", "0");
              setDeviceIdx(0);
            } else {
              setDeviceIdx((idx) => {
                localStorage.setItem("deviceIdx", idx + 1 + "");
                return idx + 1;
              });
            }
            // await camera.start();
          })();
        }}
      >
        switch webcam
      </div>
    </DefaultLayout>
  );
}

export default Home;
