import LevelNode from "./_components/level-node";
import levels from "./_data/levels";

const BranchMap = () => {
  const curRank = 5;

  return (
    <div className="pt-10">
      {levels && levels.map((level, idx) => (
        <LevelNode
          level={level}
          isLocked={level.rank > curRank}
          isCurrent={level.rank === curRank}
        />
      ))}
    </div>
  );
};

export default BranchMap;
