"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, RadarController, RadialLinearScale, PointElement, LineElement } from "chart.js"

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement)

export default function SkillsRadar() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const gradientPink = ctx.createLinearGradient(0, 0, 0, 400)
    gradientPink.addColorStop(0, "rgba(236, 72, 153, 0.8)")
    gradientPink.addColorStop(1, "rgba(168, 85, 247, 0.4)")

    const config: ChartConfiguration = {
      type: "radar",
      data: {
        labels: [
          "Desarrollo de Producto",
          "UX/UI",
          "Estrategia",
          "Liderazgo",
          "Innovación",
          "Tecnología",
          "Comunicación",
          "Agile",
        ],
        datasets: [
          {
            label: "Habilidades",
            data: [95, 90, 85, 85, 88, 75, 92, 90],
            backgroundColor: gradientPink,
            borderColor: "rgba(236, 72, 153, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(168, 85, 247, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(236, 72, 153, 1)",
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            pointLabels: {
              color: "rgba(255, 255, 255, 0.7)",
              font: {
                size: 12,
              },
            },
            ticks: {
              backdropColor: "transparent",
              color: "rgba(255, 255, 255, 0.5)",
              z: 100,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          line: {
            tension: 0.2,
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  )
}
