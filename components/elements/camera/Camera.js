import { useCallback, useEffect, useMemo, useRef } from "react";
import Webcam from "react-webcam";
import {
  FACEMESH_TESSELATION,
  HAND_CONNECTIONS,
  Holistic,
  POSE_CONNECTIONS,
} from "@mediapipe/holistic";
import { Camera as MpCamera } from "@mediapipe/camera_utils";
import { drawConnectors } from "@mediapipe/drawing_utils";

export function Camera({ selectedDeviceId }) {
  const webcamRef = useRef();
  const canvasRef = useRef();

  // FIXME: sometimes, canvasCtx is undefined
  const canvasCtx = useMemo(() => {
    if (!canvasRef.current) return;
    return canvasRef.current.getContext("2d");
  }, [canvasRef]);

  // FIXME: drawCanvas does not work properly
  // FIXME: drawCanvas causing CameraSwitcher does not work properly
  const drawCanvas = useCallback(
    (results) => {
      console.log(results);
      console.log(canvasCtx);
      if (!canvasCtx || !canvasRef?.current) return;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, width, height);

      if (results.segmentationMask) {
        canvasCtx.drawImage(results.segmentationMask, 0, 0, width, height);
      }

      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.fillStyle = "#00FF00";
      canvasCtx.fillRect(0, 0, width, height);

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = "destination-atop";
      if (results.image) {
        canvasCtx.drawImage(results.image, 0, 0, width, height);
      }

      canvasCtx.globalCompositeOperation = "source-over";
      if (results.poseLandmarks) {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }

      if (results.faceLandmarks) {
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1,
        });
      }

      if (results.leftHandLandmarks) {
        drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
          color: "#CC0000",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, results.leftHandLandmarks, {
          color: "#00FF00",
          lineWidth: 2,
        });
      }

      if (results.rightHandLandmarks) {
        drawConnectors(
          canvasCtx,
          results.rightHandLandmarks,
          HAND_CONNECTIONS,
          {
            color: "#00CC00",
            lineWidth: 5,
          },
        );
        drawLandmarks(canvasCtx, results.rightHandLandmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }

      canvasCtx.restore();
    },
    [canvasCtx],
  );

  const onResults = useCallback(
    (results) => {
      // TODO: run the deep learning model
      console.log(results);
      // drawCanvas(results);
    },
    // [drawCanvas],
    [],
  );

  useEffect(() => {
    const holistic = new Holistic({
      // FIXME: sometimes, these files cannot be accessed
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
        // return `@mediapipe/holistic/${file}`;
      },
    });

    holistic.setOptions({
      modelComplexity: 0.5,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults(onResults);

    if (!webcamRef?.current) return;

    const camera = new MpCamera(webcamRef.current.video, {
      onFrame: async () => {
        await holistic.send({ image: webcamRef.current.video });
      },
    });
    camera.start();
  }, [onResults, selectedDeviceId]);

  return (
    <>
      <div className="w-full">
        {/* TODO: flip camera at selfie condition */}
        <Webcam
          ref={webcamRef}
          audio={false}
          videoConstraints={{ deviceId: selectedDeviceId }}
          className="w-full"
        />
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}
