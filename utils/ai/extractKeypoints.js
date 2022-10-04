import nj from "numjs";

export const extractKeypoints = (mediapipeResult) => {
  const pose = extractPose(mediapipeResult);
  const leftHand = extractHand(mediapipeResult, "leftHandLandmarks");
  const rightHand = extractHand(mediapipeResult, "rightHandLandmarks");

  return [...pose, ...leftHand, ...rightHand];
};

const extractPose = (mediapipeResult) => {
  let _pose = nj.zeros([33, 4]);
  if (mediapipeResult.poseLandmarks) {
    const arrayResults = mediapipeResult.poseLandmarks.map((pose) => {
      return [pose.x, pose.y, pose.z, pose.visibility];
    });
    _pose = nj.array(arrayResults);
  }
  const __pose = _pose.slice([23], null);
  const pose = __pose.slice(11, null).flatten();
  return pose.tolist();
};

const extractHand = (mediapipeResult, landmarkName = "leftHandLandmarks") => {
  let hand = nj.zeros(21 * 3);
  if (mediapipeResult[landmarkName]) {
    const arrayResults = mediapipeResult[landmarkName].map((hand) => {
      return [hand.x, hand.y, hand.z];
    });
    hand = nj.array(arrayResults).flatten();
  }
  return hand.tolist();
};
