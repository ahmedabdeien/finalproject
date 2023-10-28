import Style from './Home.module.css'
import FeaturedProdcts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'

function Home() {
  

  return<>
    <Helmet>
        <title>Home</title>
    </Helmet>
  <MainSlider></MainSlider>
  <CategorySlider></CategorySlider>
  <FeaturedProdcts/>
    </>
  
}

export default Home