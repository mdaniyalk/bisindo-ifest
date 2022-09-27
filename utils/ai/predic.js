import tf from "@tensorflow/tfjs";

let model;
(async function () {
  try {
    model = await tf.loadLayersModel("/ai/model.json");
  } catch (error) {
    alert(error);
  }
})();

export const predict = (input) => {
  if (!model) {
    alert("Model has not been loaded");
    return;
  }
  const result = model.predict(input);
  return result;
};
