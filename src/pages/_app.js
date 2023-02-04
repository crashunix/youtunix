import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    <main>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </main>
  </>
}
