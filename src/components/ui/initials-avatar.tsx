const InitialsAvatar = ({ initials }: { initials: string }) => {
  return (
    <div className="min-h-[35px] h-[35px] min-w-[35px] w-[35px] bg-white rounded-full flex items-center justify-center cursor-pointer">
      <p className="text-amber-600">{initials}</p>
    </div>
  )
}
export default InitialsAvatar
