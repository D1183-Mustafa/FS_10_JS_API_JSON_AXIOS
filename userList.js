const tbody = document.getElementById("tbodyUserList");

window.onload = () => {
    alert(`Your apiKey is: "${DecryptStringAES(sessionStorage.getItem("apiKey"))}`);
    getApiUserList();
    setInterval(getApiUserList, 5000);
}

const getApiUserList = async (pageNumber) => {
    showLoading();
    //////axios
    try {
        // const responseData = await axios("https://reqres.in/api/users?page=1");
        const responseData = await axios({
            url:"https://reqres.in/api/users?page=1",
            method : "get",
            // data:apiKey
        });
        const { data: userListArray } = responseData.data;
        console.log(userListArray);
        if(userListArray.length === 0){
            alert("userlist not found");
            removeLoading();
        }
        else{
            tbody.innerHTML = "";
            userListArray.forEach(customer => {
                tbody.innerHTML += `
            <tr>
                <td>
					${customer.id}
                </td>
                <td>
					<img src="${customer.avatar}">
                </td>
                <td>
                    ${customer.email}
                </td>
                <td>
                    ${customer.first_name}
                </td>
                <td>
                    ${customer.last_name}
                </td>
            </tr>`;
            });
            removeLoading();
        }
    }
    catch (error) {
        alert(error);
        //send errors to api and database (errorLogs table)
        // postErrorLog("userList", "getApiUserList", error);
        removeLoading();
    }
}
