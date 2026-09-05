import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-900 px-6 py-24 sm:py-32 lg:px-8 font-sans">
      <div className="text-center">
        <p className="text-lg font-bold text-indigo-500 tracking-widest uppercase">404 Error</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          System Endpoint Not Found
        </h1>
        <p className="mt-6 text-lg font-medium text-slate-400 sm:text-xl">
          The routing table has no record of the requested resource.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link 
            to="/" 
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}

export default PageNotFound