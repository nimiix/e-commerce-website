let selectedRow = null
function onFormSubmit() {
  let d = showData()

  if (selectedRow === null) {
    addToLocal(d);
  }
}

function showData(){
  let data = {};
  data['Name'] = document.getElementById("full_name").value
  data['Email'] = document.getElementById("email_id").value
  data['Password'] = document.getElementById("password").value
  // data['Confirm_Password'] = document.getElementById("Confirm_password").value
  console.log(data)
  return data;
}

function addToLocal(d) {
  let formData;
  if (localStorage.getItem("formData") === null ) {
    formData = [];
  } 
  else {
    formData = JSON.parse(localStorage.getItem('formData'))
  }
  formData.push(d)
  localStorage.setItem("formData", JSON.stringify(formData))
}