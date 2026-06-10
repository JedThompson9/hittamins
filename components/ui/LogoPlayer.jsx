'use client'
import { useEffect, useRef, useState } from 'react'

function detectSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua)
}

function chromaKey(imageData, tolerance = 80) {
  const d = imageData.data
  for (let i = 0; i < d.length; i += 4) {
    const dr = d[i] - 0
    const dg = d[i + 1] - 255
    const db = d[i + 2] - 0
    if (Math.sqrt(dr * dr + dg * dg + db * db) < tolerance) {
      d[i + 3] = 0
    }
  }
}

export default function LogoPlayer({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const [safari, setSafari] = useState(false)

  useEffect(() => {
    setSafari(detectSafari())
  }, [])

  useEffect(() => {
    if (!safari) return

    const video = document.createElement('video')
    video.src = '/logo/logo-greenscreen.mp4'
    video.muted = true
    video.playsInline = true
    video.autoplay = true
    // Hide but keep in DOM so it can decode
    Object.assign(video.style, {
      position: 'fixed',
      width: '1px',
      height: '1px',
      top: '-9999px',
      left: '-9999px',
      opacity: '0',
      pointerEvents: 'none',
    })
    document.body.appendChild(video)

    let dimensionsSet = false

    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas || !video.videoWidth) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      if (!dimensionsSet) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        dimensionsSet = true
      }

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      chromaKey(imageData, 80)
      ctx.putImageData(imageData, 0, 0)

      if (!video.ended) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    video.addEventListener('play', draw)
    video.play().catch(() => {})

    return () => {
      cancelAnimationFrame(rafRef.current)
      video.remove()
    }
  }, [safari])

  if (!safari) {
    return (
      <video
        autoPlay
        muted
        playsInline
        className={className}
      >
        <source src="/logo/logo.webm" type="video/webm" />
      </video>
    )
  }

  return <canvas ref={canvasRef} className={className} />
}
