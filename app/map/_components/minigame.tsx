import { useRouter } from 'next/navigation';
import { SelectGameMethod } from '../helpers/selectgame';

type MiniGameAreaProps = {
    location: number[];
    radius: number;
    selectGame: SelectGameMethod;
    index: number;
};

const MiniGameArea: React.FC<MiniGameAreaProps> = ({ location, radius, selectGame, index }) => {
    const router = useRouter();

    const link = () => {
        const gamename = selectGame();
        router.push("/" + gamename);
    };

    return (
        <area
            id={`minigame${index}`}
            shape="circle"
            coords={`${location[0]},${location[1]},${radius}`}
            alt={`Mini Game ${index}`}
            onClick={link}
        />
    );
};

export default MiniGameArea;
