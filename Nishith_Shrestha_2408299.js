//Event handling on button click
document.querySelector("#searchBtn").addEventListener("click",()=>{
    retrieve(document.querySelector("#searchBar").value);
});
//event handling on enter
document.querySelector("#searchBar").addEventListener("keydown",event=>{
    if(event.key==="Enter"){
        retrieve(document.querySelector("#searchBar").value);
        
    }
}
)
//7days data details through popup
document.querySelector(".popup-close").addEventListener("click",()=>{
    document.querySelector(".popup-container").classList.remove("element-active");
})
document.querySelector(".popup-open").addEventListener("click",()=>{
    document.querySelector(".popup-container").classList.add("element-active");
})
//function to capitalize
function capitalize(str){
    myArr=str.split(" ");
    newArr=[];
    myArr.forEach(
        value=>{
            newArr.push(value[0].toUpperCase()+value.slice(1));
        }
    );
    return newArr.join(" ");
}
async function insertPhp(city){
    const response=await fetch(`create.php?cityName=${city}`,{
        method : "GET",
        mode: 'no-cors',
        headers: {'content-type': 'application/json'},
        type: "basic"
    });
    const data=await response.json();
    return data;
}
async function selectPhp(city){
    const date=new Date();
    const todayDate=String(date.getMonth()+1).padStart(2,"0")+"/"+String(date.getDate()).padStart(2,"0")+"/"+String(date.getFullYear());
    const response=await fetch(`select.php?cityName=${city}`,{
        method : "GET",
        mode: 'no-cors',
        headers: {},
        type: "basic"
    });
    let data=await response.json();
    data=data.reverse();

    if (data.length==0 || data[0]["datecreated"]!==todayDate){
        console.log("entered");
        const checkError=await insertPhp(city);
        if(checkError["error"]){
            return "error";
        }
        return selectPhp(city);
    }
    return data;
}
async function previousData(data,city){
    const container=document.querySelector(".popup-box");
    document.querySelector(".popup-box").innerHTML="";
    document.querySelector(".previous-city").textContent=capitalize(city);
    let loopTime=data.length<=8?data.length-1:7;
    if (data.length>1){
        for(i=1;i<=loopTime;i++){
            let div=document.createElement("div");
            div.classList.add("previous-data");
            let date=document.createElement("div");
            date.classList.add("previous-date");
            let icon=document.createElement("img");
            let description=document.createElement("div");
            description.classList.add("previous-description");
            let temp=document.createElement("div");
            temp.classList.add("previous-temp");
            let info=document.createElement("div");
            info.classList.add("previous-info");
            let speed=document.createElement("div");
            speed.classList.add("previous-speed");
            let humidity=document.createElement("div");
            humidity.classList.add("previous-humidity");
            let pressure=document.createElement("div");
            pressure.classList.add("previous-pressure");
            info.appendChild(speed);
            info.appendChild(humidity);
            info.appendChild(pressure);
            div.appendChild(date);
            div.appendChild(icon);
            div.appendChild(description);
            div.appendChild(temp);
            div.appendChild(info);
            date.textContent=data[i]['datecreated'];
            icon.src=`https://openweathermap.org/img/wn/${data[i]['icon']}@4x.png`;
            description.textContent=data[i]['description'];
            temp.textContent=String(Math.round(Number(data[i]['temp'])-273.15))+"°C"
            speed.textContent="S: "+String(data[i]['speed'])+"km/h";
            humidity.textContent="H: "+String(data[i]['humidity'])+"%";
            pressure.textContent="P: "+String(data[i]['pressure'])+"mbar";
            container.appendChild(div);
        }
        if(loopTime<7){
            for(i=0;i<7-loopTime;i++){
                let noData=document.createElement("div");
                noData.classList.add("no-data");
                noData.textContent="No data available";
                let div=document.createElement("div");
                div.classList.add("previous-data");
                div.appendChild(noData);
                container.appendChild(div);
            }
        }
    }
    else{
        for(i=0;i<7;i++){
            let noData=document.createElement("div");
            noData.classList.add("no-data");
            noData.textContent="No data available";
            let div=document.createElement("div");
            div.classList.add("previous-data");
            div.appendChild(noData);
            container.appendChild(div);
        }
    }
}
function setLocalStorage(city,data,thatDate){
    localStorage.clear();
    localStorage.setItem("city",city);
    localStorage.setItem(`date`,thatDate);
    localStorage.setItem("dataLength",data.length);
    for(i=0;i<data.length;i++){
        localStorage.setItem(`main${i}`,data[i].main);
        localStorage.setItem(`description${i}`,data[i].description);
        localStorage.setItem(`temp${i}`,data[i].temp);
        localStorage.setItem(`icon${i}`,data[i].icon);
        localStorage.setItem(`pressure${i}`,data[i].pressure);
        localStorage.setItem(`humidity${i}`,data[i].humidity);
        localStorage.setItem(`speed${i}`,data[i].speed);
        localStorage.setItem(`datecreated${i}`,data[i].datecreated);
    }
}
function getLocalStorage(checkCity){
    let city=localStorage.getItem("city");
    if(checkCity!=city){
        return ["","no offline data"];
    }
    let date=localStorage.getItem("date");
    let dataLength=localStorage.getItem("dataLength");
    let data=[]
    for(i=0;i<dataLength;i++){
        let tempObj={
            "main":localStorage.getItem(`main${i}`),
            "description":localStorage.getItem(`description${i}`),
            "temp":localStorage.getItem(`temp${i}`),
            "icon":localStorage.getItem(`icon${i}`),
            "pressure":localStorage.getItem(`pressure${i}`),
            "humidity":localStorage.getItem(`humidity${i}`),
            "speed":localStorage.getItem(`speed${i}`),
            "datecreated":localStorage.getItem(`datecreated${i}`)
        }
        data.push(tempObj);
    }
    console.log(date);
    return [date,data];
}
//main function
async function retrieve(city="London"){
    city=city.toLowerCase();
    let data=[];
    let currentDate="";
    if(navigator.onLine){
        data=await selectPhp(city);
        //manipulating the date 
        const d=new Date();
        const days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
        const months=["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];
        currentDate=`${days[d.getDay()]} | ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    else{
        [currentDate,data]=getLocalStorage(city);
        console.log(currentDate,data);
    }
    if(data=="no offline data"){
        document.querySelector(".errorCard").innerHTML=`<i class="material-icons">error</i>You are offline`;
        document.querySelector(".errorCard").classList.add("element-active");
        setTimeout(()=>{
            document.querySelector(".errorCard").classList.remove("element-active");
        },2000);
        document.querySelector("#searchBar").value="";
    }
    //checking if the input is correct or not
    else if(data!=="error"){
        previousData(data,city);
        document.querySelector(".time").textContent=currentDate;
        //DOM manipulate
        console.log(data["0"])
        switch(data[0]["main"].toLowerCase()){
            //manipulating background image as per the weather condition
            case "clear":
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1506599672497-d23721489135?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
                break;
            case "clouds":
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
                break;
            case "drizzle":
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1556485689-33e55ab56127?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
                break;
            case "mist":
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1482841628122-9080d44bb807?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
                break;
            case "rain":
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1562781105-c53c27ff6007?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
                break;
            case "snow":
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1516431883659-655d41c09bf9?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
                break;
            case "thunderstorm":
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
                break;
            default:
                document.body.style.backgroundImage=`url('https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
        
        }
        document.querySelector("#cityName").textContent=capitalize(city);
        document.querySelector(".weatherType").textContent=capitalize(data[0]['description']);
        //temparature manipulation
        document.querySelector(".weatherTemp").textContent=String(Math.round(Number(data[0]['temp'])-273.15))+"°C";
        //wind, pressure and humidity div manipualtion
        document.querySelector(".windSpeedValue").textContent=String(data[0]['speed'])+"km/h";
        document.querySelector(".humidityValue").textContent=String(data[0]['humidity'])+"%";
        document.querySelector(".pressureValue").textContent=String(data[0]['pressure'])+"mbar";
        //weather icon manipualtion
        document.querySelector("#main-icon").src=`https://openweathermap.org/img/wn/${data[0]['icon']}@4x.png`;
        setLocalStorage(city,data,currentDate);
    }
    else{
        document.querySelector(".errorCard").innerHTML=`<i class="material-icons">error</i>Invalid city Name`;
        document.querySelector(".errorCard").classList.add("element-active");
        setTimeout(()=>{
            document.querySelector(".errorCard").classList.remove("element-active");
        },2000);
        document.querySelector("#searchBar").value="";
    }   
}
navigator.onLine?retrieve():retrieve(localStorage.getItem("city"));