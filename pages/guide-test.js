import { useState } from "react";
import { BubbleButton } from "/components/elements/button";
import DefaultLayout from "/components/layouts/DefaultLayout";
import Guide from "/components/templates/guide/Guide";

function GuideTest() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  return (
    <DefaultLayout title="Guide test">
      <div className="relative">
        <BubbleButton text="show guide" onClick={() => setIsGuideOpen(true)} />
        <Guide isOpen={isGuideOpen} setIsOpen={setIsGuideOpen} />
      </div>
    </DefaultLayout>
  );
}

export default GuideTest;
