






$(document).ready(function () {

  class General {
    constructor() {
  
        this.domain="https://lagproperty.onrender.com/api/v1/"
        this.token=localStorage.getItem("token")
        this.restrictedPaths = ["/login"];
        this.navigateM=this.navigateM.bind(this)
        this.postData=this.postData.bind(this)
        this.runFirst()
    }
    
  
    isTokenAvailable() {
      return !!localStorage.getItem("token");
    }
    runFirst(){  
  
      const basePath = this.getBasePath(window.location.pathname); 
  
      // Check if the current path is in the restricted paths and if the token is available
      if (this.restrictedPaths.includes(basePath) && this.isTokenAvailable()) {
        // Redirect to home page
        //window.location.href = "/index.html";
        this.navigateM("/index.html")
      }
  
  
    } 
    removeItemFromLocalStorage(key) {
      localStorage.removeItem(key);
    }
    logout(){
  
      localStorage.removeItem("token")
      this.navigateM("/login.html")
  
    }
  
    postData(path, data , button , buttonL) {
  
  
      $("#errorMessage").text("")
  
        if (!navigator.onLine) {
  
            $("#errorMessage").text("You are offline")
  
            $(`#${buttonL}`).hide();
            $(`#${button}`).show();
  
            return    
  
        }
        const token=this.token||''
  
        try {   
            $.ajax({
                url: this.domain + path,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                success: (response) => {
                  //this.hideLoader();
                  const response2=response.data
  
  
                  $(`#${buttonL}`).hide();
                  $(`#${button}`).show();
  
                  if(path==='auth/loginUser'){
                   
                    $.notify({
                      icon: 'icon-check',
                      title: 'success',
                      message: 'welcome to lagproperty',
                    },{
                      type: 'success',
                      placement: {
                        from: "top",
                        align: "right"
                      },
                      time: 400,
                    });
  
                    setTimeout(() => {
                     
  
                      localStorage.setItem("token",response2.token )
                      localStorage.setItem("user",JSON.stringify(response2.user) )
  
                      this.navigateM("index.html")
  
                    }, 2000);
               
  
                  }
                },
                error: function(error) {
  
                  console.log(buttonL)
                  console.log(button)
  
                  $(`#${buttonL}`).hide();
                  $(`#${button}`).show();
  
                  if(path==='auth/loginUser'){
                    $("#errorMessage").text(error.responseJSON.message)
                  }
  
                }
              });
            
        } catch (error) {
          $(`#${buttonL}`).hide();
          $(`#${button}`).show();
  
        } 
  
    }
  
  
    navigateM(path){
        window.location.href=path
    }
    getBasePath(path) {
      // Extract the last part of the path using regex
      const basePath = path.match(/[^/]+$/)?.[0]?.replace(/\.html$/, "");
      // Return the base path with a leading slash
      return basePath ? `/${basePath}` : "/";
    }
  
  }
  
  const myGeneral = new General();
  







  const currentPath = window.location.pathname;
  const basePath = myGeneral.getBasePath(currentPath); 

if (basePath === "/index") {
      
    $(".icon-hide").hide();

    const isMoneyVisibility=localStorage.getItem("isMoneyVisibility")

    if(isMoneyVisibility==="true"){

    }

    $('.icon-show').on('click', function () {
      $("#balance").text('........');
      $(this).hide();
      $(this).siblings('.icon-hide').show();
      localStorage.setItem("isMoneyVisibility",true)

    });

    $('.icon-hide').on('click', function () {
      $("#balance").text('90000');
      $(this).hide();
      $(this).siblings('.icon-show').show();
      localStorage.setItem("isMoneyVisibility",true)

    });

    


}   
else if (basePath === "/airtime") {
     
  const $networkCards = $('.network-card');
    const $phoneInput = $('#phoneNumberInput');
    const $amountInput = $('#amountInput');
    const $popularAmountBtns = $('.amount-btn');
    const $payButton = $('#payButton');
    const $contactFileUpload = $('#contactFileUpload');

    let selectedNetwork = null;
    let selectedAmount = null;

    // Network Selection
    $networkCards.on('click', function () {
        $networkCards.removeClass('selected');
        $(this).addClass('selected');
        selectedNetwork = $(this).data('network');
        validateForm();
    });

    // Phone Number Input
    $phoneInput.on('input', function () {
        const sanitizedValue = $(this).val().replace(/\D/g, '');
        $(this).val(sanitizedValue);
        validateForm();
    });

    // Popular Amount Buttons
    $popularAmountBtns.on('click', function () {
        $popularAmountBtns.removeClass('selected');
        $(this).addClass('selected');
        selectedAmount = $(this).data('amount');
        $amountInput.val(selectedAmount);
        validateForm();
    });

    // Amount Input
    $amountInput.on('input', function () {
        $popularAmountBtns.removeClass('selected');
        selectedAmount = $(this).val();
        validateForm();
    });

    // File Upload
    $contactFileUpload.on('change', function () {
        const file = this.files[0];
        if (file) {
            alert(`File uploaded: ${file.name}`);
        }
    });

    // Form Validation
    function validateForm() {
        const isValid = selectedNetwork &&
            $phoneInput.val().length >= 10 &&
            selectedAmount &&
            parseInt(selectedAmount) > 0;

        if (isValid) {
            $payButton.prop('disabled', false)
                .removeClass('btn-secondary')
                .addClass('btn-success');
        } else {
            $payButton.prop('disabled', true)
                .removeClass('btn-success')
                .addClass('btn-secondary');
        }
    }

    // Pay Button
    $payButton.on('click', function () {
        if (!$(this).prop('disabled')) {
            alert(`Purchasing ₦${selectedAmount} airtime for ${$phoneInput.val()} on ${selectedNetwork}`);
        }
    });

}   


  });