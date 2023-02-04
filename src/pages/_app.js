import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    <main>
      <div className="container mx-auto py-8">
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </main>
  </>
}
