import { useState, useRef, useCallback } from 'react'

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
// Reemplaza esta URL con la de tu webhook de Make
const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/x5ygn84h9ps2251gca3c6lp909qleclu'

// ─── CONSTANTES ──────────────────────────────────────────────────────────────
const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

const ACCEPTED_TYPES = 'image/*, application/pdf'

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getFileIcon(file) {
  if (!file) return null
  if (file.type === 'application/pdf') return '📄'
  if (file.type.startsWith('image/')) return '🖼️'
  return '📎'
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function App() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  // ── Gestión de archivo ────────────────────────────────────────────────────
  const handleFile = useCallback((selected) => {
    if (!selected) return
    setFile(selected)
    setStatus(STATUS.IDLE)
    setErrorMsg('')
  }, [])

  const handleInputChange = (e) => {
    handleFile(e.target.files[0] ?? null)
  }

  // ── Drag & Drop ───────────────────────────────────────────────────────────
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) {
      const isValid =
        dropped.type.startsWith('image/') || dropped.type === 'application/pdf'
      if (!isValid) {
        setErrorMsg('Tipo de archivo no admitido. Solo imágenes o PDF.')
        setStatus(STATUS.ERROR)
        return
      }
      handleFile(dropped)
    }
  }

  // ── Envío ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || status === STATUS.SENDING) return

    setStatus(STATUS.SENDING)
    setErrorMsg('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
      }

      setStatus(STATUS.SUCCESS)
    } catch (err) {
      const isNetworkError = err instanceof TypeError
      setErrorMsg(
        isNetworkError
          ? 'Error de red. Verifica tu conexión o la URL del webhook.'
          : err.message
      )
      setStatus(STATUS.ERROR)
    }
  }

  // ── Reset ────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setFile(null)
    setStatus(STATUS.IDLE)
    setErrorMsg('')
    if (inputRef.current) inputRef.current.value = ''
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────
  const isSending = status === STATUS.SENDING
  const isSuccess = status === STATUS.SUCCESS
  const isError = status === STATUS.ERROR

  return (
    <div className="app-wrapper">
      {/* Fondo decorativo */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />

      <main className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="logo-mark">
            <span className="logo-icon">⬡</span>
          </div>
          <div className="header-text">
            <h1 className="app-title">File Sender</h1>
            <p className="app-subtitle">
              Transmisión segura hacia <span className="brand-make">Make</span>
            </p>
          </div>
        </header>

        {/* Card principal */}
        <section className="card">
          <form onSubmit={handleSubmit} noValidate>

            {/* Zona de drop */}
            <div
              className={`drop-zone ${isDragging ? 'drop-zone--dragging' : ''} ${file ? 'drop-zone--has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && inputRef.current?.click()}
              role="button"
              tabIndex={file ? -1 : 0}
              onKeyDown={(e) => e.key === 'Enter' && !file && inputRef.current?.click()}
              aria-label="Zona de carga de archivos"
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                onChange={handleInputChange}
                className="file-input-hidden"
                aria-label="Seleccionar archivo"
                disabled={isSending}
              />

              {!file ? (
                <div className="drop-zone__empty">
                  <div className="drop-icon">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4L20 26M20 4L13 11M20 4L27 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 30C6 32.2 7.8 34 10 34L30 34C32.2 34 34 32.2 34 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="drop-zone__text">
                    Arrastra tu archivo aquí
                  </p>
                  <p className="drop-zone__hint">
                    o <button type="button" className="link-btn" onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}>examina tu dispositivo</button>
                  </p>
                  <p className="drop-zone__types">Imágenes · PDF</p>
                </div>
              ) : (
                <div className="file-preview">
                  <div className="file-preview__icon">{getFileIcon(file)}</div>
                  <div className="file-preview__info">
                    <span className="file-preview__name">{file.name}</span>
                    <span className="file-preview__size">{formatFileSize(file.size)}</span>
                  </div>
                  <button
                    type="button"
                    className="file-preview__remove"
                    onClick={(e) => { e.stopPropagation(); handleReset() }}
                    aria-label="Eliminar archivo"
                    disabled={isSending}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className={`submit-btn ${isSending ? 'submit-btn--sending' : ''}`}
              disabled={!file || isSending}
            >
              {isSending ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Enviando a Make…
                </>
              ) : (
                <>
                  <span className="btn-icon">↑</span>
                  Enviar Archivo
                </>
              )}
            </button>
          </form>

          {/* Feedback de estado */}
          {isSuccess && (
            <div className="status-banner status-banner--success" role="status">
              <span className="status-banner__icon">✓</span>
              <div>
                <strong>¡Transmisión completada!</strong>
                <p>El archivo fue recibido por Make correctamente.</p>
              </div>
              <button className="status-banner__close" onClick={handleReset} aria-label="Cerrar">
                Enviar otro
              </button>
            </div>
          )}

          {isError && (
            <div className="status-banner status-banner--error" role="alert">
              <span className="status-banner__icon">!</span>
              <div>
                <strong>Error en la transmisión</strong>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}
        </section>

        {/* Indicador de endpoint */}
        <footer className="app-footer">
          <span className="endpoint-label">Endpoint</span>
          <code className="endpoint-url">{MAKE_WEBHOOK_URL}</code>
        </footer>
      </main>
    </div>
  )
}
