import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';

export const parseJwt = async () => {
    let base64 = await AsyncStorage.getItem('userToken').split('.')[1];
    return jwtDecode(base64);
};