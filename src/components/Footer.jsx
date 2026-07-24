export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="nav-logo">
          <span className="bug-dot" aria-hidden="true"></span>
          GingerBug
        </div>
        <div>© {new Date().getFullYear()} GingerBug. Small batches, brewed slowly.</div>
      </div>
    </footer>
  )
}
