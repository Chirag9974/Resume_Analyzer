function Icon({ name, className = 'h-5 w-5' }) {
  const icons = {
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    dashboard: (
      <>
        <path d="M4 13h4v7H4z" />
        <path d="M10 6h4v14h-4z" />
        <path d="M16 10h4v10h-4z" />
      </>
    ),
    briefcase: (
      <>
        <path d="M9 6V4h6v2" />
        <path d="M4 7h16v12H4z" />
        <path d="M4 12h16" />
      </>
    ),
    upload: (
      <>
        <path d="M12 4v11" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 17v3h14v-3" />
      </>
    ),
    clipboard: (
      <>
        <path d="M8 5h8v3H8z" />
        <path d="M6 7H5v14h14V7h-1" />
        <path d="M8 12h8" />
        <path d="M8 16h6" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M19 12a7 7 0 0 0-12-5l-3 3" />
        <path d="M5 12a7 7 0 0 0 12 5l3-3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    x: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    alert: (
      <>
        <path d="M12 3 2.5 20h19z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </>
    ),
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name] || icons.clipboard}
    </svg>
  )
}

export default Icon
