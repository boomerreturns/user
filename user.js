$(() => {
  console.log('document is ready!')
  $('.userChoice').on('click', event => {
    event.preventDefault()
    let userData = {};
    $('input').each((index, field) => {
      userData[field.id] = $(field).val();
    })

    console.log(dataIsInvalid(userData), userData);
    let formattedData = !dataIsInvalid(userData) ? formatData(userData) : null;

    if (formattedData) {
      let finalForm = {
        user: formattedData
      }
      finalForm = JSON.stringify(finalForm);
      swal({
        title: 'Awesome!',
        text: 'You are now registered and can start making orders!',
        type: 'success',
        confirmButtonText: "Let's Go!",
        onClose: redirectToOrders
      })
      // $.post('https://boomerreturns.herokuapp.com/v0/users', finalForm).done(response => {
      //   console.log(response);
      //
      // });
    }
  })

  function redirectToOrders(){
    location.href = 'https://boomerreturns.github.io/order/'
  }


  function formatData(data){
    let formattedData = {
      name: '',
      phone: '',
      address: ''
    };
    Object.keys(data).forEach(key => {
      switch (key) {
        case 'firstName':
        case 'middleName':
          formattedData.name += data[key] + ' ';
          break;
        case 'lastName':
          formattedData.name += data[key];
          break;
        case 'streetAddress':
        case 'cityName':
        case 'stateCode':
          formattedData.address += data[key] + ', ';
          break;
        case 'zipcode':
          formattedData.address += data[key];
          break;
        case 'phoneNumber':
          formattedData.phone = data[key];
          break;
        default:
          break;
      }
    })
    return formattedData
  }

  let dataIsInvalid = data => Object.keys(data).some(key => !data[key]);
})
