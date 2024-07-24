import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react m-auto" alt="React logo" />
        </a>
      </div>
      <h1>Sam Cotroneo</h1>
      <h5><em>Software Engineer, Casual Gardener, Wannabee Baker, Level 10 Dwarf Artificer.</em></h5>
      <div className="card">
        <p>Welcome to my personal site, it's a pleasure to have you here. I built this site so I could brush up on React and Typescript. It is styled with lots of help from TailwindCSS and the games were all made using the Phaser game engine.</p>
        <br/>
        <p>A bit about me, I am a software engineer with over 7 years of experience, predominantly with the .NET ecosystem (ELABORATE). Over the last few years I have had the opportunity to expand my knowledge into the web space, developing and integrating with various Web APIs, building web applications using ASP.NET and Blazor, and bringing it all together using containerisation and cloud technologies.</p>
        <br/>
        <p>Please, take a look around at some of the things I've made and feel free to let me know what you think by sending an email to <em>info@samcotroneo.com</em></p>
      </div>
    </>
  )
}

export default App
