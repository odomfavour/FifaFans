const new_image = document.getElementById('new_image');
const new_title = document.getElementById('new_title');
const new_content =document.getElementById('new_content');


const showNewsDetails = (title) => {
  // localStorage.setItem("new-title", title);
  window.location.replace(`view-news?title=${title}`)
}

{
//   {
//   !-- < div class="container mt-5" >
//     <div class="row mb-5">
//       <div class="col-lg-4 hidden-mobile mb-5">
//         <div> {{> sidenav}}</div>
//       </div>
//       <div class="col-lg-8 col-12">
//         {{!-- {{> userpost}} --}}
//             <div class=" card pd-15">
//           <div class="">
//             <div class="row ">
//               {{ #each data.articles }}
//               <div class=" col-lg-4 col-6">
//                 <div class="card-bd mb-3 pd-0 ">
//                   <img src="{{this.urlToImage}}" class="img-news" alt="">
//                     <div class="pd-15">
//                       <h5 class="text-flow-short-h5">{{ this.title }}</h5>
//                       <p class="text-flow-short-p">{{ this.description }}</p>
//                       <div class="d-flex justify-content-between mt-3">
//                         <p class="btn btn-primary" onclick="showNewsDetails(`{{this.title}}`)">See More</p>
//                       </div>
//                     </div>
//                             </div>
//                 </div>
//                 {{/ each}}

//                     </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {{!-- </div>  --}
// }