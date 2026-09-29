import { useRef, useState } from "react";

/* Every image dropped into src/assets/galerie/ (any subfolder) shows up here,
 * newest folder first. No code change needed to add photos. */
const files = import.meta.glob("../assets/galerie/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const photos = Object.entries(files)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([path, src]) => ({ path, src }));

type PhotoWallProps = { alt: string; closeLabel: string };

export default function PhotoWall({ alt, closeLabel }: PhotoWallProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<string>();

  const show = (src: string) => {
    setOpen(src);
    dialog.current?.showModal();
  };

  return (
    <>
      <ul className="photo-wall">
        {photos.map((photo, index) => (
          <li key={photo.path} style={{ "--tilt": `${[-1.6, 1.2, -0.6, 1.8, -1.2, 0.8][index % 6]}deg` } as React.CSSProperties}>
            <button type="button" onClick={() => show(photo.src)}>
              <img src={photo.src} alt={`${alt} ${index + 1}`} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        className="photo-dialog"
        onClick={() => dialog.current?.close()}
        onClose={() => setOpen(undefined)}
      >
        {open && <img src={open} alt="" />}
        <button type="button" aria-label={closeLabel}>
          ×
        </button>
      </dialog>
    </>
  );
}
