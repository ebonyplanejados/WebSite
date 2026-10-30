"use client";
import { Icon } from "@/components/icon";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export function Gallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (active !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
  function move(delta: number) {
    setActive((n) => ((n ?? 0) + delta + images.length) % images.length);
  }
  return (
    <>
      <div className="gallery-grid">
        {images.map((im, i) => (
          <button
            key={im.src}
            className="gallery-item"
            onClick={() => setActive(i)}
            aria-label={`Ampliar: ${im.alt}`}
          >
            <Image
              src={im.src}
              alt={im.alt}
              width={1400}
              height={1000}
              sizes="(max-width: 760px) 100vw, 70vw"
            />
            <span aria-hidden="true">
              Ampliar <Icon direction="diagonal" />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Galeria de fotografias"
        onCancel={() => setActive(null)}
        onClose={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <button className="lightbox-close" onClick={() => setActive(null)}>
          Fechar{" "}
          <span aria-hidden="true">
            <Icon direction="close" />
          </span>
        </button>
        {active !== null && (
          <>
            <div className="lightbox-image">
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="lightbox-controls">
              <button onClick={() => move(-1)} aria-label="Fotografia anterior">
                <Icon direction="left" />
              </button>
              <p>
                {active + 1} / {images.length}
                <span>{images[active].alt}</span>
              </p>
              <button onClick={() => move(1)} aria-label="Próxima fotografia">
                <Icon direction="right" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
