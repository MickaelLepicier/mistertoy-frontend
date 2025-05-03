import React from 'react'
import { Chart as ChartJS, ArcElement,  Tooltip, Legend } from 'chart.js'
import { Pie, Doughnut } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

ChartJS.register( ArcElement, Tooltip, Legend)

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 99, 71, 0.2)',
  'rgba(100, 149, 237, 0.2)',
  'rgba(60, 179, 113, 0.2)',
  'rgba(218, 112, 214, 0.2)',
  'rgba(244, 164, 96, 0.2)'
]

const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 99, 71, 1)',
  'rgba(100, 149, 237, 1)',
  'rgba(60, 179, 113, 1)',
  'rgba(218, 112, 214, 1)',
  'rgba(244, 164, 96, 1)'
]

export function MyChart({ priceStats, inStockStats }) {
  const {t} = useTranslation()
  
  const labels = Object.keys(priceStats)
  const dataPrice = Object.values(priceStats)
  const dataInStock = Object.values(inStockStats)

  const priceDataStats = getData(labels, 'Average Price by $', dataPrice)
  const inStockDataStats = getData(labels, 'In-stock by %', dataInStock)

  
  return (
    <section className="chart-container">
      <h2>{t('msg_chart_h_1')}</h2>
      <Pie className="chart" data={priceDataStats} />

      <h2>{t('msg_chart_h_2')}</h2>
      <Doughnut className="chart" data={inStockDataStats} />
    </section>
  )
}

function getData(labels, msg, data) {
  return {
    labels: labels,
    datasets: [
      {
        label: msg,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }
    ]
  }
}
