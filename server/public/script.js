var jsonData;

async function getData() {
    const response = await fetch("http://localhost:3000/api");
    const data = await response.json();
    return data;
}

getData()
    .then((data) => {
        jsonData = data;

        document.getElementById("intersportLink").href = `${jsonData["urls"]["intersport"]}`;
        for(var i = 0; i < jsonData["intersport"].length; i++){
            document.getElementById("intersport-div").innerHTML += `
            <div class="grid-grid-div">
                <h2 class="title">${jsonData["intersport"][i]["title"]}</h2>
                <h2 class="price">${jsonData["intersport"][i]["price"]}</h2>
                <img class="product-img" src=${jsonData["intersport"][i]["img"]}>
            </div>
        `;
        }

        document.getElementById("eleventeamsportLink").href = `${jsonData["urls"]["eleventeamsport"]}`
        for(var i = 0; i < jsonData["eleventeamsport"].length; i++){
            document.getElementById("eleventeamsport-div").innerHTML += `
            <div class="grid-grid-div">
                <h2 class="title">${jsonData["eleventeamsport"][i]["title"]} <span class="sizes">(${jsonData["eleventeamsport"][i]["sizes"]})</span></h2>
                <h2 class="price">${jsonData["eleventeamsport"][i]["price"]}</h2>
                <img class="product-img" src=${jsonData["eleventeamsport"][i]["img"]}>
            </div>
        `;
        }

        document.getElementById("sportsdirectLink").href = `${jsonData["urls"]["sportsdirect"]}`
        for(var i = 0; i < jsonData["sportsdirect"].length; i++){
            document.getElementById("sportsdirect-div").innerHTML += `
            <div class="grid-grid-div">
                <h2 class="title">${jsonData["sportsdirect"][i]["title"]} <span class="sizes">(${jsonData["sportsdirect"][i]["sizes"]})</span></h2>
                <h2 class="price">${jsonData["sportsdirect"][i]["price"]}</h2>
                <img class="product-img" src=${jsonData["sportsdirect"][i]["img"]}>
            </div>
        `;
        }

        document.getElementById("sportvisionLink").href = `${jsonData["urls"]["sportvision"]}`
        for(var i = 0; i < jsonData["sportvision"].length; i++){
            document.getElementById("sportvision-div").innerHTML += `
            <div class="grid-grid-div">
                <h2 class="title">${jsonData["sportvision"][i]["title"]}</h2>
                <h2 class="price">${jsonData["sportvision"][i]["price"]}</h2>
                <img class="product-img" src=${jsonData["sportvision"][i]["img"]}>
            </div>
        `;
        }

        document.getElementById("rgolLink").href = `${jsonData["urls"]["rgol"]}`
        for(var i = 0; i < jsonData["rgol"].length; i++){
            document.getElementById("rgol-div").innerHTML += `
            <div class="grid-grid-div">
                <h2 class="title">${jsonData["rgol"][i]["title"]}</h2>
                <h2 class="price">${jsonData["rgol"][i]["price"]}</h2>
                <img class="product-img" src=${jsonData["rgol"][i]["img"]}>
            </div>
        `;
        }
    });

  

