import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    <main>
      <div className="max-w-6xl mx-auto pb-8 px-4">
        <header className='flex justify-between items-center py-10'>
          <h1 className='text-xl font-medium'>Youtunix <span className='text-3xl'>📼</span></h1>
        </header>
        <Component {...pageProps} />
      </div>
    </main>
  </>
}
