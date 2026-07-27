interface LazyImageProps {
  src: string
  alt?: string
  className?: string
}

function LazyImage({ src, alt = '', className = '' }: LazyImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}

export default LazyImage
