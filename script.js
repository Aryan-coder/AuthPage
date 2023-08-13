// Accessing html elements
const backgroundImages = document.getElementsByClassName('background-image')
const forms = document.getElementsByTagName('form')
const block = document.getElementById('block')
const icon = document.getElementsByClassName('icon')
let toggle = true
let registeredUser = null

// Function to change the theme
function changeTheme(){
    backgroundImages[1].style.opacity = toggle ? 0 : 1
    block.style.backgroundColor = toggle ? 'rgb(241, 104, 55)' : 'rgb(247, 134, 93)'
    block.style.color = toggle ? 'rgba(255, 235, 205,.7)' : 'rgba(37, 37, 37,.5)'
    icon[0].style.stroke = toggle ? 'rgba(255, 235, 205,.7)' : 'rgba(37, 37, 37,.7)'
}

// Handling resizing
addEventListener('resize', (e)=>{
    initializeBlock()
    toggle = !toggle    
    moveBlock()
})   

// Positioning block
initializeBlock()
function initializeBlock(){
    block.style.width = forms[0].getClientRects()[0].width+'px'
    block.style.height = forms[0].getClientRects()[0].height-50+'px'
}

// Adding click event to block
block.addEventListener('click', e=>{
    moveBlock()
    changeTheme()
})

// Function to move the block
moveBlock()
function moveBlock(){
    block.style.left = forms[toggle ? 0 : 1].getClientRects()[0].left+'px'
    block.style.top = forms[toggle ? 1 : 0].getClientRects()[0].top+'px'
    block.innerHTML =  iconSVG[toggle ? 0 : 1] 
    toggle = !toggle
}


// Adding submit event to forms
    forms[0].addEventListener('submit', (e)=>handleSignIn(e))
    forms[1].addEventListener('submit', (e)=>handleSignUp(e))

// Function to handle signup
function handleSignUp(e){
    e.preventDefault()
    const user = {}
    user.email = e.target.email.value
    user.name = e.target.name.value
    user.password = e.target.password.value
    user.confirmPassword = e.target.confirmPassword.value

    e.target.email.value = ''
    e.target.name.value = ''
    e.target.password.value = ''
    e.target.confirmPassword.value = ''

    if(user.password != user.confirmPassword){
        alert("Confirmed password is not matching")
    }
    else{
        if(getUser(user)!=undefined){
            alert("Email is already registered")
        }
        else{
            setUser(user)
            alert("Registered Successfuly")
        }
        moveBlock()
        changeTheme()
    }
}

// Function to handle Signin
function handleSignIn(e){
    e.preventDefault()
    const user = {}
    user.email = e.target.email.value
    user.password = e.target.password.value

    e.target.email.value = ''
    e.target.password.value = ''

    registeredUser = getUser(user)
    
    if(registeredUser == undefined){
        alert('user does not exists')
    }
    else{
        if(registeredUser.password == user.password){
            showWelcome()
        }
        else{
            alert("Wrong Credentials")
        }
    }
}

// Function to getch user from local storage
function getUser(userData){
    let user = undefined
    try{
        user = JSON.parse(localStorage.getItem(userData.email))
        return(user)
    }
    catch(err){
        return(undefined)
    }
}

function setUser(user){
    try{
        localStorage.setItem(user.email, JSON.stringify(user))
        return(true)
    }
    catch(err){
        return(false)
    }
}

function showWelcome(){
    const [firstName, lastName] = registeredUser.name.split(' ')
    window.location.href = `https://aryan-coder.github.io/AuthPageWelcome?firstName=${firstName}&lastName=${lastName}`
}

