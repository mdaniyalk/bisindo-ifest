import { IoCameraReverse } from 'react-icons/io5';

export function CameraSwitcher({
  devices = [],
  selectedDeviceId,
  setSelectedDeviceId,
}) {
  const clickHandler = () => {
    if (devices.length <= 1) return;

    const idx = devices.findIndex(
      (device) => device?.deviceId === selectedDeviceId
    );

    let nextIdx = 0;
    if (idx < devices.length - 1) {
      nextIdx = idx + 1;
    }
    const nextDeviceId = devices[nextIdx]?.deviceId;

    setSelectedDeviceId(nextDeviceId);
  };

  return (
    <div
      role="button"
      onClick={clickHandler}
      className="inline-flex space-x-2 items-center px-6 py-2 rounded-full bg-grad-orange text-white shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-105 duration-150"
    >
      <span className="drop-shadow-md">Switch Camera</span>
      <IoCameraReverse className="h-6 w-6 drop-shadow-md" />
    </div>
  );
}
