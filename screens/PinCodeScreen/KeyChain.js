import * as Keychain from "react-native-keychain";

// 데이터 저장
const setKeyChain = async (key, value) => {
    await Keychain.setInternetCredentials(key, key, value);
};

// 데이터 조회
const getKeyChain = async key => {
    const result = await Keychain.getInternetCredentials(key);
    return result.password;
};

export default {
    setKeyChain,
    getKeyChain
};
