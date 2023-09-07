export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center m-8">
      <img src="/public/logo.png" alt="logo" className="w-36 mb-3" />
      <h1 className="text-darkblue font-bold text-xl">당신의 제주를<br />우리의 제주로</h1>
    </div>
  )
}

export const SubLogo = () => {
  return (
    <div className="flex gap-3 items-center justify-center m-8">
      <img src="/public/logo.png" alt="logo" className="w-32 mb-2" />
      <p className="text-darkblue font-bold text-lg">당신의 제주를<br />우리의 제주로</p>
    </div>
  )
}