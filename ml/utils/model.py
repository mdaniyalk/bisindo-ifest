# import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Flatten
from tensorflow.keras.callbacks import TensorBoard, Callback
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import multilabel_confusion_matrix, accuracy_score, classification_report

class trainingCallback(Callback):
  def on_epoch_end(self, epoch, logs={}):
    
    # Check accuracy
    # if(logs.get('categorical_accuracy') < 0.95  and logs.get('loss') < 0.35 and logs.get('val_loss') < 0.35):
    if((logs.get('categorical_accuracy') > 0.97) or (logs.get('categorical_accuracy') > 0.95  and logs.get('loss') > logs.get('val_loss'))):
      # Stop if threshold is met
      print("\nAccuracy grater than 0.95 so cancelling training!")
      self.model.stop_training = True


class Model:
    def __init__(self):
        self.model = Sequential()
        self.callbacks = trainingCallback()

    def dataset_split(self, x, y, size):
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=size, shuffle=True)
        return x_train, y_train, x_test, y_test

    def train_main(self, x, y, num_class, epochs, isreturn_sequences):
        x_train, y_train, x_val, y_val = self.dataset_split(x, y, 0.15)
        self.model.add(LSTM(128, return_sequences=True, activation='relu', input_shape=(45,174)))
        self.model.add(Dropout(0.5))
        # self.model.add(LSTM(128, return_sequences=True, activation='relu'))
        self.model.add(LSTM(128, return_sequences=isreturn_sequences, activation='relu'))
        # if(isreturn_sequences):
        #     self.model.add(Flatten())
        #     self.model.add(Dense(256, activation='relu'))
        self.model.add(Dropout(0.5))
        self.model.add(Dense(64, activation='relu'))
        self.model.add(Dropout(0.5))
        self.model.add(Dense(num_class, activation='softmax'))

        self.model.compile(optimizer=Adam(learning_rate=1e-4), loss='categorical_crossentropy', metrics=['categorical_accuracy'])
        model_train = self.model.fit(x_train, y_train, epochs=epochs, batch_size=64,validation_data=(x_val,y_val), callbacks=[self.callbacks])
        return model_train

    def train_main_custom(self, x, y, num_class, epochs, isreturn_sequences, iscustom_train):
        x_train, y_train, x_val, y_val = self.dataset_split(x, y, 0.15)
        self.model.add(LSTM(128, return_sequences=True, activation='relu', input_shape=(45,174)))
        self.model.add(Dropout(0.5))
        # self.model.add(LSTM(128, return_sequences=True, activation='relu'))
        self.model.add(LSTM(128, return_sequences=isreturn_sequences, activation='relu'))
        self.model.add(Dropout(0.5))
        self.model.add(Dense(64, activation='relu'))
        self.model.add(Dropout(0.5))
        self.model.add(Dense(num_class, activation='softmax'))

        self.model.compile(optimizer=Adam(learning_rate=1e-4), loss='categorical_crossentropy', metrics=['categorical_accuracy'])
        loss, val_loss, cat_accuracy = [], [], []
        self.model.compile(optimizer=Adam(learning_rate=1e-4), loss='categorical_crossentropy', metrics=['categorical_accuracy'])
        for _epochs in range(epochs):
            count = _epochs % 12
            if (count < 10 and (_epochs < 150 or (_epochs < 250 and _epochs > 200))):
                if (count < 4):
                    x_train__ = x_train_[0]
                    y_train__ = y_train_[0]
                elif (count < 8):
                    x_train__ = x_train_[1]
                    y_train__ = y_train_[1]
                elif (count < 10):
                    x_train__ = X_train_2
                    y_train__ = y_train_2
            else :
                x_train__ = X_train
                y_train__ = y_train
            model_train = self.model.fit(x_train__, y_train__, epochs=_epochs+1, batch_size=64,validation_data=(x_val,y_val),initial_epoch=_epochs)
            _loss = model_train.history['loss']
            _val_loss = model_train.history['val_loss']
            _cat_accuracy = model_train.history['categorical_accuracy']
            loss.append(_loss[len(_loss)-1])
            val_loss.append(_val_loss[len(_loss)-1])
            cat_accuracy.append(_cat_accuracy[len(_loss)-1])
            if (loss[len(loss)-1] < val_loss[len(loss)-1] and cat_accuracy[len(loss)-1] > 0.96):
                break

