import { useState } from "react";
import { Perk as TypePerk } from "../../types/perk";

export default function Perk({
  perk,
  hideName = false,
}: {
  perk: TypePerk;
  hideName?: boolean;
}) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <li
      className="relative"
      onMouseOver={() => {
        setShowDescription(true);
      }}
      onMouseOut={() => {
        setShowDescription(false);
      }}
    >
      {showDescription && (
        <div className="absolute z-10 pointer-events-none min-w-[500px] bg-[color-mix(in_srgb,black,transparent_20%)] shadow-[0_15px_10px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]">
          <div className="bg-[#6f4380] pt-5 pb-3 px-5">
            <h4 className="text-2xl font-bold">{perk.name.toUpperCase()}</h4>
            <span className="opacity-80">
              {perk.survivorName.toUpperCase()}
            </span>
          </div>
          <div
            className="pt-5 pb-2 px-5 perkDescription"
            dangerouslySetInnerHTML={{ __html: perk.description }}
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-2 p-2">
        <img
          draggable="false"
          width={256}
          height={256}
          src={`/images/survivorPerks/${perk.image}`}
          alt={perk.name}
        />
        {!hideName && (
          <strong className="text-s text-center">{perk.name}</strong>
        )}
      </div>
    </li>
  );
}
