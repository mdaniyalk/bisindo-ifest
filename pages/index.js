import { useCallback, useEffect, useState } from 'react';
import { Camera, CameraSwitcher } from '/components/elements/camera';
import DefaultLayout from '/components/layouts/DefaultLayout';

export default function Home() {
  const [selectedDeviceId, setSelectedDeviceId] = useState();
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'));
      if (devices?.length && !selectedDeviceId)
        setSelectedDeviceId(devices[0]?.deviceId);
    },
    [devices, selectedDeviceId]
  );

  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <DefaultLayout>
      <div className="container mx-auto bg-blue-200">
        {/* TODO: create camera selector and swithcer -> selector for web | switcher for mobile */}
        <CameraSwitcher
          devices={devices}
          selectedDeviceId={selectedDeviceId}
          setSelectedDeviceId={setSelectedDeviceId}
        />
        <Camera selectedDeviceId={selectedDeviceId} />
      </div>
    </DefaultLayout>
  );
}
