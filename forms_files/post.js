
BASE_URL = 'https://pilar-connectado.herokuapp.com/v1/'

async function sendPostUserRequest(url,body)
{
    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(url, {method:"POST",
            headers: headers,

            body: JSON.stringify(body)
        })
    .then(response => {
        

        if(response.status == 200){
            response.json().then(user =>{
            window.localStorage.setItem("userId", user.id)
            console.log(window.localStorage.getItem('isPilarMember'))

            if(window.localStorage.getItem('isPilarMember')=="true"){
                window.location.replace("./formsPilarMember.html")

                console.log("entrou aqui")
                //window.location.href = './formsPilarMember.html'
                
            }else{
                console.log("nao é pilar member")
                window.location.replace("./formsPortoMember.html")
                //window.location.href = "./formsPortoMember.html"
            }})
        }else{
            response.json().then(error =>{
                alert("Email já existe")
            })
        }
    }).catch(error => {
        console.log(error)
        alert("Erro ao cadastrar usuário, provavelmente CPF já cadastrado")
    })
  
}

function cadastrarUsuario()
{
    event.preventDefault()
    let url = ' https://pilar-connectado.herokuapp.com/v1/users/'

    let firstName = document.getElementById('firstName').value.toString()
    let lastName = document.getElementById('lastName').value.toString()

    let email = document.getElementById('email').value.toString()
    let password = document.getElementById('password').value.toString()
    let password2 = document.getElementById('password2').value.toString()
    let address = document.getElementById('address').value.toString()
    let cpf = document.getElementById('cpf').value.toString()

    let gridCheckPilarMember = document.getElementById('gridCheckPilarMember').checked

    window.localStorage.setItem('isPilarMember', gridCheckPilarMember)
    console.log(window.localStorage.getItem('isPilarMember'))
    console.log(password,password2)
    if (password != password2){
        alert("Senhas não conferem")
        
    }

    body = {
        "email": email,
        "name": firstName+" "+lastName,
        "password": password,
        "address": address,
        "cpf": cpf

    }

    console.log(body)
    sendPostUserRequest(url,body)
}





async function sendPostPilarMemberRequest(url,body)
{
    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(url, {method:"POST",
            headers: headers,

            body: JSON.stringify(body)
        })
    .then(response => {
        

        if(response.status == 200){
           

            let phone = document.getElementById('phone').value

            sendPostPhoneRequest(BASE_URL+'phone/',{
                "phone": phone,
                "id_user": parseInt(window.localStorage.getItem('userId')),
                "type": document.getElementById('gridCheckCelular').checked ? "Celular" : "Fixo"
            })
          

        }else{
            response.json().then(error =>{
                alert("Error ao cadastrar")
            })
        }
    }).catch(error => {
        console.log(error)
        alert("Erro ao cadastrar usuário")
    })
  
}


async function sendPostPhoneRequest(url,body)
{
    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(url, {method:"POST",
            headers: headers,

            body: JSON.stringify(body)
        })
    .then(response => {
        window.location.replace("./pilarMemberHomePage.html")

      
    }).catch(error => {
        console.log(error)
        alert("Erro ao cadastrar o Telefone")
    })
  
}


function cadastrarUsuarioPilar()
{
    event.preventDefault()
    let url = BASE_URL+'pilar_member/'

    let summary = document.getElementById('summary').value
    let instagram = document.getElementById('instagram').value
    let id_user = parseInt(window.localStorage.getItem('userId'))

    

    body = {
        "introduction": summary,
        "instagram": instagram,
        "id_user":id_user
    }

    console.log(body)
    sendPostPilarMemberRequest(url,body)
}