import { jwtDecode } from 'jwt-decode';

export const jwtDecodeFunction =()=>{
    if(localStorage.getItem('token')){
        const decodedToken = jwtDecode(localStorage.getItem('token'));
        return decodedToken
    }
    else{
        console.log('Token not present');
        return null;
    }
}

export const SellerjwtDecodeFunction =()=>{
    if(localStorage.getItem('sellertoken')){
        const decodedToken = jwtDecode(localStorage.getItem('sellertoken'));
        return decodedToken
    }
    else{
        console.log('Token not present');
        return null;
    }
}