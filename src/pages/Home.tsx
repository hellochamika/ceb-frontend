import Features from "../Sections/Features"
import Hero from "../Sections/Hero"
import NeedHelp from "../Sections/NeedHelp"

function Home() {
  return (
	<div className="pb-28">
		<Hero />
		<Features />
		<NeedHelp />
	</div>
  )
}

export default Home