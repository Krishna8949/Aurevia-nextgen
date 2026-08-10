"use client";

import { forwardRef, type ReactNode } from "react";

/**
 * StoryStage — the FOUR persistent layers the entire experience paints into.
 *
 * One stage is pinned for the whole document (see page.tsx master timeline).
 * Chapters do not mount/unmount; instead the master timeline transforms the
 * contents of these layers in sequence.
 *
 * Layers, back to front:
 *   backdrop  — tonal colour that crossfades per chapter
 *   visual    — diagrams / shapes / networks / grids
 *   text      — huge display words + captions
 *   image     — large editorial imagery when needed
 */
type Props = {
  backdrop?: ReactNode;
  visual?: ReactNode;
  text?: ReactNode;
  image?: ReactNode;
};

export const StoryStage = forwardRef<HTMLDivElement, Props>(function StoryStage(
  { backdrop, visual, text, image },
  ref
) {
  return (
    <div className="story-stage" ref={ref} data-stage>
      <div className="layer backdrop-layer">{backdrop}</div>
      <div className="layer visual-layer">{visual}</div>
      <div className="layer text-layer">{text}</div>
      <div className="layer image-layer">{image}</div>
    </div>
  );
});