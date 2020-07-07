function GETDURATION(incoming_time) {
    console.log(incoming_time)
    let now = new Date()
    const Difference_In_Time = now.getTime() - new Date(incoming_time).getTime(); 
    const diff = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    if ( diff > 0 ) {
        return `${diff} day`
    } else {
        return `${Difference_In_Time} Minute`
    }

   
}