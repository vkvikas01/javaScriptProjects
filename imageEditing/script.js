const fileInput=document.querySelector(".file-input"),
filterOptions=document.querySelectorAll(".filter button"),
filterName=document.querySelector(".filter-info .name"),
filterValue=document.querySelector(".filter-info .values"),
filterSlider=document.querySelector(".slider input"),
rotateOptions=document.querySelectorAll(".rotate button"),
previewimg=document.querySelector(".preview-Image img"),
resetFilterBtn=document.querySelector(".reset-filters");
chooseImgBtn=document.querySelector(".choose-img");
saveImgBtn=document.querySelector(".save-img");


let brightness=0;
let saturation =100;
let inversion=0;
let grayscale=0;

let rotate=0;
let flipHorizontal=1 , flipVertical=1;

const applyFilters = () => {
    previewimg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
const loadImage=()=>{
    let file=fileInput.files[0];//getting user file
    if(!file)return;
    previewimg.src=URL.createObjectURL(file)//getting file url
    previewimg.addEventListener("load",()=>{
        document.querySelector(".container").classList.remove("disable")
    })
    console.log(file); 
}

filterOptions.forEach(Option=>{
    Option.addEventListener("click",()=>{
        document.querySelector(".filter .active").classList.remove("active");
        Option.classList.add("active");
        filterName.innerHTML=Option.innerHTML;

        if(Option.id==="Brightness"){
            filterSlider.max="200";
            filterSlider.value=brightness;
            filterSlider.innerHTML=`${brightness}%`;
        }else if(Option.id==="Saturation"){
            filterSlider.max="200";
            filterSlider.value=saturation;
            filterSlider.innerHTML=`${saturation}%`;  
        }
        else if(Option.id==="Inversion"){
            filterSlider.max="100";
            filterSlider.value=inversion;
            filterSlider.innerHTML=`${inversion}%`;  
        }
        else {
            filterSlider.max="100";
            filterSlider.value=grayscale;
            filterSlider.innerHTML=`${grayscale}%`;  
        }
    })
})

const updateFilter=()=>{
   filterValue.innerHTML= `${filterSlider.value}%`; 
   const selectedFilter=document.querySelector(".filter .active");

   if(selectedFilter.id==="Brightness") {
    brightness=filterSlider.value;
   }else if(selectedFilter.id==="Saturation"){
    saturation=filterSlider.value;
   }
   else if(selectedFilter.id==="Inversion"){
    inversion=filterSlider.value;
   }else{
    grayscale=filterSlider.value;
   }
   applyFilters();
}


rotateOptions.forEach(Option=>{
    Option.addEventListener("click",()=>{
        console.log(Option);
        if(Option.id==='left'){
            rotate -=90;
        }else if(Option.id==="right"){
            rotate +=90
        }else if(Option.id==="horizontal"){
            flipHorizontal = flipHorizontal=== 1 ? -1: 1;
        }
        else {
            flipVertical = flipVertical=== 1 ? -1: 1;
        }
        applyFilters();
    })
})

const resetFilter= ()=>{
     brightness=0; saturation =100; inversion=0; grayscale=0; 
     rotate=0; flipHorizontal=1 ; flipVertical=1;
     filterOptions[0].click();
     applyFilters();
}

const saveImg=()=>{
    
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    canvas.width=previewimg.naturalWidth;
    canvas.height=previewimg.naturalHeight;

    
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    if(rotate!=0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal,flipVertical);
    ctx.drawImage(previewimg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    // document.body.appendChild(canvas);  for display image on web page

    const link =document.createElement("a");
    link.download="image.jpg";
    link.href =canvas.toDataURL();
    link.click()
}

fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updateFilter);
resetFilterBtn.addEventListener("click",resetFilter);
saveImgBtn.addEventListener("click",saveImg);
chooseImgBtn.addEventListener("click", ()=> fileInput.click());