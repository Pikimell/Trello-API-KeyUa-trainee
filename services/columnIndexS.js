import {getIndexes, pushIndexes, updateIndexes} from "../repositories/columnIndexR";

const getIndexesS = () => {
    return getIndexes();
};

const pushIndexesS = (params) => {
    return pushIndexes(params);
};

const updateIndexesS = (params) => {
    return updateIndexes(params);
};

export{
    getIndexesS,
    pushIndexesS,
    updateIndexesS
};