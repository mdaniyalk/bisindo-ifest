import clsx from "clsx";

export function BubbleButton({ text, bgGreen, onClick, className }) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={clsx(
        "px-6 py-2 rounded-full font-medium text-white w-fit hover:-translate-y-[2px] hover:scale-105 duration-200",
        bgGreen ? "bg-grad-green" : "bg-grad-orange",
        className,
      )}
    >
      <span className="drop-shadow-md capitalize">{text}</span>
    </div>
  );
}
