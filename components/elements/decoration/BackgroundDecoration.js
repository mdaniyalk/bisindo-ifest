/* eslint-disable @next/next/no-img-element */
export function BackgroundDecoration() {
  return (
    <div className="fixed w-full h-screen top-0 left-0 -z-10">
      {/* bottom left */}
      <img
        src="/decoration/1.svg"
        alt=""
        className="absolute h-[40%] bottom-[10%] left-[-20%] lg:h-[50vh] lg:bottom-[-10%] lg:left-[-2%]"
      />
      {/* bottom right */}
      <img
        src="/decoration/2.svg"
        alt=""
        className="absolute h-[50vh] bottom-[-20%] right-[-25%] lg:h-[40vh] lg:bottom-[-10%] lg:right-[5%]"
      />
      {/* top left */}
      <img
        src="/decoration/3.svg"
        alt=""
        className="absolute h-[30vh] top-[3%] left-[-5%] lg:h-[50vh] lg:top-[13%] lg:left-[-20%]"
      />
      {/* top right */}
      <img
        src="/decoration/4.svg"
        alt=""
        className="absolute h-[30vh] top-[30%] right-[-10%] lg:h-[40vh] lg:top-[7%] lg:right-[20%]"
      />
    </div>
  );
}
