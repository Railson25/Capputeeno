"use client"

import { FilterBar } from '@/components/filter-bar'
import styles from './page.module.css'
import { ProductsList } from '@/components/products-list'


export default function Home() {
  return (
      <main className={styles.main}>
        <FilterBar />
        <ProductsList/>
      </main>
  )
}
