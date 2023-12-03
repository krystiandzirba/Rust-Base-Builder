interface ObjectListProps {
  type: string;
}

const ObjectList: React.FC<ObjectListProps> = ({ type }) => {
  const object_list = [
    ["twig_foundation_low", "thumbnail", "FL0"],
    ["wooden_foundation_low", "thumbnail", "FL1"],
    ["stone_foundation_low", "thumbnail", "FL2"],
    ["metal_foundation_low", "thumbnail", "FL3"],
    ["armored_foundation_low", "thumbnail", "FL4"],

    ["twig_foundation_mid", "thumbnail", "FM0"],
    ["wooden_foundation_mid", "thumbnail", "FM1"],
    ["stone_foundation_mid", "thumbnail", "FM2"],
    ["metal_foundation_mid", "thumbnail", "FM3"],
    ["armored_foundation_mid", "thumbnail", "FM4"],

    ["twig_foundation_high", "thumbnail", "FH0"],
    ["wooden_foundation_high", "thumbnail", "FH1"],
    ["stone_foundation_high", "thumbnail", "FH2"],
    ["metal_foundation_high", "thumbnail", "FH3"],
    ["armored_foundation_high", "thumbnail", "FH4"],

    ["twig_wall", "thumbnail", "W0"],
    ["wooden_wall", "thumbnail", "W1"],
    ["stone_wall", "thumbnail", "W2"],
    ["metal_wall", "thumbnail", "W3"],
    ["armored_wall", "thumbnail", "W4"],
  ];

  return (
    <div
      className={
        type === "edit" ? "objects_container objects_container_displayed" : "objects_container objects_container_hidden"
      }
    >
      <div className="object_list">
        {object_list.map((item) => (
          <div className="object" key={item[2]}>
            {item[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectList;
