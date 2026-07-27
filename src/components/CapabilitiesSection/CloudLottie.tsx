import Lottie from 'lottie-react'
import cloudAnimation from './cloud-animation.json'

function CloudLottie() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <Lottie
        animationData={cloudAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%', maxWidth: '400px' }}
      />
    </div>
  )
}

export default CloudLottie
