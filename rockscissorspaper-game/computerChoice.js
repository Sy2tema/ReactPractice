import RSPCoords from './RSPCoords';

const computerChoice = (imgCoord) => {
    return Object.entries(RSPCoords).find(function (value) {
        return value[1] === imgCoord;
    })[0];
};

export default computerChoice;