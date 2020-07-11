
const TOAST = {
    welcomeToast() {
        tata.info('Welcome', 'Welcome to FifaFans Meet your fellow fan, player and coach', {
            duration: 10000
          })
    },

    successToast(message){
        tata.success('Success', message, {
            duration: 10000
        })
    },

    infoToast(message) {
        tata.info('Status', message, {
            duration: 10000
        })
    },

    errorToast(message) {
        tata.error('Status', message, {
            duration: 10000
        });
    }
}