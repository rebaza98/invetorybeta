import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <main className="-mt-32">
    <   div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</div>
    </main>
  )
}

export default MainLayout
