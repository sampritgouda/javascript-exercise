 /********************************************************
  *                finding maximum number                *
  ********************************************************/

function find_maximum_number(event) {
    //preventing pageloading
    event.preventDefault();

    const output_section = document.getElementById("max-output");
    let output_error = "";

    /************************************
    *  step 1 : getting inputted values *
    *************************************/
    let first_input = document.getElementById("number1").value;
    let second_input = document.getElementById("number2").value;


    /************************************
    *       step 2 : Validation         *
    *************************************/

    if (first_input.trim() === "") {
        output_error = "Please Enter First Number";
    } else if (second_input.trim() === "") {
        output_error = "Please Enter Second Number";
    }

    if (output_error) {
        output_section.innerText = output_error;
        output_section.classList.remove("output");
        output_section.classList.add("output-error");
        return;
    }

    /*********************************************
     *         STEP 3 : convert to numbers       *
     *********************************************/
    // 
    let first_number = Number(first_input);
    let second_number = Number(second_input);

    /*********************************************
     *           STEP 4 : find maximum           *
     *********************************************/
    const max = first_number > second_number ? first_number : second_number;

    /*********************************************
     *           STEP 5 : display output         *
     *********************************************/
    output_section.classList.remove("output-error");
    output_section.classList.add("output");
    output_section.innerText = "Output: " + max;
}


 /************************************************************
  *                    for reversing string                  *
  ************************************************************/


function reverse_string(event){

    // prevent autosubmission loading
    event.preventDefault();

    /************************************
    *  step 1 : getting inputted values *
    *************************************/
    let input_string = document.getElementById("input-string").value.trim();
    let output_section = document.getElementById("reverse-output")

    /************************************
    *       step 2 : Validation         *
    *************************************/
    let output_error = input_string === "" ? "Please Enter valid String" : "";

    // display output_error and return
    if(output_error){
        output_section.innerText = output_error;
        output_section.classList.remove("word-output");
        output_section.classList.add("output-error");
        return;
    }

    /************************************
    *     step 3 : Reversing String     *
    *************************************/
    let reversed_string = input_string.split("").reverse().join("")

    /************************************
    *      step 4 : display output      *
    *************************************/
    output_section.innerText = reversed_string
    output_section.classList.remove("output-error")
    output_section.classList.add("word-output")

}    


 /**************************************************************
  *                      find longest word                     *
  **************************************************************/

function find_longest_word(event){

    // prevent autosubmission loading
    event.preventDefault();

    /************************************
    *  step 1 : getting inputted values *
    *************************************/
    let input_string = document.getElementById("words-array").value.trim();
    let output_section = document.getElementById("longest-word-output")

    /************************************
    *       step 2 : Validation         *
    *************************************/
    let output_error = input_string === "" ? "Please Enter valid String" : "";

    // display output_error and return
    if(output_error){
        output_section.innerText = output_error;
        output_section.classList.remove("word-output");
        output_section.classList.add("output-error");
        output_error = ""
        return;
    }

    /**************************************************
    *  step 3 : splittting the input string by comma  *
    ***************************************************/
    let string_array = input_string.split(",")

    /**************************************************
    *    step 4 : trim leading and trailing spaces    *
    ***************************************************/
    string_array = string_array.map(word => word.trim())

    /**************************************************
    *    step 5 : find the longest word from array    *
    ***************************************************/
    let longest_word = string_array.reduce((str1,str2)=>str1.length > str2.length ? str1 : str2)

    /**************************************************
    *             step 6 : display output             *
    ***************************************************/
    // 
    output_section.innerText = longest_word
    output_section.classList.remove("output-error")
    output_section.classList.add("word-output")

}



 /**************************************************************
  *                          create resume                     *
  **************************************************************/

function create_resume(event){

    // prevent autosubmission loading
    event.preventDefault();

    let output_error 

    /************************************
    *  step 1 : getting inputted values *
    *************************************/
    let user_name = document.getElementById("user-name").value
    let user_mobile_number = document.getElementById("user-mobile-number").value
    let output_section = document.getElementById("resume-create-output")

    /************************************
    *       step 2 : Validation         *
    *************************************/
    if(user_name.trim()===""){
        output_error = "Please Enter Name"
    }
    else if(user_mobile_number.trim()===""){
        output_error = "Please Enter Mobile Number"
    }

    //checking if the mobile number is valid
    else if(!is_valid_mobilenumber(user_mobile_number.trim())){
        output_error = "Enter a  valid Mobile Number"
    }

    // display output_error and return
    if(output_error){
        output_section.innerText = output_error;
        output_section.classList.remove("output");
        output_section.classList.add("output-error");
        output_error=""
        return;
    }

    /************************************
    *  step 3 : creating user data json *
    *************************************/
    let user_data ={"user_name" : user_name,"user_mobile_number" : user_mobile_number}
    let user_cookie

    /************************************
    *       step 4 :  creating cookie   *
    *************************************/
    document.cookie = encodeURIComponent(`user_data = ${JSON.stringify(user_data)}; path = /;`)
    user_cookie = get_user_cookie()
 
    /************************************
    *       step 5 : display output     *
    *************************************/
    output_section.innerText = "Resume Created"
    output_section.classList.add("output")
    output_section.classList.remove("output-error")
}



 /**************************************************************
  *                      get the user cookie                   *
  **************************************************************/

 function get_user_cookie(){
    let user_cookie
    let all_cookies = decodeURIComponent(document.cookie)
    let cookies_array = all_cookies.split(";")
    for(let i = 0 ; i < cookies_array.length ; i++){
        let cookie = cookies_array[i].split("=")
        if(cookie[0].trim()==="user_data"){
            user_cookie = cookie[1]
            user_cookie = JSON.parse(user_cookie)
        }
    }
    return user_cookie
    
 }


 /**************************************************************
  *         Display username and mobile number in browser      *
  **************************************************************/

 function display_user_data(user_data){
    if(!user_data){
        return
    }

    let user_name = user_data.user_name;
    let user_mobile_number = user_data.user_mobile_number;

    document.getElementById("resume-header").innerText = user_name
    document.getElementById("resume-mobile-number").innerText = user_mobile_number
 }


 /**************************************************************
  *       Getting User data from cookie after window load      *
  **************************************************************/

 window.onload = ()=>{
    let user_cookie = get_user_cookie()
    display_user_data(user_cookie)
 }

  /**************************************************************
  *           Check if a Number is Valid Mobile Number          *
  **************************************************************/

 function is_valid_mobilenumber(mobile_number){
    return /^\d{10}$/.test(mobile_number)

 }