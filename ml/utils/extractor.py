import numpy as np
import os
from tensorflow.keras.utils import to_categorical
from utils.detector import Detector
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Flatten, GRU
import cv2


class Extractor:
    def __init__(self, actions):
        self.mp_detect = Detector()
        self.actions = actions
        
    
    def keypoint_to_array(self, path, actions, num_video, num_frame):
        label_map = {label:num for num, label in enumerate(actions)}
        DATA_PATH = os.path.join(path) 
        sequences, labels = [], []
        for action in actions:
            for sequence in range(num_video):
                # window = []
                # for frame_num in range(num_frame):
                    
                    # res = np.load(os.path.join(DATA_PATH, action, str(sequence), "{}.npy".format(frame_num)))
                    # window.append(res)
                window = np.load(os.path.join(DATA_PATH, action, "{}.npy".format(str(sequence))))
                sequences.append(window)
                labels.append(label_map[action])
        X = np.array(sequences)
        y = to_categorical(labels).astype(int)
        return X, y
    
    def video_to_keypoint_main(self, path_video, path_target_folder, actions, frame_length, start, num_video):
        # TODO: This EXTRACT VIDEO TO KEYPOINT
        for action in actions:
            for sequence in range(start, num_video):
                videoframes = []
                # seq = sequence + 3 - 150
                cap = cv2.VideoCapture("{}/{}/{}.mp4".format(path_video, action, sequence))
                frame_width = int(cap.get(3))
                frame_height = int(cap.get(4))
                # is_portrait = True
                dim = (720, 720*frame_height/frame_width)
                if frame_width > frame_height:
                    # is_portrait = False
                    dim = (720*frame_width/frame_height, 720)
                with self.mp_detect.mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
                    for frame_num in range(frame_length):
                        if frame_num > 3:
                            # Read feed
                            ret, frame = cap.read()
                            b = cv2.resize(frame,dim,fx=0,fy=0, interpolation = cv2.INTER_CUBIC)
                            frame = b
                            # Make detections
                            image, results = self.mp_detect.mediapipe_detection(frame, holistic)

                            # Draw landmarks
                            # self.mp_detect.draw_styled_landmarks(image, results)
                            
                            keypoints = self.mp_detect.extract_keypoints(results)
                            # 
                            # npy_path = os.path.join(path_target_folder, action, str(sequence), str(frame_num-4))
                            # np.save(npy_path, keypoints)
                            videoframes.append(keypoints)

                        # Break gracefully
                        if cv2.waitKey(10) & 0xFF == ord('q'):
                            break
                videoframes_path = os.path.join(path_target_folder, action, str(sequence))                
                np.save(videoframes_path, videoframes)
                cap.release()
                cv2.destroyAllWindows()

    def frames_to_keypoint(self, frames, len_frame):
        #TODO: Create frames to keypoint detection from model (batch processing)
        keypoints = []
        predictions = []
        model = Sequential()
        model.add(LSTM(128, return_sequences=True, activation='relu', input_shape=(45,174)))
        model.add(Dropout(0.5))
        model.add(LSTM(128, return_sequences=True, activation='relu'))
        # model.add(LSTM(128, return_sequences=False, activation='relu'))
        model.add(Flatten())
        model.add(Dense(256, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(64, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(16, activation='softmax'))
        model.load_weights('model_6.h5')
        
        with self.mp_detect.mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
            for i in range(len_frame):
                image, results = self.mp_detect.mediapipe_detection(frames[i], holistic)
                keypoint = self.mp_detect.extract_keypoints(results)
                keypoints.append(keypoint)
                
                if len(keypoints) == 45:
                    res = model.predict(np.expand_dims(keypoints, axis=0))[0]
                    if len(predictions) > 0:
                        if predictions[len(predictions)-1] != self.actions[np.argmax(res)]:
                            predictions.append(self.actions[np.argmax(res)])
                            keypoints = keypoints[-43:]
                            i+=2
                            # print(res)
                        else:
                            i += 5
                            keypoints = keypoints[-40:]
                    else:
                        predictions.append(self.actions[np.argmax(res)])
                        keypoints = keypoints[-43:]
                        i+=2
        
        return predictions

