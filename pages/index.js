import { Holistic } from "@mediapipe/holistic";
import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";
import DefaultLayout from "/components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { extractKeypoints } from "/utils/ai/extractKeypoints";
import * as tf from "@tensorflow/tfjs";
import { SourcePicker } from "@mediapipe/control_utils";

const ACTIONS = [
  "halo",
  "nama",
  "aku",
  "perkenalkan",
  "r",
  "kami",
  "d",
  "a",
  "n",
  "i",
  "y",
  "l",
  "u",
  "g",
  "m",
  "NOTHING",
];

function HomeManual() {
  const router = useRouter();
  const videoRef = useRef();

  const [holistic, setHolistic] = useState();
  const [deviceIdx, setDeviceIdx] = useState();
  const [devices, setDevices] = useState([]);

  const [sequence, setSequnce] = useState([]);
  const [step, setStep] = useState(0);

  // load model and save to localstorage
  const [model, setModel] = useState();
  useEffect(() => {
    // TODO: set to environtment variable
    (async function () {
      let model = await tf.loadLayersModel("indexeddb://model");
      if (!model) {
        model = await tf.loadLayersModel("/ai/model.json");
        await model.save("indexeddb://model");
        console.info("model loaded from public");
      } else {
        console.info("model loaded from indexeddb");
      }
      setModel(model);
    })();
  }, []);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(({ kind }) => kind === "videoinput");
      if (videoDevices.length === 0) {
        alert("video input is not accessible!");
        return;
      }
      setDevices(videoDevices);
      // console.log(videoDevices);

      const idx = Number(localStorage.getItem("deviceIdx")) || 0;
      if (idx < videoDevices.length) setDeviceIdx(idx);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (holistic) holistic.close();
      const holistic = createHolistic();
      setHolistic(holistic);
    }, 2000);
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
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    return hol;
  };

  // Prediction
  useEffect(() => {
    (async function () {
      if (!holistic) return;
      if (!videoRef?.current?.video) return;

      holistic.onResults((results) => {
        setStep((s) => s + 1);
        // const s = sequence;
        setSequnce((s) => {
          if (s.length === 45) s.shift();
          const keypoints = extractKeypoints(results);
          return [...s, keypoints];
        });
      });
    })();
  }, [holistic, model, sequence, step]);

  useEffect(() => {
    // console.log("seq", sequence.length);
    if (!model || sequence.length !== 45) return;

    const restf = model.predict(tf.tensor([sequence]));
    const index = indexOfMax(Array.from(restf.dataSync()));
    console.log(ACTIONS[index]);
  }, [model, sequence]);

  const deviceId = useMemo(() => {
    return devices[deviceIdx]?.deviceId;
  }, [deviceIdx, devices]);

  // Mediapipe Sender
  useEffect(() => {
    if (!holistic) return;
    if (!videoRef.current.video) return;
    if (document.querySelectorAll(".control-panel-source-picker").length > 0)
      return;

    new SourcePicker({
      onFrame: async (image, size) => {
        // console.log(image);
        // console.log(1);
        await holistic.send({ image: image });
      },
    }).create(() => {}, {}, document.querySelector("#mediapipe-sender"));
  }, [holistic, deviceIdx]);

  const mediapipeSenderRef = useRef();
  // useEffect(() => {
  //   if (!deviceIdx) return;
  //   if (!mediapipeSenderRef.current) return;

  //   const interval = setInterval(() => {
  //     const list = document.querySelector(
  //       ".control-panel-source-picker .dropdown-options",
  //     )?.children;
  //     if (list) {
  //       list[deviceIdx].click();
  //       clearInterval(interval);
  //     }
  //   }, 500);
  // }, [deviceIdx]);

  return (
    <DefaultLayout>
      <div>cam</div>
      {/* <RenderIf when={deviceIdx}> */}
      <Webcam
        ref={videoRef}
        videoConstraints={{
          deviceId: deviceId,
          // frameRate: { ideal: 10, max: 15 },
        }}
        // TODO: create mirror controller
        mirrored={true}
        className="w-full"
      ></Webcam>
      {/* </RenderIf> */}
      <div>
        {deviceIdx} - {deviceId}
      </div>
      <div id="mediapipe-sender" className="" ref={mediapipeSenderRef}></div>

      <div id="target" onClick={() => alert("hiiiii")}>
        pppppppppp
      </div>
      <div
        role="button"
        onClick={() => {
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
          router.reload();
        }}
      >
        switch webcam
      </div>
    </DefaultLayout>
  );
}

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

export default HomeManual;
