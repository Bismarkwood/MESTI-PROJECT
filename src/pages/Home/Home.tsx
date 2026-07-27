import Hero from '../../components/Hero'
import Counter from '../../components/Counter'
import NextSteps from '../../components/NextSteps'
import './Home.css'

function Home() {
  return (
    <>
      <section id="center">
        <Hero />
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Counter />
      </section>

      <div className="ticks"></div>

      <NextSteps />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home
