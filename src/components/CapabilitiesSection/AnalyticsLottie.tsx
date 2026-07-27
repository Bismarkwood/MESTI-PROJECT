import Lottie from 'lottie-react'
import analyticsAnimation from './analytics-animation.json'

function AnalyticsLottie() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <Lottie
        animationData={analyticsAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%', maxWidth: '400px' }}
      />
    </div>
  )
}

export default AnalyticsLottie
