export default function BorderedBox({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
      <div className={`border-4 border-black  shadow-[4px_4px_0px_#000] m-4 ${className}`}>
        {children}
      </div>
  )
}
