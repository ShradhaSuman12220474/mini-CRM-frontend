export function getToken(){
    const user = JSON.parse(localStorage.getItem('user-info'));
    return user.token;
}
