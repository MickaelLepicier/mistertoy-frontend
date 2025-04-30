import { GoogleMaps } from '../cmps/GoogleMap'

export function AboutUs() {
  return (
    <section className="about-page">
      <h1>About Us</h1>
      <h1>Welcome to Mister-Toy</h1>
      <p>
        Our store was founded on April 7, 2011, and since then has been
        providing the highest level of service, offering the highest quality
        products in the toy industry, and maintaining fair prices.
      </p>
      <p>Our motto is Quality + Service + Price:</p>
      <ul>
        <li>Top-quality products from leading brands around the world</li>
        <li>
          Professional service, with recommendations on toys, unique gift
          wrapping, and fast deliveries
        </li>
        <li>Fair prices compared to stores across the country</li>
      </ul>
      <p>
        At our store, you can find: wooden toys, games, thinking games, didactic
        toys, Waldorf toys, puzzles, party games, science games, robotics, arts
        and crafts, and more.
      </p>
      <p>
        All our products come from the world's leading brands: Melissa & Doug,
        BRIO World, Janod, Linda Toys, Ravensburger, Buki France, Wonder World,
        Classic World, Phoohi, Avenir, Matador, Silverlit, Rubiks, SmartGames,
        Foxmind, Kodkod, Carrera, Machina, Crayola, thinkfun, 4M, dolce, Bgifts,
        CASDON, and more.
      </p>
      <p>
        All products are manufactured at the highest standards with the
        strictest certifications worldwide.
      </p>
      <p>All products are safe for use.</p>
      <h3>Why is the store called "Mister-Toy"?</h3>
      <p>
        The meaning of the word "Mister-Toy" in Hebrew hints at a "hint of
        light"! Our gift wrapping suggests that there's something special
        underneath, and when the children open their presents — you can see the
        light in their eyes.
      </p>
      <p>
        We chose to wrap gifts aesthetically to emphasize the gift inside. We
        believe that wrapping should only hint at its content, to allow you and
        your children to appreciate the gift even more.
      </p>

      <GoogleMaps />
    </section>
  )
}
