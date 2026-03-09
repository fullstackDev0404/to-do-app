export default function Particles(){

  const particles = Array.from({length:25})

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {particles.map((_,i)=>(
        <span
          key={i}
          className="absolute w-1 h-1 bg-sky-400 rounded-full opacity-60 animate-pulse"
          style={{
            top: Math.random()*100+"%",
            left: Math.random()*100+"%"
          }}
        />
      ))}

    </div>

  )

}