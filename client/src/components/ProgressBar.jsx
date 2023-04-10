const ProgressBar=({progress})=>{

  const colors=[
    'rgb(30, 166, 66)',
    'rgb(196, 176, 24)',
    'rgb(3, 7, 252)',
    'rgb(252,3,3)',
  ];

  const randomColor=colors[Math.floor(Math.random()*colors.length)];

   return (
     <div className="outer-bar">
      <div 
        className="inner-bar"
        style={{width:`${progress}%`, backgroundColor:randomColor}}
        >
        
        </div>
     </div>
   )
 }
 
 export default ProgressBar