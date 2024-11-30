const apiUrl = "https://accounts.spotify.com/api/token";

async function getToken(){
    try{
        const body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');
        body.append('client_id', '2e7fafdd319d4e6ab75a0e52eb3a475c');
        body.append('client_secret', '8cf10e346f364b28a6e44ec2ec171f06');
        const response = await fetch(apiUrl,{
            method:'POST',
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
            },
            body:body
        });
        const data = await response.json();
        if (data.access_token) {
            document.cookie =  `access_token=${data.access_token}; path=/; max-age=3600`;
            console.log(getCookie('access_token'))
            document.getElementById('container-text').textContent = 'Token gotten';
        } else {
            console.error("Error fetching token");
            document.getElementById("container-text").textContent = "Error fetching token";
        } 
    } catch(error){
        document.getElementById("container-text").textContent = "Error Getting Token"
    }
}

function getCookie(cookieName) {
    let cookieVal = decodeURI(document.cookie);
    let cookieArr = cookieVal.split(';');
    cookieName = cookieName+'='
    for(i=0; i < cookieArr.length;i++){
        let cookie = cookieArr[i].trim()
        if( cookie.substring(0,cookieName.length) === cookieName){
            return cookie.slice(cookieName.length)
        }
    }
    return ""
}

window.addEventListener("load",getToken);

