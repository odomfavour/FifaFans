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

function convertDate(joinDate) {
    let d = joinDate;
    let n = d.toLocaleString([], { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    console.log(n)
    // return n
}

let mydate = new Date();
console.log(mydate)
convertDate(mydate)