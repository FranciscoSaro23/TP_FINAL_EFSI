import React from 'react'

export default function NavLink({ to, children }) {
  const onClick = (e) => {
    e.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  return (
    <a href={to} onClick={onClick} className="navlink">
      {children}
    </a>
  )
}
