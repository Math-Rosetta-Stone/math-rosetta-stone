import { useRouter } from 'next/navigation';
import { SelectGameMethod } from '../helpers/selectgame';

type MiniGameAreaProps = {
    location: { x: number, y: number };
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
        <circle
            cx={`${location.x}%`}
            cy={`${location.y}%`}
            r={`${radius}%`}
            fill="transparent"
            stroke="red"
            strokeWidth="0.5%"
            onClick={link}
            className='pointer-events-auto cursor-pointer'
        />
    );
};

export default MiniGameArea;
