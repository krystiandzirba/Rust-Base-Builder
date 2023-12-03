interface ObjectListProps {
  type: string;
}

const ObjectList: React.FC<ObjectListProps> = ({ type }) => {
  const object_list = [
    { name: "twig_foundation_low", thumbnail: "", id: "FL0" },
    { name: "wooden_foundation_low", thumbnail: "", id: "FL1" },
    { name: "stone_foundation_low", thumbnail: "", id: "FL2" },
    { name: "metal_foundation_low", thumbnail: "", id: "FL3" },
    { name: "armored_foundation_low", thumbnail: "", id: "FL4" },

    { name: "twig_foundation_mid", thumbnail: "", id: "FM0" },
    { name: "wooden_foundation_mid", thumbnail: "", id: "FM1" },
    { name: "stone_foundation_mid", thumbnail: "", id: "FM2" },
    { name: "metal_foundation_mid", thumbnail: "", id: "FM3" },
    { name: "armored_foundation_mid", thumbnail: "", id: "FM4" },

    { name: "twig_foundation_high", thumbnail: "", id: "FH0" },
    { name: "wooden_foundation_high", thumbnail: "", id: "FH1" },
    { name: "stone_foundation_high", thumbnail: "", id: "FH2" },
    { name: "metal_foundation_high", thumbnail: "", id: "FH3" },
    { name: "armored_foundation_high", thumbnail: "", id: "FH4" },

    { name: "twig_wall", thumbnail: "", id: "W0" },
    { name: "wooden_wall", thumbnail: "", id: "W1" },
    { name: "stone_wall", thumbnail: "", id: "W2" },
    { name: "metal_wall", thumbnail: "", id: "W3" },
    { name: "armored_wall", thumbnail: "", id: "W4" },
  ];

  return (
    <div
      className={
        type === "edit" ? "objects_container objects_container_displayed" : "objects_container objects_container_hidden"
      }
    >
      <div className="object_list">
        {object_list.map((item) => (
          <div key={item.id} className="object">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectList;
