/* eslint-disable @next/next/no-img-element */

export function GuideItem({ title, imageSrc, description }) {
  return (
    <div className="px-8 mx-auto">
      <h1 className="text-center text-xl font-bold">{title}</h1>
      <img
        src={imageSrc}
        alt={title}
        className="max-w-[400px] w-full max-h-[200px] mx-auto py-8"
      />
      <p
        className="text-center"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  );
}
